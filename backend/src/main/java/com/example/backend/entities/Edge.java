package com.example.backend.entities;

public class Edge {
    public Double weight;
    public Node target;

    public Edge(Double weight, Node target) {
        this.weight = weight;
        this.target = target;
    }
}
