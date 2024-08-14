package com.example.backend.entities;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Node implements Comparable<Node> {
    public String name;
    public Node previous;
    public long minDistance = Long.MAX_VALUE;
    public ArrayList<Edge> adjacencies = new ArrayList<>();

    public Node(String name){
        this.name = name;
    }

    public void addEdge(Node targetNode, Long weight, String nam) {
        this.adjacencies.add(new Edge(weight, targetNode, name));
    }

    public int compareTo(Node nodeAux) {
        return Long.compare(this.minDistance, nodeAux.minDistance);
    }

    public String toString() {
        return name;
    }
}
