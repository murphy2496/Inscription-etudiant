import { Navigate } from 'react-router-dom'

const Logout = ({children}) => {
    var token = localStorage.getItem('user-info')

    if(token){
        return <Navigate to="/"/>
    }

    return children
}

export default Logout