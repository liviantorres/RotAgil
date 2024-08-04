package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public record CreateDeliveryPointRequestDTO (@NotBlank Long roadId, @NotBlank String name, @NotBlank String address) {
}
