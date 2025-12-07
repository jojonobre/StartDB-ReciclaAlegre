package db.start.reciclaalegre.dto;

import java.util.Set;

import db.start.reciclaalegre.model.Material;

public record SolicitacaoRequestDTO(
    Set<Material> materiais,
    String descricao
) {

}
