import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login';
import { EsqueciSenha } from './components/esqueci-senha/EsqueciSenha';
import { RedefinirSenha } from './components/esqueci-senha/RefefinirSenha';
function App() {


  return (
    <Router>


      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/esqueci-senha/:email?' element={<EsqueciSenha />} />
        <Route path='/redefinir-senha/:id' element={<RedefinirSenha />} />
      </Routes>
    </Router>
  )
}


export default App
