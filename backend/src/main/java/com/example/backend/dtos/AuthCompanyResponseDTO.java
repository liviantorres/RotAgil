package com.example.backend.dtos;

public record AuthCompanyResponseDTO(String access_token, long expires_in, String company_id) {
}
