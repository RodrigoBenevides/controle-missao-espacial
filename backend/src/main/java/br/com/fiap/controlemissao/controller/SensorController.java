package br.com.fiap.controlemissao.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.fiap.controlemissao.model.Sensor;
import br.com.fiap.controlemissao.service.SensorService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/sensores")
public class SensorController {

    private final SensorService service;

    public SensorController(SensorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Sensor> listarTodos() {
        return service.listarTodos();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Sensor salvar(@Valid @RequestBody Sensor sensor) {
        return service.salvar(sensor);
    }
}
