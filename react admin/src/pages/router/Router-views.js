import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Error from '@/_utils/Error'

import {
  Layout, Licence1, AdmisConcours, Inscription, Message,
  InfoEtudiant, DetailInscription,
} from '@/pages/Export'


const RouterViews = () => {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index element={<Licence1/>}></Route>
        
        <Route path="Licence1/*" element={
          <Routes>
            <Route index element={<Licence1/>}></Route>
            <Route path="/" element={<Licence1/>}></Route>
            <Route path="Info/:mat" element={<InfoEtudiant/>}></Route>
            <Route path="*" element={<Error/>}></Route>
          </Routes>
        }></Route>
        <Route path="AdmisConcours" element={<AdmisConcours/>}></Route>
        <Route path="Inscription/*" element={
          <Routes>
            <Route index element={<Inscription />}></Route>
            <Route path="/" element={<Inscription />}></Route>
            <Route path="Detail/:num" element={<DetailInscription/>}></Route>
            <Route path="*" element={<Error/>}></Route>
          </Routes>
        }></Route>
        <Route path="Message" element={<Message/>}></Route>
      </Route>
      
      <Route path="*" element={<Error/>}></Route>
    </Routes>
  )
}

export default RouterViews