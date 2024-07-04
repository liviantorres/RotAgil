package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public record CreateCompanyRequestDTO(@NotBlank String email, @NotBlank String name, @NotBlank String password) {
}
