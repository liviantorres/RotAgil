package com.example.backend.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Edge {
    public Long weight;
    public Node target;
    public String name;

    public Edge(Long weight, Node target, String name){
        this.weight = weight;
        this.target = target;
        this.name = name;
    }
}
