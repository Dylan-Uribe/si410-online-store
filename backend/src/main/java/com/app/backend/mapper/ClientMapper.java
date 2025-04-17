package com.app.backend.mapper;

import com.app.backend.dto.ClientDto;
import com.app.backend.entity.Client;
import com.app.backend.entity.ClientType;

public class ClientMapper {
    public static ClientDto toEntityDto(Client client){

        if(client == null){
            return null;
        }

        return new ClientDto(
                client.getId(),
                client.getName(),
                client.getEmail(),
                client.getPhoneNumber(),
                client.getClientType().getId()
        );
    }

    public static Client toEntity(ClientDto clientDto){

        if(clientDto == null){
            return null;
        }

        ClientType  clientType = clientDto.getClientTypeId() != null
                ? new ClientType(clientDto.getClientTypeId(), null, null)
                : null;

        return new Client(
                clientDto.getId(),
                clientDto.getName(),
                clientDto.getEmail(),
                clientDto.getPhoneNumber(),
                clientType
        );
    }
}