package com.app.backend.controller;

import com.app.backend.dto.ClientTypeDto;
import com.app.backend.service.ClientTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/client-types")
@CrossOrigin
public class ClientTypeController {

    private final ClientTypeService clientTypeService;

    public ClientTypeController(ClientTypeService clientTypeService) {
        this.clientTypeService = clientTypeService;
    }

    @GetMapping
    public ResponseEntity<List<ClientTypeDto>> getAllClientTypes() {
        return ResponseEntity.ok(clientTypeService.getAllClientTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientTypeDto> getClientTypeById(@PathVariable Long id) {
        return ResponseEntity.ok(clientTypeService.getClientTypeById(id));
    }

    @PostMapping
    public ResponseEntity<ClientTypeDto> createClientType(@RequestBody ClientTypeDto clientTypeDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clientTypeService.createClientType(clientTypeDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientTypeDto> updateClientType(@PathVariable Long id, @RequestBody ClientTypeDto clientTypeDto) {
        return ResponseEntity.ok(clientTypeService.updateClientType(id, clientTypeDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClientType(@PathVariable Long id) {
        clientTypeService.deleteClientType(id);
        return ResponseEntity.ok("Client type deleted successfully");
    }
}
