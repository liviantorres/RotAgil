package com.example.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record NodeDTO(@Schema(example = "ponto 1") String name,
                      @Schema(example = "2") int index,
                      List<EdgeDTO> adjacents) {
}
