package com.example.backend.entities;

import java.util.ArrayList;

public class Node implements Comparable<Node> {
    public final String name;
    public Node previous;
    public double minDistance = Double.POSITIVE_INFINITY;
    public ArrayList<Edge> adjacencies = new ArrayList<>();

    public Node(String name) {
        this.name = name;
    }

    public Double getMinDistance() {
        return this.minDistance;
    }

    public void setMinDistance(Double minDistance) {
        this.minDistance = minDistance;
    }

    public int compareTo(Node nodeAux) {
        return Double.compare(this.minDistance, nodeAux.minDistance);
    }
}
