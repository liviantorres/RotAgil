package com.example.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record GeneratePathResponseDTO(List<NodeDTO> deliveryPoints,
                                      @Schema(example = "3000") int totalDistance) {
}
