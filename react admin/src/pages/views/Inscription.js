import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '@/css/notification.css'
import { etudiantService } from '@/_services/etudiant.service'
import socket from '@/_services/socket.service.js'  
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MoonLoader from "react-spinners/MoonLoader"
import { format, isToday } from 'date-fns'
import { fr } from 'date-fns/locale'


const Inscription = () => {

    const [etudiants, setEtudiants] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        socketN()
        getData()
    }, [])

    const socketN = () => {
        socket.on('newStudentAdded', (data) => {
            getData()
        })
        socket.on('Student Deleted', (data) => {
            getData()
        })
        socket.on('Notif_vu', (data) => {
            getData()
        })

        return () => {
            socket.off('newStudentAdded')
            socket.off('Student Deleted')
        }
    }

    const getData = () => {
        etudiantService.getAllInscription()
            .then(res => {
                console.log('res ...oui', res.data.data)
                setEtudiants(res.data.data)
                setLoading(false)
            })
    }

    const NotifClick = async (donnee) => {
        try {
            await etudiantService.updateStatusNotification(donnee)
            await etudiantService.deleteNewStudentAddedCount()
        } catch (err) {
            console.log(err)
        }
    }

    const formatDate = (dateT) => {
        const date = new Date(dateT)
        if (isToday(date)) {
            return `le ${format(date, 'dd MMMM yyyy', { locale: fr })} à ${format(date, 'HH:mm')}`
        } else {
            return `le ${format(date, 'dd MMMM yyyy', { locale: fr })}`
        }
    }

    return (
        <>
            <h2 className='titre'>Notification(s) Inscription</h2>
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
                    <div className='container col-xs-12'>
                        {etudiants.length === 0 ? (   // Vérifiez si la liste d'étudiants est vide
                            <h4 className='text-center aucun'><i>Aucune inscription</i></h4>
                        ) : (
                            etudiants.map((etudiant, index) => (
                                <Link to={`/Inscription/Detail/${etudiant.numConcours}`} onClick={() => NotifClick(etudiant.numConcours)} id='lien' key={index}>
                                    {/* Si notifVu est true : la classe CSS 'elementNotificationVu' sera appliquée, sinon la classe CSS 'elementNotification' sera utilisée */}
                                    <div className={etudiant.notifVu ? 'elementNotificationVu' : 'elementNotification'} id='grandNotif'>
                                        <div>
                                            <p><strong>{etudiant.nom} {etudiant.prenom}</strong> s'est inscrit via le formulaire d'inscription {formatDate(etudiant.createdAt)}</p>
                                        </div>
                                        <div>
                                            <p id='detail'><ChevronRightIcon /></p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            }
            {/* */}
        </>
    )
}

export default Inscription