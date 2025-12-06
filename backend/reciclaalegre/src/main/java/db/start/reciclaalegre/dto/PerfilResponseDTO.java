package db.start.reciclaalegre.dto;

import db.start.reciclaalegre.model.Endereco;

public record PerfilResponseDTO(
        String nome,
        Endereco endereco,
        String telefone) {

}
