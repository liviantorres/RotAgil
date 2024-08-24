package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AuthCompanyRequestDTO(@NotBlank @NotNull String email, @NotBlank @NotNull String password) {
}
