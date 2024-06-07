import Axios from './caller.service'

let login = (donnee) => {
    return Axios.post('/auth/login', donnee)
}

let saveToken = (Token) => {
    localStorage.setItem('user-info', Token)
}

let logout = () => {
    localStorage.removeItem('user-info')
}

let getToken = () => {
    localStorage.getItem('user-info')
}

let islogged = () => {
    var token = localStorage.getItem('user-info')
    return !!token // booléen
}

export const accountService = {
    login, saveToken, logout, getToken, islogged
}