package br.com.fiap.controlemissao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fiap.controlemissao.model.Sensor;

public interface SensorRepository extends JpaRepository<Sensor, Long> {
}
