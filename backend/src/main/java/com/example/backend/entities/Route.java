package com.example.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "route")
@Getter
@Setter
@NoArgsConstructor
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank
    @ManyToMany
    private DeliveryPoint initialDeliveryPoint;
    @NotBlank
    @ManyToMany
    private DeliveryPoint destinationDeliveryPoint;
    @NotBlank
    private int distance;
    @JsonIgnore
    @ManyToOne
    private Road road;
}
