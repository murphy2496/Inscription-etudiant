import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { etudiantService } from '@/_services/etudiant.service'
import { IconButton } from '@mui/material'
import '@/css/infoEtudiant.css'
import MoonLoader from "react-spinners/MoonLoader"
import { format} from 'date-fns'
import { fr } from 'date-fns/locale'

const InfoEtudiant = () => {
    let {mat} = useParams()
    //console.log('matricule : ', mat)
    const [etudiant, setEtudiant] = useState([])
    const [imageEtudiant, setImageEtudiant] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalImage, setModalImage] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            var res = await etudiantService.getLicence1(mat)
            // console.log(res)

            var response = await etudiantService.getImageEtudiantLicence1(mat)
            // console.log('response ...oui', response)
            // console.log('response ...oui', response.request.response)

            setEtudiant(res.data.data)
            setImageEtudiant(response.request.responseURL)
            
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
        
    }

    const openModal = (image) => {
        setModalOpen(true);
        setModalImage(image)
    }
    const closeModal = () => {
        setModalOpen(false)
    }

    const formatDate = (dateT) => {
        const date = new Date(dateT)
        return `${format(date, 'dd MMMM yyyy', { locale: fr })}`
    }

    return (
        <>
            <div style={{ overflowX: 'hidden' }}>
                <div className="container">
                    <div className="col-md-12 text-start">
                        <Link to="/Licence1">
                            <IconButton aria-label="Retour">
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
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
                                {/* */}
                                <div className="row">
                                    <div className="col-lg-12 vert rounded-left text-center text-white">
                                        <div className="card-block">
                                            { imageEtudiant && <img  
                                                src={imageEtudiant}
                                                alt="Student"
                                                className="rounded-circle img-fluid mb-2 border border-white card-stats shadow" id="photo"
                                                style={{ width: '130px', height: '130px', marginTop: '12px' }}
                                                onClick={() => openModal(imageEtudiant)} 
                                            />}
                                            <h3 className="font-weight-bold ">{etudiant.nom} {etudiant.prenom}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 bg-white rounded-right">
                                        <div className="text-center">
                                            <h4 className="mt-2" style={{fontWeight: '50'}}>Information</h4>
                                        </div>
                                        <hr className="badge-primary mt-0 custom-hr mx-auto" />
                                        <div className="row">
                                            <div className="col-md-6 " style={{ position: 'relative', left: '13%' }}>
                                                <p style={{fontWeight: '600'}}>Matricule :</p>
                                                <h6 className="custom-muted">{etudiant.matricule}</h6>
                                            </div>
                                            <div className="col-md-6" style={{ position: 'relative', left: '13%' }}>
                                                <p style={{fontWeight: '600'}}>Parcours :</p>
                                                <h6 className="custom-muted">{etudiant.parcours}</h6>
                                            </div>
                                        </div>
                                        <div className="col-md-12" style={{ paddingLeft: '13%', paddingRight: '13%' }}>
                                            <hr className="badge-primary mx-auto" />
                                        </div>
                                        <div className="mt-2"></div>
                                        <div className="row">
                                            <div className="col-md-6" style={{ position: 'relative', left: '13%' }}>
                                                <p style={{fontWeight: '600'}}>Email :</p>
                                                <h6 className="custom-muted">{etudiant.email}</h6>
                                            </div>
                                            <div className="col-md-6" style={{ position: 'relative', left: '13%' }}>
                                                <p style={{fontWeight: '600'}}>Adresse :</p>
                                                <h6 className="custom-muted">{etudiant.adresse}</h6>
                                            </div>
                                        </div>
                                        <div className="col-md-12" style={{ paddingLeft: '13%', paddingRight: '13%' }}>
                                            <hr className="badge-primary mx-auto" />
                                        </div>
                                        <div className="mt-2"></div>
                                        <div className="row">
                                            <div className="col-md-6" style={{ position: 'relative', left: '13%' }}>
                                                <p style={{fontWeight: '600'}}>Date de naissance :</p>
                                                <h6 className="custom-muted">{formatDate(etudiant.datenais)}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2"></div>
                                </div >
                    {/* ModalImage */}
                    {modalOpen && (
                        <div className="modal" id="moda" style={{ display: "block"}} >
                            <span className="close" onClick={closeModal}>&times;</span>
                            <img className="modal-content" src={modalImage} alt="ImageModal" />
                        </div>
                    )}
                            {/* */}
                        </div>
                    }
                    {/* */}
                    
                </div>
                <div className="mt-0"></div>
            </div>
        </>
    )
}

export default InfoEtudiant
