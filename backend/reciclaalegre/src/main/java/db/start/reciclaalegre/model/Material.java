package db.start.reciclaalegre.model;

import db.start.reciclaalegre.model.enums.QuantidadeMaterial;
import db.start.reciclaalegre.model.enums.TipoMaterial;
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
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private TipoMaterial tipoMaterial;
    @Enumerated(EnumType.STRING)
    private QuantidadeMaterial quantidadeMaterial;
}
