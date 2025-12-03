package db.start.reciclaalegre.model;

import java.time.LocalDateTime;
import java.util.List;

import db.start.reciclaalegre.model.enums.StatusSolicitacao;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Solicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private UsuarioGerador gerador;
    private UsuarioColetor coletor;
    private LocalDateTime dataCriacao;
    private Endereco endereco;
    private List<Material> materiais;
    @Enumerated(EnumType.STRING)
    private StatusSolicitacao situacao;
    private String descricao;

}
