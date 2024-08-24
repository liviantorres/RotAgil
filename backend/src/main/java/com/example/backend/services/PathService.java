package com.example.backend.services;

import java.util.*;

import com.example.backend.dtos.EdgeDTO;
import com.example.backend.dtos.GeneratePathRequestDTO;
import com.example.backend.dtos.GeneratePathResponseDTO;
import com.example.backend.dtos.NodeDTO;
import com.example.backend.exceptions.types.MessageBadRequestException;
import com.example.backend.exceptions.types.MessageNotFoundException;
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

    @Autowired
    private RouteRepository routeRepository;   
    @Autowired
    private DeliveryPointRepository deliveryPointRepository;


    public GeneratePathResponseDTO generateRoute(GeneratePathRequestDTO dto) {
        List<Node> graph = new ArrayList<>();

        List<Route> routes = this.routeRepository.findByRoad(dto.roadId());

        if (routes.isEmpty())
            throw new MessageBadRequestException("Não existe nenhuma rota para esse trajeto");

        Optional<DeliveryPoint> sourceDeliveryPoint = Optional.ofNullable(
                this.deliveryPointRepository.findById(dto.initialDeliveryPointId())
                        .orElseThrow(
                                () -> new MessageNotFoundException("Ponto de entrega não encontrada")
                        ));

        Node source = new Node(sourceDeliveryPoint.get().getName());
        graph.add(source);

        Optional<DeliveryPoint> targetDeliveryPoint = Optional.ofNullable(
                this.deliveryPointRepository.findById(dto.destinationDeliveryPointId())
                        .orElseThrow(
                                () -> new MessageNotFoundException("Ponto de entrega não encontrada")
                        ));

        Node target = new Node(targetDeliveryPoint.get().getName());
        graph.add(target);

        generateGraph(routes, graph);

        computePaths(source);

        return getShortestPathTo(source, target);
    }

    private Node getNode(Node node, List<Node> graph) {
        for(Node n : graph)
            if(n.name.equals(node.name)) return n;

        return null;
    }

    private void generateGraph(List<Route> routes, List<Node> graph) {
        for (Route route : routes) {
            DeliveryPoint initialDeliveryPoint = this.deliveryPointRepository.findById(route.getInitialDeliveryPointId()).get();
            Node initialNode = new Node(initialDeliveryPoint.getName());


            DeliveryPoint destinationDeliveryPoint = this.deliveryPointRepository.findById(route.getDestinationDeliveryPointId()).get();
            Node destinationNode = new Node(destinationDeliveryPoint.getName());

            Node initialNodeTemp = getNode(initialNode, graph);
            Node destinationNodeTemp = getNode(destinationNode, graph);

            if (initialNodeTemp ==  null ){
                graph.add(initialNode);
                initialNodeTemp = initialNode;
            }
            if (destinationNodeTemp ==  null ) {
                graph.add(destinationNode);
                destinationNodeTemp = destinationNode;
            }

            initialNodeTemp.addEdge(destinationNodeTemp, route.getDistance());
        }
    }

    private void computePaths(Node source) {
        source.minDistance = 0;
        PriorityQueue<Node> nodeQueue = new PriorityQueue<>();
        nodeQueue.add(source);

        while (!nodeQueue.isEmpty()) {
            Node u = nodeQueue.poll();

            for (Edge e : u.adjacents) {
                Node v = e.target;
                int weight = e.weight;
                int distanceThroughU = u.minDistance + weight;
                if (distanceThroughU < v.minDistance) {
                    v.minDistance = distanceThroughU;
                    v.previous = u;
                    nodeQueue.add(v);
                }
            }
        }
    }

    private GeneratePathResponseDTO getShortestPathTo(Node source, Node target) {
        List<Node> path = new ArrayList<>();

        for (Node node = target; node != null; node = node.previous)
            path.add(node);

        if (!path.contains(source))
            throw new MessageBadRequestException("Não existe um caminho de " + source.name + " a " + target.name);

        Collections.reverse(path);

        List<NodeDTO> deliveryPoints = new ArrayList<>();

        for (Node node : path){
            List<EdgeDTO> adjacents = new ArrayList<>();

            for (Edge edge : node.adjacents)
                adjacents.add(new EdgeDTO(edge.target.name, path.indexOf(edge.target) + 1));

            deliveryPoints.add(new NodeDTO(node.getName(), path.indexOf(node) + 1, adjacents));
        }

        return new GeneratePathResponseDTO(deliveryPoints, target.minDistance);
    }

}
