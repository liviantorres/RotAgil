package com.example.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public record AuthCompanyResponseDTO(@Schema(example = "gfffffffdfhzrhrhtr")  String access_token,
                                     @Schema(example = "2000") long expires_in, String company_id) {
}
