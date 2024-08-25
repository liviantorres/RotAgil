package com.example.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public record EdgeDTO(@Schema(example = "ponto 1") String name,
                      @Schema(example = "1") int index) {
}
