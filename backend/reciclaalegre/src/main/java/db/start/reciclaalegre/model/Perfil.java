package db.start.reciclaalegre.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Perfil {

    @Id
    private Long id;
    
    private String nome;

    @Embedded
    private Endereco endereco;
    private String telefone;

    @OneToMany(mappedBy = "gerador")
    private List<Solicitacao> solicitacoes = new ArrayList<>();

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Usuario usuario;

    public void adicionarSolicitacao(Solicitacao solicitacao){
        solicitacoes.add(solicitacao);
    }

    public void removerSolicitacao(Solicitacao solicitacao){
        solicitacoes.remove(solicitacao);
    }
}
