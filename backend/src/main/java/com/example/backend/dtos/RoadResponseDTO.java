package com.example.backend.dtos;

import java.util.UUID;

public record RoadResponseDTO(Long id, String name, Long length, String startAddress, String endAddress, Long estimatedTime) {

}
