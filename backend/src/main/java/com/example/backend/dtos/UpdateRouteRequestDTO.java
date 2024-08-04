package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public record UpdateRouteRequestDTO(@NotBlank Long initialDeliveryPointId,
                                    @NotBlank Long destinationDeliveryPointId,
                                    int distance) {
}
