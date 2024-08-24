package com.example.backend.dtos;

import jakarta.validation.constraints.NotNull;

public record UpdateRouteRequestDTO(@NotNull Long initialDeliveryPointId,
                                    @NotNull Long destinationDeliveryPointId,
                                    @NotNull int distance) {
}
