package com.app.backend.service.impl;

import com.app.backend.dto.ClientTypeDto;
import com.app.backend.entity.ClientType;
import com.app.backend.mapper.ClientTypeMapper;
import com.app.backend.repository.ClientTypeRepository;
import com.app.backend.service.ClientTypeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientTypeImpl implements ClientTypeService {

    private final ClientTypeRepository clientTypeRepository;

    public ClientTypeImpl(ClientTypeRepository clientTypeRepository) {
        this.clientTypeRepository = clientTypeRepository;
    }

    @Override
    public ClientTypeDto getClientTypeById(Long id) {
        ClientType clientType = clientTypeRepository.findById(id)
                .orElseThrow();
        return ClientTypeMapper.toEntityDto(clientType);
    }

    @Override
    public List<ClientTypeDto> getAllClientTypes() {
        return clientTypeRepository.findAll().stream()
                .map(ClientTypeMapper::toEntityDto)
                .collect(Collectors.toList());
    }

    @Override
    public ClientTypeDto createClientType(ClientTypeDto clientTypeDto){
        ClientType clientType = ClientTypeMapper.toEntity(clientTypeDto);
        ClientType savedClientType = clientTypeRepository.save(clientType);
        return ClientTypeMapper.toEntityDto(savedClientType);
    }

    @Override
    public ClientTypeDto updateClientType(Long id, ClientTypeDto clientTypeDto) {
        ClientType existingClientType = clientTypeRepository.findById(id)
                .orElseThrow();

        existingClientType.setName(clientTypeDto.getName());
        existingClientType.setDescription(clientTypeDto.getDescription());

        ClientType updatedClientType = clientTypeRepository.save(existingClientType);
        return ClientTypeMapper.toEntityDto(updatedClientType);
    }

    @Override
    public void deleteClientType(Long id) {
        ClientType clientType = clientTypeRepository.findById(id)
                .orElseThrow();
        clientTypeRepository.delete(clientType);
    }
}
