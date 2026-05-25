package br.com.fiap.controlemissao.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.fiap.controlemissao.model.AlertaCritico;
import br.com.fiap.controlemissao.service.AlertaCriticoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/alertas")
public class AlertaCriticoController {

    private final AlertaCriticoService service;

    public AlertaCriticoController(AlertaCriticoService service) {
        this.service = service;
    }

    @GetMapping
    public List<AlertaCritico> listarTodos() {
        return service.listarTodos();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AlertaCritico salvar(@Valid @RequestBody AlertaCritico alerta) {
        return service.salvar(alerta);
    }
}
