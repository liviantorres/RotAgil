package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public record UpdateCompanyRequestDTO(String email, String name, String password) {
}
