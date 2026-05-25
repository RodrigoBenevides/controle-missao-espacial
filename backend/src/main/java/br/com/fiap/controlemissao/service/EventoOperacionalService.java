package br.com.fiap.controlemissao.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import br.com.fiap.controlemissao.model.EventoOperacional;
import br.com.fiap.controlemissao.repository.EventoOperacionalRepository;

@Service
public class EventoOperacionalService {

    private final EventoOperacionalRepository repository;

    public EventoOperacionalService(EventoOperacionalRepository repository) {
        this.repository = repository;
    }

    public List<EventoOperacional> listarTodos() {
        return repository.findAll();
    }

    public EventoOperacional salvar(EventoOperacional evento) {
        if (evento.getDataEvento() == null) {
            evento.setDataEvento(LocalDateTime.now());
        }
        return repository.save(evento);
    }
}
