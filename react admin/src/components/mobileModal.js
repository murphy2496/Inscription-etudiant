import React from 'react'
import '@/css/header.css'
import { Dropdown } from 'react-bootstrap'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout'
import AssignmentIcon from '@mui/icons-material/Assignment'
import InfoIcon from '@mui/icons-material/Info'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { accountService } from '@/_services/account.service'

const MobileModal = () => {
    let navigate = useNavigate()

    const logout = () => {
        accountService.logout()
        navigate('/auth/Login')
    }
    const Licence = () => {
        navigate('/Licence1')
    }
    const AdmisConcours = () => {
        navigate('/AdmisConcours')
    }
    const Notification = () => {
        navigate('/Inscription')
    }
    const Message = () => {
        navigate('/Message')
    }

    return (
        <div>
             <div className="modal fade"  id="openModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <strong>GESTION ETUDIANT</strong>
                            <div className="close">
                                <CloseIcon data-bs-dismiss="modal"/>
                            </div>
                        </div>
                        <div className="modal-body">
                            {/* */}
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="default" className="nav-link dropdown-toggle" id="drop_cases" role="button" aria-current="page">
                                            <AssignmentIcon className="icon"/> LISTE
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-menu">
                                            <Dropdown.Item className="dropdown-item">
                                                <Link to="/Licence1" type="boutton" data-bs-dismiss="modal"
                                                style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', height: '100%' }}
                                                onClick={Licence}>
                                                    Licence 1
                                                </Link>
                                            </Dropdown.Item> 
                                            <Dropdown.Divider />
                                            <Dropdown.Item className="dropdown-item">
                                                <Link to="/AdmisConcours" type="boutton" data-bs-dismiss="modal"
                                                style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', height: '100%' }}
                                                onClick={AdmisConcours}>
                                                    Admis concours
                                                </Link>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" data-bs-dismiss="modal" aria-current="page" onClick={Notification}>
                                        <NotificationsIcon className="icon"/>
                                        INSCRIPTION
                                    </button>
                                </li>
                                {/* <li className="nav-item">
                                    <button className="nav-link" data-bs-dismiss="modal" aria-current="page" onClick={Message}>
                                        <InfoIcon className="icon"/>
                                        MESSAGE
                                    </button>
                                </li> */}
                                <li className="nav-item" >
                                    <button className="nav-link" data-bs-dismiss="modal" aria-current="page" onClick={logout}>
                                        <LogoutIcon className="icon"/>
                                        DECONNEXION
                                    </button>
                                </li>
                            </ul>
                            {/* */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileModal