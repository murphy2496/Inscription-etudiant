import axios from 'axios'
import { accountService } from './account.service'

const Axios = axios.create({
    baseURL: 'http://localhost:8885'
})

 /******************************/
/* intercepteur pour le token */
Axios.interceptors.request.use(request => {

    if(accountService.islogged()){
        request.headers.Authorization = 'Bearer' + accountService.getToken()
    }

    return request
})

export default Axios