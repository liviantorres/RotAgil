package com.example.backend.dtos;

import jakarta.validation.constraints.NotNull;

public record CreateRouteRequestDTO(@NotNull Long roadId,
                                    @NotNull Long initialDeliveryPointId,
                                    @NotNull Long destinationDeliveryPointId,
                                    @NotNull int distance) {
}
