import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login';
import { EsqueciSenha } from './components/esqueci-senha/EsqueciSenha';
import { RedefinirSenha } from './components/esqueci-senha/RefefinirSenha';
import { Toaster } from 'react-hot-toast';
import { VerifyToken } from './components/private-route/VerifyToken';
import { PainelAluno } from './components/painel-aluno/aluno/PainelAluno';
import { VerifyLogged } from './components/private-route/VerifyLogged';
import { EmailEnviado } from './components/esqueci-senha/EmailEnviado';
import { PainelAdmFeed } from './components/painel-adm/painel-adm-feed/PainelAdmFeed';
import { CriarCronograma1 } from './components/painel-adm/criar-cronograma/etapa1/CriarCronograma1';
import { VerifyAdm } from './components/private-route/VerifyAdm';
import { Redirecionamento } from './components/redirecionando/Redirecionamento';
import { VerifyAluno } from './components/private-route/VerifyAluno';
import { GerenciarUsuarios } from './components/painel-adm/gerenciar-usuarios/gerenciar-usuarios/GerenciarUsuarios';
import { Pastas } from './components/painel-adm/gerenciar-cronogramas/pastas/Pastas';
import { GerenciarCronogramas } from './components/painel-adm/gerenciar-cronogramas/dentro-da-pasta/GerenciarCronogramas';
import { CriarCronograma2 } from './components/painel-adm/criar-cronograma/etapa2/CriarCronograma2';
import { CriarCronograma3 } from './components/painel-adm/criar-cronograma/etapa3/CriarCronograma3';
import { EstatisticasAluno } from './components/painel-aluno/estatisticas/EstatisticasAluno';
import { HistoricoCronogramas } from './components/painel-aluno/historico/HistoricoCronogramas';

function App() {


  return (
    <>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontFamily: '"Poppins", sans-serif',
          }, success: {
            iconTheme: {
              primary: 'linear-gradient(90deg, #8C2BE2 0%, #4D02E0 100%);',
              secondary: 'white',
            },
          },
        }}
      />
      <Router>



        <Routes>
          {/* admin */}
          <Route path='/' element={<VerifyLogged><Login /></VerifyLogged>} />
          <Route path='/esqueci-senha/:email?' element={<EsqueciSenha />} />
          <Route path='/redefinir-senha/:id' element={<RedefinirSenha />} />
          <Route path='/redirecionamento' element={<VerifyToken><Redirecionamento /></VerifyToken>} />
          <Route path='/email-enviado' element={<EmailEnviado />} />
          <Route path='/painel-adm-feed' element={<VerifyAdm><PainelAdmFeed /></VerifyAdm>} />
          <Route path='/criar-cronograma1' element={<VerifyAdm><CriarCronograma1 /></VerifyAdm>} />
          <Route path='/gerenciar-usuarios' element={<VerifyAdm><GerenciarUsuarios /></VerifyAdm>} />
          <Route path='/gerenciar-cronogramas' element={<VerifyAdm><Pastas /></VerifyAdm>} />
          <Route path='/gerenciar-cronogramas/:idPasta' element={<VerifyAdm><GerenciarCronogramas /></VerifyAdm>} />
          <Route path='/criar-cronograma2/:idCronograma' element={<VerifyAdm><CriarCronograma2 /></VerifyAdm>} />
          <Route path='/criar-cronograma3/:idCronograma' element={<VerifyAdm><CriarCronograma3 /></VerifyAdm>} />
          {/* aluno */}
          <Route path='/painel-aluno' element={<VerifyAluno><PainelAluno /></VerifyAluno>} />
          <Route path='/painel-aluno-estatisticas' element={<VerifyAluno><EstatisticasAluno /></VerifyAluno>} />
          <Route path='/painel-aluno-historico-cronogramas' element={<VerifyAluno><HistoricoCronogramas /></VerifyAluno>} />

        </Routes>
      </Router>
    </>


  )
}


export default App
