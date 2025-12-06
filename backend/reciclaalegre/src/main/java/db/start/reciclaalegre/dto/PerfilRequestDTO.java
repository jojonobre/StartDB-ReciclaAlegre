package db.start.reciclaalegre.dto;

import db.start.reciclaalegre.model.Endereco;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record PerfilRequestDTO(
        @NotBlank @Size(min = 5, max =100 ) String nome,
        @Valid Endereco endereco,
        @NotBlank @Pattern(regexp = "\\d{11}") String telefone) {

}
