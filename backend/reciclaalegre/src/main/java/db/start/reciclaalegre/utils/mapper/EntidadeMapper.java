package db.start.reciclaalegre.utils.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import db.start.reciclaalegre.dto.PerfilRequestDTO;
import db.start.reciclaalegre.dto.PerfilResponseDTO;
import db.start.reciclaalegre.dto.UsuarioRequestDTO;
import db.start.reciclaalegre.dto.UsuarioResponseDTO;
import db.start.reciclaalegre.model.Perfil;
import db.start.reciclaalegre.model.Usuario;

@Mapper(componentModel = "spring")
public interface EntidadeMapper {

    UsuarioResponseDTO usuarioToDto(Usuario usuario);

    PerfilResponseDTO perfilToDto(Perfil perfil);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "solicitacoes", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    Perfil perfilToEntity(PerfilRequestDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ativo", expression = "java(true)")
    @Mapping(target = "authorities", ignore = true)
    Usuario usuarioToEntity(UsuarioRequestDTO dto);
}
