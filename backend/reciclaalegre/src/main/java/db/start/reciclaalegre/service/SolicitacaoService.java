package db.start.reciclaalegre.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import db.start.reciclaalegre.dto.SolicitacaoRequestDTO;
import db.start.reciclaalegre.dto.SolicitacaoResponseDTO;
import db.start.reciclaalegre.model.Solicitacao;
import db.start.reciclaalegre.model.Usuario;
import db.start.reciclaalegre.model.enums.StatusSolicitacao;
import db.start.reciclaalegre.repository.MaterialRepository;
import db.start.reciclaalegre.repository.SolicitacaoRepository;
import db.start.reciclaalegre.utils.usuario.UsuarioUtils;
import jakarta.transaction.Transactional;

@Service
public class SolicitacaoService {

    private final SolicitacaoRepository solicitacaoRepository;
    private final MaterialRepository materialRepository;
    private final UsuarioUtils usuarioUtils;

    public SolicitacaoService(SolicitacaoRepository solicitacaoRepository, UsuarioUtils usuarioUtils,
            MaterialRepository materialRepository) {
        this.solicitacaoRepository = solicitacaoRepository;
        this.materialRepository = materialRepository;
        this.usuarioUtils = usuarioUtils;
    }

    @Transactional
    public SolicitacaoResponseDTO criarSolicitacao(SolicitacaoRequestDTO dto, String email) {
        Usuario usuario = usuarioUtils.validarUsuario(email);
        materialRepository.saveAll(dto.materiais());

        Solicitacao solicitacao = new Solicitacao(null, usuario.getPerfil(), null, LocalDateTime.now(),
                usuario.getPerfil().getEndereco(), dto.materiais(), StatusSolicitacao.ATIVO, dto.descricao());
        solicitacaoRepository.save(solicitacao);

        return new SolicitacaoResponseDTO(solicitacao.getId(),
                solicitacao.getGerador().getNome(), solicitacao.getDataCriacao(),
                solicitacao.getDescricao(), solicitacao.getEndereco(),
                solicitacao.getSituacao(), solicitacao.getMateriais());
    }

}
