package com.app.backend.service.impl;

import com.app.backend.dto.ClientDto;
import com.app.backend.entity.Client;
import com.app.backend.exception.ForeignKeyConstraintException;
import com.app.backend.exception.ResourceNotFoundException;
import com.app.backend.mapper.ClientMapper;
import com.app.backend.repository.ClientRepository;
import com.app.backend.repository.ClientTypeRepository;
import com.app.backend.service.ClientService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final ClientTypeRepository clientTypeRepository;

    public ClientImpl(ClientRepository clientRepository,
                      ClientTypeRepository clientTypeRepository) {
        this.clientRepository = clientRepository;
        this.clientTypeRepository = clientTypeRepository;
    }

    @Override
    public ClientDto getClientById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + id));
        return ClientMapper.toEntityDto(client);
    }

    @Override
    public List<ClientDto> getAllClients() {
        return clientRepository.findAll().stream()
                .map(ClientMapper::toEntityDto)
                .collect(Collectors.toList());
    }

    @Override
    public ClientDto createClient(ClientDto clientDto) {
        if (!clientTypeRepository.existsById(clientDto.getClientTypeId())) {
            throw new ForeignKeyConstraintException("Cannot create Client. ClientType with ID " + clientDto.getClientTypeId() + " does not exist.");
        }
        Client client = ClientMapper.toEntity(clientDto);
        Client savedClient = clientRepository.save(client);
        return ClientMapper.toEntityDto(savedClient);
    }

    @Override
    public ClientDto updateClient(Long id, ClientDto clientDto) {
        Client existingClient = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + id));

        existingClient.setName(clientDto.getName());
        existingClient.setEmail(clientDto.getEmail());

        Client updatedClient = clientRepository.save(existingClient);
        return ClientMapper.toEntityDto(updatedClient);
    }

    @Override
    public void deleteClient(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + id));
        clientRepository.delete(client);
    }

}
