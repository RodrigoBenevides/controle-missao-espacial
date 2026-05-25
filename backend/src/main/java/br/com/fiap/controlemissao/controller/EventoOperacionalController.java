package br.com.fiap.controlemissao.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.fiap.controlemissao.model.EventoOperacional;
import br.com.fiap.controlemissao.service.EventoOperacionalService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/eventos")
public class EventoOperacionalController {

    private final EventoOperacionalService service;

    public EventoOperacionalController(EventoOperacionalService service) {
        this.service = service;
    }

    @GetMapping
    public List<EventoOperacional> listarTodos() {
        return service.listarTodos();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EventoOperacional salvar(@Valid @RequestBody EventoOperacional evento) {
        return service.salvar(evento);
    }
}
