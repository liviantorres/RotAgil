package com.example.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateDeliveryPointRequestDTO (@Schema(example = "1", requiredMode = Schema.RequiredMode.REQUIRED) @NotNull Long roadId,
                                             @Schema(example = "ponto 1", requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank @NotNull String name,
                                             @Schema(example = "rua tal", requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank @NotNull String address) {
}
