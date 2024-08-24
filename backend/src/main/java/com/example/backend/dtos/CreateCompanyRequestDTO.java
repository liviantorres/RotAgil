package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateCompanyRequestDTO(@NotBlank @NotNull String email, @NotBlank @NotNull String name, @NotBlank @NotNull String password) {
}
