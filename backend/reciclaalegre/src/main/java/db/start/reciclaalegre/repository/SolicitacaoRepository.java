package db.start.reciclaalegre.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import db.start.reciclaalegre.model.Solicitacao;
import db.start.reciclaalegre.model.enums.StatusSolicitacao;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    List<Solicitacao> findAllBySituacao(StatusSolicitacao status);

    @Query("""
            SELECT s FROM Solicitacao s
            WHERE s.gerador.id = :id
            OR s.coletor.id = :id
            """)
    List<Solicitacao> findByUsuarioId(@Param("id") Long id);

}
