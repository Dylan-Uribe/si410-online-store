package com.app.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ForeignKeyConstraintException extends RuntimeException {
    public ForeignKeyConstraintException(String message) {
        super(message);
    }
}
