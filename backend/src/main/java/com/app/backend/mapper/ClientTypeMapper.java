package com.app.backend.mapper;

import com.app.backend.dto.ClientTypeDto;
import com.app.backend.entity.ClientType;

public class ClientTypeMapper {
    public static ClientTypeDto toEntityDto(ClientType clientType) {
        if (clientType == null) {
            return null;
        }
        return new ClientTypeDto(
                clientType.getId(),
                clientType.getName(),
                clientType.getDescription()
        );
    }

    public static ClientType toEntity(ClientTypeDto clientTypeDto) {
        if (clientTypeDto == null) {
            return null;
        }
        return new ClientType(
                clientTypeDto.getId(),
                clientTypeDto.getName(),
                clientTypeDto.getDescription()
        );
    }
}
