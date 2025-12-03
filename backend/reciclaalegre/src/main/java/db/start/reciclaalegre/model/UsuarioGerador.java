package db.start.reciclaalegre.model;

import java.util.List;

import db.start.reciclaalegre.model.enums.TipoGerador;
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
public class UsuarioGerador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Usuario usuario;
    private Endereco endereco;
    @Enumerated(EnumType.STRING)
    private TipoGerador tipo;
    private List<Solicitacao> solicitacoes;
}
