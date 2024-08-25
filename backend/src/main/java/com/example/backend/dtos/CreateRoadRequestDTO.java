package com.example.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record CreateRoadRequestDTO(@Schema(example = "trajeto", requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank @NotNull String name) {
} 
