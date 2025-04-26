package com.app.backend.service;

import com.app.backend.dto.ClientDto;
import java.util.List;

public interface ClientService {
    ClientDto getClientById(Long id);

    List<ClientDto> getAllClients();

    ClientDto createClient(ClientDto clientDto);

    ClientDto updateClient(Long id, ClientDto clientDto);

    void deleteClient(Long id);
}
