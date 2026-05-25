package br.com.fiap.controlemissao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fiap.controlemissao.model.AlertaCritico;

public interface AlertaCriticoRepository extends JpaRepository<AlertaCritico, Long> {
}
