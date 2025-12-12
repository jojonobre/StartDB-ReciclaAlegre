import { useState, useEffect } from "react";
import { careggarSolicitacoes, requisitarColeta } from "../components/auth/api";
import type { SolicitacaoResponseDTO } from "../components/auth/AuthContext.types";
import { useAuth } from "../hooks/useAuth";
import styles from "../css/Solicitacoes.module.css";


export default function Solicitacoes() {
  const { token } = useAuth();
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function handleRequisitar(id: number) {
  try {
    await requisitarColeta(id, token!);

    setSolicitacoes((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, situacao: "PENDENTE" } : s
      )
    );
  } catch (err) {
    console.error(err);
    alert("Erro ao requisitar coleta");
  }
}


  useEffect(() => {
    async function fetchSolicitacoes() {
      setLoading(true);
      setError(null);

      try {
        const data = await careggarSolicitacoes(token!);
        setSolicitacoes(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Erro desconhecido ao carregar solicitações");
      } finally {
        setLoading(false);
      }
    }

    fetchSolicitacoes();
  }, [token]);

  if (loading) return <p>Carregando solicitações...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (solicitacoes.length === 0) return <p>Nenhuma solicitação encontrada.</p>;

  return (
    <div className={styles.container}>
      <h2>Todas Solicitações Disponíveis</h2>
      <ul className={styles.list}>
        {solicitacoes.map((s) => (
          <li key={s.id} className={styles.card}>
            <button className={styles.cardButton} onClick={() => handleRequisitar(s.id)} >
              Reciclar!
            </button>
            <p><strong>ID:</strong> {s.id}</p>
            <p><strong>Gerador:</strong> {s.gerador}</p>
            <p><strong>Data:</strong> {new Date(s.dataCriacao).toLocaleString()}</p>
            <p><strong>Situação:</strong> {s.situacao}</p>
            <p><strong>Descrição:</strong> {s.descricao}</p>
            <p>
              <strong>Endereço:</strong>{" "}
              {`${s.endereco.logradouro}, ${s.endereco.numero} - ${s.endereco.bairro}, ${s.endereco.cidade}/${s.endereco.estado}`}
            </p>
            <p>
              <strong>Materiais:</strong>{" "}
              {s.materiais.map((m) => `${m.tipoMaterial} (${m.quantidadeMaterial})`).join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
