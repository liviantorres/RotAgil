package com.example.backend.dtos;

import com.example.backend.entities.DeliveryPoint;

public record RouteResponseDTO(Long id, DeliveryPoint initialDeliveryPoint, DeliveryPoint destinationDeliveryPoint, int distance) {
}
