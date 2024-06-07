import { Navigate } from 'react-router-dom'

const IsLogged = ({children}) => {
    var token = localStorage.getItem('user-info')

    if(!token){
        return <Navigate to="/auth/Login"/>
    }

    return children
}

export default IsLogged