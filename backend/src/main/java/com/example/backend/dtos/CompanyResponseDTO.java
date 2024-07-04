package com.example.backend.dtos;

import java.util.UUID;

public record CompanyResponseDTO(UUID id, String name, String email) {
}
