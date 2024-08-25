package com.example.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AuthCompanyRequestDTO(@Schema(example = "teste@teste.com", requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank @NotNull String email,
                                    @Schema(example = "teste", requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank @NotNull String password) {
}
