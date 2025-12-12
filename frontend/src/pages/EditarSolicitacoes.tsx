import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import { carregarSolicitacoesPorUsuario } from "../components/auth/api";

export default function EditarSolicitacoes() {
  const auth = useContext(AuthContext);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.token) return;

    carregarSolicitacoesPorUsuario(auth.token)
      .then((data) => setSolicitacoes(data))
      .catch(() => console.error("Erro ao carregar solicitações"))
      .finally(() => setLoading(false));
  }, [auth?.token]);

  if (loading) return <p>Carregando...</p>;

  if (!solicitacoes.length) {
    return <p>Nenhuma solicitação encontrada</p>;
  }

  return (
    <div>
      <h2>Minhas Solicitações</h2>

      <ul>
        {solicitacoes.map((s: any) => (
          <li key={s.id} style={{ marginBottom: 12 }}>
            <strong>ID:</strong> {s.id} <br />
            <strong>Tipo:</strong> {s.tipo || "Sem tipo"} <br />
            <strong>Descrição:</strong> {s.descricao || "Sem descrição"} <br />
            <strong>Status:</strong> {s.status || "Indefinido"}
          </li>
        ))}
      </ul>
    </div>
  );
}
