import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { criarSolicitacao } from "../components/auth/api";
import styles from "../css/AdicionarSolicitacao.module.css";
import type { SolicitacaoRequestDTO, MaterialDTO } from "../components/auth/AuthContext.types";

const tiposMaterial: MaterialDTO["tipoMaterial"][] = [
  "PAPEL", "PLASTICO", "METAL", "VIDRO", "MADEIRA",
  "ELETRONICO", "TECIDO", "OLEO", "ORGANICO", "OUTROS"
];

const pesoParaQuantidade = (peso: number): MaterialDTO["quantidadeMaterial"] => {
  if (peso < 5) return "LEVE";
  if (peso < 15) return "MEDIO";
  if (peso < 30) return "PESADO";
  return "MUITO_PESADO";
};


interface MaterialComPeso {
  tipoMaterial: MaterialDTO["tipoMaterial"];
  peso: number;
}

export default function AdicionarSolicitacao() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState("");
  const [materiais, setMateriais] = useState<MaterialComPeso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) return <p>Você precisa estar logado para criar uma solicitação.</p>;


  const handleAddMaterial = () => {
    setMateriais((prev) => [
      ...prev,
      { tipoMaterial: "PAPEL", peso: 0 }
    ]);
  };

  const handleChangeMaterial = <K extends keyof MaterialComPeso>(
    index: number,
    key: K,
    value: MaterialComPeso[K]
  ) => {
    setMateriais((prev) =>
      prev.map((mat, i) =>
        i === index ? { ...mat, [key]: value } : mat
      )
    );
  };

  const handleRemoveMaterial = (index: number) => {
    setMateriais((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    if (materiais.length === 0) {
      setError("Adicione ao menos um material.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const dto: SolicitacaoRequestDTO = {
        descricao,
        materiais: materiais.map((m) => ({
          tipoMaterial: m.tipoMaterial,
          quantidadeMaterial: pesoParaQuantidade(m.peso),
        }))
      };

      await criarSolicitacao(dto, token);
      navigate("/lista");

    } catch (err: any) {
      setError(err.message || "Erro ao criar solicitação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Criar Solicitação</h2>

      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <label>Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite a descrição da solicitação..."
            required
          />
        </div>

        <h3>Materiais</h3>

        {materiais.map((mat, idx) => (
          <div key={idx} className={styles.materialCard}>
            <div className={styles.group}>
              <label>Tipo</label>
              <select
                value={mat.tipoMaterial}
                onChange={(e) =>
                  handleChangeMaterial(idx, "tipoMaterial", e.target.value as MaterialDTO["tipoMaterial"])
                }
              >
                {tiposMaterial.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            <div className={styles.group}>
              <label>Peso (kg)</label>
              <input
                type="number"
                min={0}
                value={mat.peso}
                onChange={(e) =>
                  handleChangeMaterial(idx, "peso", Number(e.target.value))
                }
              />
            </div>

            <button
              type="button"
              className={styles.removeButton}
              onClick={() => handleRemoveMaterial(idx)}
            >
              Remover
            </button>
          </div>
        ))}

        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddMaterial}
        >
          Adicionar Material
        </button>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Criar Solicitação"}
        </button>
      </form>
    </div>
  );
}
