package com.example.backend.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.PriorityQueue;

import org.springframework.stereotype.Service;

import com.example.backend.entities.Edge;
import com.example.backend.entities.Node;

@Service
public class PathService {
    public void computePaths(Node source) {
        source.minDistance = 0;
        PriorityQueue<Node> nodeQueue = new PriorityQueue<>();
        nodeQueue.add(source);

        while (!nodeQueue.isEmpty()) {
            Node u = nodeQueue.poll();

            // Visit each edge exiting u
            for (Edge e : u.adjacencies) {
                Node v = e.target;
                long weight = e.weight;
                long distanceThroughU = u.minDistance + weight;
                if (distanceThroughU < v.minDistance) {
                    nodeQueue.remove(v);
                    v.minDistance = distanceThroughU;
                    v.previous = u;
                    nodeQueue.add(v);
                }
            }
        }
    }

    public List<Node> getShortestPathTo(Node target) {
        List<Node> path = new ArrayList<>();
        for (Node node = target; node != null; node = node.previous)
            path.add(node);
        Collections.reverse(path);
        return path;
    }
}
