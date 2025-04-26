package com.app.backend.service;

import com.app.backend.dto.ClientTypeDto;
import java.util.List;

public interface ClientTypeService {
    ClientTypeDto getClientTypeById(Long id);

    List<ClientTypeDto> getAllClientTypes();

    ClientTypeDto createClientType(ClientTypeDto clientTypeDto);

    ClientTypeDto updateClientType(Long id, ClientTypeDto clientTypeDto);

    void deleteClientType(Long id);
}
