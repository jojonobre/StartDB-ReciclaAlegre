import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import { 
  carregarSolicitacoesPorUsuario, 
  atualizarSolicitacao 
} from "../components/auth/api";
import type { MaterialDTO, SolicitacaoRequestDTO } from "../components/auth/AuthContext.types";

// --- Constantes e Helpers ---

const tiposMaterial: MaterialDTO["tipoMaterial"][] = [
  "PAPEL", "PLASTICO", "METAL", "VIDRO", "MADEIRA",
  "ELETRONICO", "TECIDO", "OLEO", "ORGANICO", "OUTROS"
];

// Lógica de envio (Peso -> Enum)
const pesoParaQuantidade = (peso: number): MaterialDTO["quantidadeMaterial"] => {
  if (peso < 5) return "LEVE";
  if (peso < 15) return "MEDIO";
  if (peso < 30) return "PESADO";
  return "MUITO_PESADO";
};

// Lógica reversa para Edição (Enum -> Peso Estimado visual)
const quantidadeParaPesoEstimado = (qtd: string): number => {
  switch (qtd) {
    case "LEVE": return 4;
    case "MEDIO": return 10;
    case "PESADO": return 20;
    case "MUITO_PESADO": return 35;
    default: return 0;
  }
};

interface MaterialComPeso {
  tipoMaterial: MaterialDTO["tipoMaterial"];
  peso: number;
}

export default function EditarSolicitacoes() {
  const auth = useContext(AuthContext);
  
  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    descricao: "",
    materiais: [] as MaterialComPeso[]
  });

  useEffect(() => {
    if (!auth?.token) return;
    carregarSolicitacoesPorUsuario(auth.token)
      .then((data) => setSolicitacoes(data))
      .catch(() => console.error("Erro ao carregar"))
      .finally(() => setLoading(false));
  }, [auth?.token]);

  const handleEditarClick = (solicitacao: any) => {
    setEditandoId(solicitacao.id);
    
    const materiaisConvertidos: MaterialComPeso[] = (solicitacao.materiais || []).map((m: any) => ({
      tipoMaterial: m.tipoMaterial,
      peso: quantidadeParaPesoEstimado(m.quantidadeMaterial)
    }));

    setFormData({
      descricao: solicitacao.descricao || "",
      materiais: materiaisConvertidos
    });
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setFormData({ descricao: "", materiais: [] });
  };

  const handleAddMaterial = () => {
    setFormData(prev => ({
      ...prev,
      materiais: [...prev.materiais, { tipoMaterial: "PAPEL", peso: 0 }]
    }));
  };

  const handleRemoveMaterial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      materiais: prev.materiais.filter((_, i) => i !== index)
    }));
  };

  const handleChangeMaterial = (index: number, field: keyof MaterialComPeso, value: any) => {
    setFormData(prev => ({
      ...prev,
      materiais: prev.materiais.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSalvar = async () => {
    try {
      if (!auth?.token || !editandoId) return;

      if (formData.materiais.length === 0) {
        alert("Adicione ao menos um material.");
        return;
      }

      const dto: SolicitacaoRequestDTO = {
        descricao: formData.descricao,
        materiais: formData.materiais.map((m) => ({
          tipoMaterial: m.tipoMaterial,
          quantidadeMaterial: pesoParaQuantidade(m.peso),
        }))
      };

      const itemAtualizado = await atualizarSolicitacao(editandoId, dto, auth.token);

      setSolicitacoes((prev) => 
        prev.map((s) => (s.id === editandoId ? itemAtualizado : s))
      );

      setEditandoId(null);
      alert("Solicitação atualizada!");

    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar solicitação");
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Gerenciar Solicitações</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {solicitacoes.map((s) => (
          <li key={s.id} style={{ marginBottom: 20, border: "1px solid #ccc", padding: 15, borderRadius: 8 }}>
            
            {editandoId === s.id ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ margin: 0 }}>Editando Solicitação #{s.id}</h4>   
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: 5 }}>Descrição:</label>
                    <textarea
                        value={formData.descricao}
                        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                        style={{ width: '100%', padding: 8 }}
                        rows={3}
                    />
                </div>

                <div style={{ background: '#f9f9f9', padding: 10, borderRadius: 5 }}>
                    <h5 style={{ marginTop: 0 }}>Materiais</h5>
                    
                    {formData.materiais.map((mat, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                            <select
                                value={mat.tipoMaterial}
                                onChange={(e) => handleChangeMaterial(idx, "tipoMaterial", e.target.value)}
                                style={{ padding: 5 }}
                            >
                                {tiposMaterial.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>

                            <input
                                type="number"
                                placeholder="Kg"
                                value={mat.peso}
                                min={0}
                                onChange={(e) => handleChangeMaterial(idx, "peso", Number(e.target.value))}
                                style={{ width: 80, padding: 5 }}
                            />
                            <span>kg</span>

                            <button 
                                onClick={() => handleRemoveMaterial(idx)}
                                style={{ background: '#ff4444', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: 4 }}
                            >
                                X
                            </button>
                        </div>
                    ))}

                    <button 
                        onClick={handleAddMaterial}
                        style={{ background: '#2196F3', color: 'white', border: 'none', padding: '8px', cursor: 'pointer', borderRadius: 4, width: '100%' }}
                    >
                        + Adicionar Material
                    </button>
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <button onClick={handleSalvar} style={{ flex: 1, padding: 10, background: '#4CAF50', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                        Salvar Alterações
                    </button>
                    <button onClick={handleCancelar} style={{ flex: 1, padding: 10, background: '#9e9e9e', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                        Cancelar
                    </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>ID: {s.id}</strong>
                    <span style={{ fontWeight: 'bold', color: s.status === 'CONCLUIDO' ? 'green' : 'orange' }}>
                        {s.status}
                    </span>
                </div>
                
                <p style={{ margin: "10px 0" }}>{s.descricao}</p>

                <div style={{ background: '#eee', padding: '8px', borderRadius: 4, fontSize: '0.9em' }}>
                    <strong>Materiais:</strong>
                    <ul style={{ margin: '5px 0 0 20px', padding: 0 }}>
                        {s.materiais?.map((m: any, i: number) => (
                            <li key={i}>
                                {m.tipoMaterial} - {m.quantidadeMaterial}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <button 
                  onClick={() => handleEditarClick(s)}
                  style={{ marginTop: 15, padding: "8px 16px", cursor: "pointer", background: "#007bff", color: "white", border: "none", borderRadius: 4 }}
                >
                  Editar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}