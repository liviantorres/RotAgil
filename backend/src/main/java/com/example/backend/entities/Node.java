package com.example.backend.entities;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Node implements Comparable<Node> {
    public String name;
    public Node previous;
    public double minDistance = Double.POSITIVE_INFINITY;
    public ArrayList<Edge> adjacencies = new ArrayList<>();

    public Node(String name){
        this.name = name;
    }

    public void addEdge(Node targetNode, Double weight, String nam) {
        this.adjacencies.add(new Edge(weight, targetNode, name));
    }

    public int compareTo(Node nodeAux) {
        return Double.compare(this.minDistance, nodeAux.minDistance);
    }

    public String toString() {
        return name;
    }
}
