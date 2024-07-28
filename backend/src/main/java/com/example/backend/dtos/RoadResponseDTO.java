package com.example.backend.dtos;

import java.util.UUID;

public record RoadResponseDTO(UUID id, String name, Integer length, String startAddress, String endAddress, Integer estimatedTime) {

}
