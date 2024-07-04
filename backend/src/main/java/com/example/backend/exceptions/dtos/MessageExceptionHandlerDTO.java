package com.example.backend.exceptions.dtos;

import java.util.Date;

public record MessageExceptionHandlerDTO(Date timestamp, Integer status, String message) {
}
