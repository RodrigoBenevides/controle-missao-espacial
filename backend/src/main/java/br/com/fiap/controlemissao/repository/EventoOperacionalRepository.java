package br.com.fiap.controlemissao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fiap.controlemissao.model.EventoOperacional;

public interface EventoOperacionalRepository extends JpaRepository<EventoOperacional, Long> {
}
