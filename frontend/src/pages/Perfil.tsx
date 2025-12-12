import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../components/auth/AuthContext';
import { getMe } from '../components/auth/api';
import type { UsuarioResponseDTO } from '../components/auth/AuthContext.types';

export default function Perfil() {
  const auth = useContext(AuthContext);
  const [usuario, setPerfil] = useState<UsuarioResponseDTO | null>(null);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth?.token) {
        setLoading(false);
        return;
    }

    getMe(auth.token)
      .then((data) => setPerfil(data))
      .catch((err) => {
        console.error(err);
        setError("Não foi possível carregar os dados do perfil.");
      })
      .finally(() => setLoading(false));
      
  }, [auth?.token]);

  if (loading) return <div className="container">Carregando...</div>;
  
  if (error) return <div className="container" style={{ color: 'red' }}>{error}</div>;

  if (!usuario) return <div className="container">Usuário não encontrado.</div>;

  return (
    <div className="container" style={{ padding: 20 }}>
        <h1>Meu Perfil</h1>
        
        <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8, maxWidth: 400 }}>
            <p style={{ marginBottom: 10 }}>
                <strong>Nome:</strong> {usuario.perfil.nome}
            </p>
            <p style={{ marginBottom: 10 }}>
                <strong>Email:</strong> {usuario.email}
            </p>
            
            {usuario.tipoUsuario && (
                <><p>
            <strong>Permissão:</strong> {usuario.tipoUsuario}
          </p><p>
              <strong>Endereco:</strong> {usuario.perfil.endereco.logradouro} - {usuario.perfil.endereco.cidade} - {usuario.perfil.endereco.numero} / {usuario.perfil.endereco.estado}             
            </p></>
            )}
        </div>
    </div>
  );
}