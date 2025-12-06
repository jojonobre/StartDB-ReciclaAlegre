package db.start.reciclaalegre.dto;

import db.start.reciclaalegre.model.enums.TipoUsuario;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UsuarioRequestDTO(
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8, max = 20) String senha,
        TipoUsuario tipoUsuario,
        @Valid PerfilRequestDTO perfil) {
}
