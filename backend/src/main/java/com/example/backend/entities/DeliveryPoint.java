package com.example.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "delivery_point")
@Getter
@Setter
@NoArgsConstructor
public class DeliveryPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String address;
    @NotNull
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
}
