package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;


public record CreateRoadRequestDTO(@NotBlank String name, @NotBlank Long length, @NotBlank String startAddress, @NotBlank String endAddress, @NotBlank Long estimatedTime) {
} 
