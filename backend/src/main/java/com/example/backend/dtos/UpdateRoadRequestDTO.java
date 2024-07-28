package com.example.backend.dtos;

public record UpdateRoadRequestDTO(String name, Integer length, String startAddress, String endAddress, Integer estimatedTime) {

}
