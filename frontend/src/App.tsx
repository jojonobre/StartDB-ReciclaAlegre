import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./components/auth/AuthProvider"
import { PrivateRoute } from "./routes/PrivateRoute"
import Sobre from "./pages/Sobre"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import Sucesso from "./pages/Sucesso"
import MainLayout from "./components/layout/MainLayout"
import Lista from "./pages/Lista"
import AdicionarSolicitacao from "./pages/AdicionarSolicitacao"
import EditarSolicitacao from "./pages/EditarSolicitacoes"
import Perfil from "./pages/Perfil"

export default function App() {
    return (
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                 <Route path="/sobre" element={<Sobre />} />
                  <Route path="/cadastro" element={<Cadastro />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/sucesso" element={<Sucesso />} />

                  <Route element={<PrivateRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/Lista" element={<Lista />} />
                        <Route path="/AdicionarSolicitacao" element={<AdicionarSolicitacao />} />
                        <Route path="/EditarSolicitacao" element={<EditarSolicitacao />} />
                        <Route path="/Perfil" element={<Perfil />} />
                    </Route>
                  </Route>
              </Routes>
          </BrowserRouter>
      </AuthProvider>
    )
}