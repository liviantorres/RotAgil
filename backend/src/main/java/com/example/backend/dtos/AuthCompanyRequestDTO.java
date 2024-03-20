package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public record AuthCompanyRequestDTO(@NotBlank String name, @NotBlank String password) {
}
