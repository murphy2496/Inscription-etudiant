import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './_utils/Error';
import Home from './pages/home';
import Ex from './pages/ex';
import Registration from './pages/registration';
import Success from './pages/success';
import FileInput from './pages/css/file';
import Contact from './pages/contact';
import Inscription from './pages/Inscription';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="/FileInput" element={<FileInput />} />
          <Route path="/Ex" element={<Ex />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Success" element={<Success />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Inscription" element={<Inscription />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;