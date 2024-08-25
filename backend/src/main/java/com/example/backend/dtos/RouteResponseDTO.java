package com.example.backend.dtos;

import com.example.backend.entities.DeliveryPoint;
import io.swagger.v3.oas.annotations.media.Schema;

public record RouteResponseDTO(@Schema(example = "1") Long id,
                               @Schema(example = "2") DeliveryPoint initialDeliveryPoint,
                               @Schema(example = "3") DeliveryPoint destinationDeliveryPoint,
                               @Schema(example = "200") int distance) {
}
