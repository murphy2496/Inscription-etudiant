import React, { useState , useEffect} from 'react'
import '@/css/header.css'
import { Dropdown } from 'react-bootstrap'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout'
import AssignmentIcon from '@mui/icons-material/Assignment'
import InfoIcon from '@mui/icons-material/Info'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { accountService } from '@/_services/account.service'
import { etudiantService } from '../_services/etudiant.service'
import socket from '@/_services/socket.service.js' 
import MobileModal from './mobileModal'
import ENI from '@/assets/777.png'
import Badge from '@mui/material/Badge'


const Header = () => {
    const [newCount, setNewCount] = useState(parseInt(localStorage.getItem('NewCount')) || 0)

    let navigate = useNavigate()
    
    useEffect(() => {
       socketN()
       getNotifCount()
    }, [])

    const socketN = () => {
        socket.on('newStudentAdded', (data) => {
            // console.log('donnee : ', data)
            // console.log('count : ', data.increment.count)
            localStorage.setItem('NewCount', data.increment.count)

            setNewCount(data.increment.count)
        })

        socket.on('StudentTruncate', () => {
            setNewCount(0)
            localStorage.removeItem('NewCount')
        })

        return () => {
            socket.off('newStudentAdded')
            socket.off('StudentTruncate')
        }
    }

    const getNotifCount = async () => {
        try {
            let res = await etudiantService.getNewStudentAddedCount()
            // console.log('count : ', res.data.data.count)
            if (!res.data.error) { 
                setNewCount(res.data.data.count)
            }
            
        } catch (err) {
            console.log(err)
        }
    }

    const NotifClick = async () => {
        setNewCount(0)
        localStorage.removeItem('NewCount')

        var response = await etudiantService.deleteNewStudentAddedCount()
        // console.log('vider valiny : ', response)
    }

    const logout = () => {
        accountService.logout()
        navigate('/auth/Login')
        localStorage.removeItem('NewCount')
    }
   
    return (
        <header>

            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand">
                    <img src={ENI} alt="ENI" className="sari"/>
                        {/* <strong>Ecole Nationale d'Informatique</strong> */}
                    </a>
                    <button type="button" className="navbar-toggler" data-bs-toggle="modal" data-bs-target="#openModal">
                        <input type="checkbox" name="checkbox" id="toggle-menu" />
                        <label for="toggle-menu" type="button" className="toggle-btn">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </label>
                    </button>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <Dropdown>
                                    <Dropdown.Toggle variant="default" className="nav-link dropdown-toggle" id="drop_cases" role="button" aria-current="page">
                                        <AssignmentIcon className="icon"/> LISTE
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu">
                                        <Dropdown.Item className="dropdown-item">
                                            <Link to="/Licence1" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', height: '100%' }}>
                                                Licence 1
                                            </Link>
                                        </Dropdown.Item> 
                                        <Dropdown.Divider />
                                        <Dropdown.Item className="dropdown-item">
                                            <Link to="/AdmisConcours" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', height:'100%' }}>
                                                Admis concours
                                            </Link>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                            <li className="nav-item">
                                <Link to="/Inscription" className="nav-link" onClick={NotifClick} aria-current="page" >
                                    <Badge badgeContent={newCount} color="primary" className="icon">
                                        <NotificationsIcon  />
                                    </Badge>
                                    INSCRIPTION
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link to="/Message" className="nav-link"  aria-current="page">
                                    <InfoIcon className="icon"/>
                                    MESSAGE
                                </Link>
                            </li> */}
                            <li className="nav-item" aria-current="page">
                                <button className="nav-link" onClick={logout}>
                                    <LogoutIcon className="icon"/>
                                </button>
                            </li>
                        </ul>
                    </div> 
                </div>
            </nav>

            <MobileModal/>
           

        </header>
    )
}

export default Header