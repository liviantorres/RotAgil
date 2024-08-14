package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public record CreateRouteRequestDTO(@NotBlank Long roadId,
                                    @NotBlank Long initialDeliveryPointId,
                                    @NotBlank Long destinationDeliveryPointId,
                                    @NotBlank int distance) {
}
