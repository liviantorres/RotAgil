package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public record AuthCompanyRequestDTO(@NotBlank String email, @NotBlank String password) {
}
