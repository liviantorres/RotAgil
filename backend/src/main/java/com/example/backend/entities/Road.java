package com.example.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "road")
@Getter
@Setter
@NoArgsConstructor
public class Road {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    @Min(0)
    private Long length;
    @NotBlank
    private String startAddress;
    @NotBlank
    private String endAddress;
    @NotBlank
    @Min(0)
    private Long estimatedTime;
    @OneToMany
    private Route routes[];
}
