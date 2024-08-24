package com.example.backend.dtos;

import jakarta.validation.constraints.NotNull;

public record GeneratePathRequestDTO(@NotNull Long roadId, @NotNull Long initialDeliveryPointId, @NotNull Long destinationDeliveryPointId) {
}
