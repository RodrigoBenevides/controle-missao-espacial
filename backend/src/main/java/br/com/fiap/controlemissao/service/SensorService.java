package br.com.fiap.controlemissao.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import br.com.fiap.controlemissao.model.Sensor;
import br.com.fiap.controlemissao.repository.SensorRepository;

@Service
public class SensorService {

    private final SensorRepository repository;

    public SensorService(SensorRepository repository) {
        this.repository = repository;
    }

    public List<Sensor> listarTodos() {
        return repository.findAll();
    }

    public Sensor salvar(Sensor sensor) {
        if (sensor.getDataRegistro() == null) {
            sensor.setDataRegistro(LocalDateTime.now());
        }
        return repository.save(sensor);
    }
}
