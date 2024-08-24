package com.example.backend.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Edge {
    public int weight;
    public Node target;

    public Edge(int weight, Node target){
        this.weight = weight;
        this.target = target;
    }
}
