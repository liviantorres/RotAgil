package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateDeliveryPointRequestDTO (@NotNull Long roadId, @NotBlank @NotNull String name, @NotBlank @NotNull String address) {
}
