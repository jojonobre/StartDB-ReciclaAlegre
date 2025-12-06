package db.start.reciclaalegre.dto;

import db.start.reciclaalegre.model.enums.TipoUsuario;

public record UsuarioResponseDTO(
        Long id,
        String email,
        Boolean ativo,
        TipoUsuario tipoUsuario,
        PerfilResponseDTO perfil) {

}
