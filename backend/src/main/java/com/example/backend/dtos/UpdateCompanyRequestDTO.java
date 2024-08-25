package com.example.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public record UpdateCompanyRequestDTO(@Schema(example = "teste@teste.com") String email,
                                      @Schema(example = "expert") String name,
                                      @Schema(example = "teste") String password) {
}
