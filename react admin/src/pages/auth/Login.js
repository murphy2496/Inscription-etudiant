import React, { useState } from 'react'
import '@/css/login.css'
import { useNavigate } from 'react-router-dom'
import { accountService } from '@/_services/account.service'
import PersonIcon from '@mui/icons-material/Person'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import ENI from '@/assets/777.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
    const [credentials, setCredentials] = useState({
        matricule: '',
        password: ''
    })

    var navigate = useNavigate()

    const Change = (e) => {
        //console.log(e.target.name)
        //console.log(e.target.value)
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
        //console.log(e.target.name)
        //console.log(e.target.value)
    }

    const Submit = async (e) => {
        e.preventDefault();
        try{
            var res = await accountService.login(credentials)
            console.log(res)
            if (!res.data.error) {
                accountService.saveToken(res.data.access_token)
                navigate('/')
            }

            // alert(res.data.error.message)
            toast.warn(res.data.error.message, {
                position: 'top-center', 
                autoClose: 3000,
            })
           
        }catch(err){
            console.log(err)
        }
    }

    return (
        <section id="section">
             <ToastContainer limit={2}/>
            <div className="login-box">
                <form onSubmit={Submit}>
                    <img src={ENI} alt="ENI" className="sa"/>
                    <div className="input-box">
                    <span className="icon"><PersonIcon/></span>
                        <input type="text" name="matricule" value={credentials.matricule} onChange={Change} required/>
                        <label htmlFor="matricule">Matricule</label>
                    </div>
                    <div className="input-box">
                        <span className="icon"><VpnKeyIcon/></span>
                        <input type="password" name="password" value={credentials.password} onChange={Change} required/>
                        <label htmlFor="password">Mot de passe</label>
                    </div>
                    <button type="submit" className="login-button">Se connecter</button>
                    {/* <div className="forgot">
                    <a href="/mot-de-passe-oublie">Mot de passe oublié ?</a>
                    </div> */}
                </form>
            </div>
        </section>
    )
}

export default Login