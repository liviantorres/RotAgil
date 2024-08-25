package com.example.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateCompanyRequestDTO(@Schema(example = "teste@teste.com", requiredMode = Schema.RequiredMode.REQUIRED)
                                      @Email(message = "O campo [email] deve conter um e-mail válido") @NotBlank @NotNull String email,
                                      @Schema(example = "expert", requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank @NotNull String name,
                                      @Schema(example = "expert1234", requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank @NotNull String password) {
}
