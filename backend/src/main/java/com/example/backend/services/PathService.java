package com.example.backend.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.PriorityQueue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entities.DeliveryPoint;
import com.example.backend.entities.Edge;
import com.example.backend.entities.Node;
import com.example.backend.entities.Route;
import com.example.backend.repositories.DeliveryPointRepository;
import com.example.backend.repositories.RouteRepository;

@Service
public class PathService {
    private List<Node> graph = new ArrayList<>();
    @Autowired
    private RouteRepository routeRepository;   
    @Autowired
    private DeliveryPointRepository deliveryPointRepository;


    void generateRoute(Long roadId, Long deliveryPointId) {
        List<Route> routes = this.routeRepository.findByRoad(roadId);

        DeliveryPoint deliveryPoint = this.deliveryPointRepository.findById(deliveryPointId).get();
        Node source = new Node(deliveryPoint.getName());
        this.graph.add(source);
        
        for (Route r : routes) {
            DeliveryPoint initialDeliveryPoint = this.deliveryPointRepository.findById(r.getDestinationDeliveryPoint()).get();
            Node initialNode = new Node(initialDeliveryPoint.getName());


            DeliveryPoint destinatioDiveryPoint = this.deliveryPointRepository.findById(r.getDestinationDeliveryPoint()).get();
            Node destinationNode = new Node(destinatioDiveryPoint.getName());

            Node initialNodeAux = existNode(initialNode);
            Node destinationNodeAux = existNode(destinationNode);

            if (initialNodeAux ==  null ) this.graph.add(initialNode);
            if (destinationNodeAux ==  null ) this.graph.add(destinationNode);
        }
    }

    private Node existNode(Node node) {
        for(Node n : this.graph)
            if(n.name.equals(node.name)) return n;

        return null;
    }

    public void computePaths(Node source) {
        source.minDistance = 0;
        PriorityQueue<Node> nodeQueue = new PriorityQueue<>();
        nodeQueue.add(source);

        while (!nodeQueue.isEmpty()) {
            Node u = nodeQueue.poll();

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
