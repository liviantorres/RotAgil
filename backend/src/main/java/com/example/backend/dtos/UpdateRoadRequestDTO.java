package com.example.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public record UpdateRoadRequestDTO(@Schema(example = "trajeto") String name) {

}
