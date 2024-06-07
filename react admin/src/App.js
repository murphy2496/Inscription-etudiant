import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RouterViews from '@/pages/router/Router-views'
import RouterAuth from '@/pages/router/Router-auth'
import IsLogged from '@/_guards/islogged'
import Logout from '@/_guards/logout'

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/*" element={
            <IsLogged>
              <RouterViews/>
            </IsLogged>
          }></Route>
          <Route path="/auth/*" element={
            <Logout>
              <RouterAuth/>
            </Logout>
          }></Route>
        </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App