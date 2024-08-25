package com.example.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record UpdateRouteRequestDTO(@Schema(example = "1", requiredMode = Schema.RequiredMode.REQUIRED) @NotNull Long initialDeliveryPointId,
                                    @Schema(example = "2", requiredMode = Schema.RequiredMode.REQUIRED) @NotNull Long destinationDeliveryPointId,
                                    @Schema(example = "500", requiredMode = Schema.RequiredMode.REQUIRED) @NotNull int distance) {
}
