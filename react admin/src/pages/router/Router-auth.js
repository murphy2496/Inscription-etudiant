import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '@/pages/auth/Login'
import Error from '@/_utils/Error'

const RouterAuth = () => {
    return (
        <Routes>
            <Route index element={<Login/>} />
            <Route path="Login" element={<Login/>}></Route>
            <Route path="*" element={<Error/>}></Route>
        </Routes>
    )
}

export default RouterAuth