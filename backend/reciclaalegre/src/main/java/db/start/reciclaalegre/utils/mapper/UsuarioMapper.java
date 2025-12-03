package db.start.reciclaalegre.utils.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import db.start.reciclaalegre.dto.UsuarioRequestDTO;
import db.start.reciclaalegre.dto.UsuarioResponseDTO;
import db.start.reciclaalegre.model.Usuario;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    UsuarioResponseDTO toDto(Usuario usuario);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "isAtivo", expression = "java(true)")
    @Mapping(target = "tipoUsuario", ignore = true)
    Usuario toEntity(UsuarioRequestDTO dto);
}
