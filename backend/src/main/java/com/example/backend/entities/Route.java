package com.example.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    @NotNull
    private Long initialDeliveryPointId;
    @NotNull
    private Long destinationDeliveryPointId;
    @NotNull
    private int distance;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "road_id")
    private Road road;
}
