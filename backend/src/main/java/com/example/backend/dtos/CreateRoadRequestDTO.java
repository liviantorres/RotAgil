package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;


public record CreateRoadRequestDTO(@NotBlank String name) {
} 
