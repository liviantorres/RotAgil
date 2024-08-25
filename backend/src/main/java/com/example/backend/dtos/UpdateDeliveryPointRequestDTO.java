package com.example.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public record UpdateDeliveryPointRequestDTO(@Schema(example = "ponto 1") String name,
                                            @Schema(example = "rua") String address) {
}
