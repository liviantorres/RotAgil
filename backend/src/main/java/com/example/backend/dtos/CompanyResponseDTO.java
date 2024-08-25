package com.example.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

public record CompanyResponseDTO(@Schema(example = "gffff-f9ffdfhz-rhrhtr") UUID id,
                                 @Schema(example = "expert") String name,
                                 @Schema(example = "teste@teste.com") String email) {
}
