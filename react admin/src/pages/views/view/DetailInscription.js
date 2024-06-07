import React, { useEffect, useState } from 'react'
import '@/css/notification.css'
import { etudiantService } from '@/_services/etudiant.service'
import { useParams, Link } from 'react-router-dom'       
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Styles par défaut de react-toastify
import Swal from 'sweetalert2'
import LoadingButton from '@mui/lab/LoadingButton'
import MoonLoader from "react-spinners/MoonLoader"
import { styled } from '@mui/system'
import { format} from 'date-fns'
import { fr } from 'date-fns/locale'

const DetailInscription = () => {

    const [etudiant, setEtudiant] = useState([])
    const [imagePathBordereau, setImagePathBordereau] = useState(null)
    const [imagePathIdentite, setImagePathIdentite] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalImage, setModalImage] = useState(null) // Ajouter un état pour stocker l'image du modal

    const [loadingValidation, setLoadingValidation] = useState(false)
    const [loadingRejection, setLoadingRejection] = useState(false)
    const [loading, setLoading] = useState(true)

    let navigate = useNavigate()

    const { num } = useParams()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => { 
        try {
            var res = await etudiantService.getInscription(num)
            // console.log('res ...oui', res)

            var response = await etudiantService.getImageBordereauInscription(num)
            // console.log('response ...oui', response)
            // console.log('response ...oui', response.request.response)

            var reponse = await etudiantService.getImageEtudiantInscription(num)
            // console.log('reponse ...oui', reponse)
            // console.log('reponse ...oui', reponse.request.response)
            
            setEtudiant(res.data.data)
            setImagePathBordereau(response.request.responseURL)
            setImagePathIdentite(reponse.request.responseURL)

            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }
    
    const handleValidation = async () => {
        try {
            setLoadingValidation(true)
            const donnee = new FormData()

            donnee.append('nom', etudiant.nom)
            donnee.append('prenom', etudiant.prenom)
            donnee.append('datenais', etudiant.datenais)
            donnee.append('adresse', etudiant.adresse)
            donnee.append('email', etudiant.email)
            donnee.append('parcours', etudiant.parcours)

            if (imagePathIdentite) {
                const imageBlob = await fetch(imagePathIdentite).then((res) => res.blob())
                const nomFichier = `image${etudiant.numConcours}.jpg`
                donnee.append('file', imageBlob, nomFichier)
            }

            // donnee.forEach((value, key) => {
            // console.log('test... donnee : ', key, value)
            // })

            let res = await etudiantService.addLicence1(donnee)
            // console.log('oui... test : ', res)
            if (res.data.error) {
                 // notification error avec react-toastify
                toast.error(res.data.error.message, {
                    position: 'top-center',
                    autoClose: 3000,
                    // closeButton: false, 
                    hideProgressBar: true, 
                    transitionDuration: 0, 
                    theme: 'colored',
                })
                setLoadingValidation(false)
            } else {
                // envoie mail
                const email = await etudiantService.envoieMail({ email: etudiant.email, nom: etudiant.nom, prenom: etudiant.prenom })
                if (!email.data.error) {
                    Swal.fire({
                        text: email.data.message,
                        showConfirmButton: false,
                        // Exécuter des actions lorsque l'alerte est fermée
                        didClose: async () => { 
                            await etudiantService.deleteInscription(num)
                            setLoadingValidation(false)
                            navigate('/Inscription')
                        }
                    })
                } else {
                    await etudiantService.deleteInscription(num)
                    setLoadingValidation(false)
                    navigate('/Inscription')
                }
            }
        } catch (err) {
            console.log(err)
            setLoadingValidation(false)
        }
    }

    const handleRejection = async () => {
        try {
            setLoadingRejection(true)
            // envoie mail refus
            let email = await etudiantService.envoieMailRefus({ email: etudiant.email, nom: etudiant.nom, prenom: etudiant.prenom })
            console.log('email : ', email)
            if (!email.data.error) {
                    Swal.fire({
                        text: email.data.message,
                        showConfirmButton: false,
                        // Exécuter des actions lorsque l'alerte est fermée
                        didClose: async () => { 
                            await etudiantService.deleteInscription(num)
                            setLoadingRejection(false)
                            navigate('/Inscription')
                        }
                    })
            } else {
                await etudiantService.deleteInscription(num)
                setLoadingRejection(false)
                navigate('/Inscription')
            }
        } catch (err) {
            console.log(err)
            setLoadingRejection(false)
        }
    }

    const openModal = (image) => {
        setModalOpen(true)
        setModalImage(image) // Définir l'image du modal en fonction de celle cliquée
    }
    const closeModal = () => {
        setModalOpen(false)
    }

    const CustomiezdButtom = styled(LoadingButton)(({ theme }) => ({
    color: '#f0f0f0', 
    backgroundColor: 'blue',
    '&:hover': {
        backgroundColor: 'rgb(43, 47, 240)', 
    },
    }))

    const CustomButton = styled(LoadingButton)(({ theme }) => ({
    color: '#f0f0f0', 
    backgroundColor: 'red', 
    '&:hover': {
        backgroundColor: '#cc0000', 
    },
    }))

    const formatDate = (dateT) => {
        const date = new Date(dateT)
        return `${format(date, 'dd MMMM yyyy', { locale: fr })}`
    }
    
    return (
        <>
        <ToastContainer limit={1} />
            <div id='detailHead'>
                <div>
                    <Link to="/Inscription">
                        <IconButton aria-label="Retour">
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                </div>
                <div>
                    <h2>Détail Inscription</h2>
                </div>
            </div>
            {/* */}
            {
                loading ?
                <div className="d-flex justify-content-center align-items-center vh-100" style={{marginTop: '-100px'}}>
                <MoonLoader
                color={'rgb(52, 146, 52)'} size={50} 
                loading={loading}  
                aria-label="Loading Spinner" 
                data-testid="loader" />
                </div>
                :
                <div>
                    <div className="page mb-5">
                        <section className="clean-block payment-form">
                            <div className="container">
                                <div className="text-center">
                                    {imagePathIdentite && <img className="img-fluid mb-3 mt-2 imgEtudiant" src={imagePathIdentite} alt="Identite" width="190" height="200" onClick={() => openModal(imagePathIdentite)} />}
                                    <div className="mb-4">
                                        <h4>{etudiant.nom} {etudiant.prenom}</h4>
                                    </div>
                                </div>
                                <form id='formEtudiant'>
                                    <div className="products row">
                                        <div className="item text-center d-flex align-items-center col-sm-6">
                                            <p className="item-name form-label">image Bordereau: </p>
                                        </div>
                                        <div className="text-center col-sm-6 imgBordereau">
                                            {imagePathBordereau && <img className="mb-4 mt-4 img-fluid" src={imagePathBordereau} alt="Bordereau" width="190" height="200" onClick={() => openModal(imagePathBordereau)} />}
                                        </div>
                                    </div>
                                    <div className="card-details">
                                        <div className="row">
                                            <div className="text-center">
                                                <div className="col-sm-12">
                                                    <div className="mb-4 mt-4">
                                                        <label className="form-label">Numero Concours :</label>
                                                        <h1>{etudiant.numConcours}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-3 text-center">
                                                    <label className="form-label">Email</label>
                                                    <p>{etudiant.email}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-3 text-center">
                                                    <label className="form-label">Parcours</label>
                                                    <p>{etudiant.parcours}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-3 text-center">
                                                    <label className="form-label">Adresse</label>
                                                    <p>{etudiant.adresse}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mb-5">
                                                <div className="mb-3 text-center">
                                                    <label className="form-label">Date de Naissance</label>
                                                        <p>{formatDate(etudiant.datenais)}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-3" >
                                                    <CustomiezdButtom
                                                        className="d-block w-100"
                                                        loading={loadingValidation} 
                                                        onClick={handleValidation}
                                                        variant="contained"
                                                    >
                                                        <span>Accepter</span>
                                                    </CustomiezdButtom>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-3" >
                                                    <CustomButton
                                                        className="d-block w-100"
                                                        loading={loadingRejection} 
                                                        onClick={handleRejection}
                                                        variant="contained"
                                                    >
                                                        <span>Refuser</span>
                                                    </CustomButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            }
            {/* */}
        
            {/* Modal */}
            {modalOpen && (
                <div  className="modal" id="moda" style={{ display: "block" }}>
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img className="modal-content" src={modalImage} alt="ImageModal" />
                    {/* <div className="captionImage">{etudiant.nom} {etudiant.prenom}</div> */}
                </div>
            )}
        </>
    )
}

export default DetailInscription