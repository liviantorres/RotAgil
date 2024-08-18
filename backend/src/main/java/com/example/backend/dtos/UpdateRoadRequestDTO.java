package com.example.backend.dtos;

public record UpdateRoadRequestDTO(String name, Long length, String startAddress, String endAddress, Long estimatedTime) {

}
