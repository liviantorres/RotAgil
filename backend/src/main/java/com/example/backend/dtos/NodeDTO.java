package com.example.backend.dtos;

import java.util.List;

public record NodeDTO(String name, int index, List<EdgeDTO> adjacents) {
}
