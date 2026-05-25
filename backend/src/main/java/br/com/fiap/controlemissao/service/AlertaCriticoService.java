package br.com.fiap.controlemissao.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import br.com.fiap.controlemissao.model.AlertaCritico;
import br.com.fiap.controlemissao.repository.AlertaCriticoRepository;

@Service
public class AlertaCriticoService {

    private final AlertaCriticoRepository repository;

    public AlertaCriticoService(AlertaCriticoRepository repository) {
        this.repository = repository;
    }

    public List<AlertaCritico> listarTodos() {
        return repository.findAll();
    }

    public AlertaCritico salvar(AlertaCritico alerta) {
        if (alerta.getDataAlerta() == null) {
            alerta.setDataAlerta(LocalDateTime.now());
        }
        return repository.save(alerta);
    }
}
