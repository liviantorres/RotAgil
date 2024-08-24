package com.example.backend.entities;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Node implements Comparable<Node> {
    public String name;
    public Node previous;
    public int minDistance = Integer.MAX_VALUE;
    public ArrayList<Edge> adjacents = new ArrayList<>();

    public Node(String name){
        this.name = name;
    }

    public void addEdge(Node targetNode, int weight) {
        this.adjacents.add(new Edge(weight, targetNode));
    }

    public int compareTo(Node nodeAux) {
        return Long.compare(this.minDistance, nodeAux.minDistance);
    }
}
