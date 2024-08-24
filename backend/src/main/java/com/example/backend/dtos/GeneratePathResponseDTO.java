package com.example.backend.dtos;

import java.util.List;

public record GeneratePathResponseDTO(List<NodeDTO> deliveryPoints, int totalDistance) {
}
