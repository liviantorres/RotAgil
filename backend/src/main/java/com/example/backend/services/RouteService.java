package com.example.backend.services;

import com.example.backend.dtos.CreateRouteRequestDTO;
import com.example.backend.dtos.UpdateRouteRequestDTO;
import com.example.backend.entities.DeliveryPoint;
import com.example.backend.entities.Road;
import com.example.backend.entities.Route;
import com.example.backend.exceptions.types.MessageBadRequestException;
import com.example.backend.exceptions.types.MessageNotFoundException;
import com.example.backend.repositories.DeliveryPointRepository;
import com.example.backend.repositories.RoadRepository;
import com.example.backend.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private DeliveryPointRepository deliveryPointRepository;
    @Autowired
    private RoadRepository roadRepository;

    @Transactional(readOnly = true)
    public Route getById(Long id) {
        Optional<Route> route = Optional.ofNullable(
                this.routeRepository.findById(id)
                        .orElseThrow(
                                () -> new MessageNotFoundException("Rota não encontrada")
                        ));

        return route.get();
    }

    @Transactional(readOnly = true)
    public List<Route> getAllByRoadId(Long roadId) {
        return routeRepository.findByRoad(roadId);
    }

    @Transactional
    public void create(CreateRouteRequestDTO dto) {
        Optional<Road> road = Optional.ofNullable(
                this.roadRepository.findById(dto.roadId()).orElseThrow(
                        () -> new MessageNotFoundException("Rota não encontrada")
                )
        );

        this.routeRepository.findByInitialDeliveryPointAndDestinationDeliveryPoint(dto.initialDeliveryPointId(), dto.destinationDeliveryPointId()).ifPresent((user) -> { throw new MessageBadRequestException("Rota já existe"); });

        Route route = new Route();
        route.setInitialDeliveryPoint(dto.initialDeliveryPointId());
        route.setDestinationDeliveryPoint(dto.destinationDeliveryPointId());
        route.setDistance(dto.distance());
        route.setRoad(road.get());

        routeRepository.save(route);
    }

    @Transactional
    public void update(UpdateRouteRequestDTO dto, Long id) {

        if (dto.initialDeliveryPointId().equals(dto.destinationDeliveryPointId()))
            throw new MessageBadRequestException("Ponto de entrega inicial não pode ser igual ao Ponto de entrega final");

        Optional<Route> route = Optional.ofNullable(
                this.routeRepository.findById(id)
                        .orElseThrow(
                                () -> new MessageNotFoundException("Rota não encontrada")
                        ));

        route.get().setInitialDeliveryPoint(dto.initialDeliveryPointId());
        route.get().setDestinationDeliveryPoint(dto.initialDeliveryPointId());

        if (dto.distance() != 0)
            route.get().setDistance(dto.distance());

        this.routeRepository.save(route.get());
    }

    @Transactional
    public void delete(Long id) {
        Optional<Route> route = Optional.ofNullable(
                this.routeRepository.findById(id)
                        .orElseThrow(
                                () -> new MessageNotFoundException("Rota não encontrada")
                        ));

        this.routeRepository.delete(route.get());
    }
}
