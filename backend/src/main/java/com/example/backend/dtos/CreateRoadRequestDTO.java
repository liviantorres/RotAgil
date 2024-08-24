package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record CreateRoadRequestDTO(@NotBlank @NotNull String name) {
} 
