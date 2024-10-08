package com.example.backend.services;

import com.example.backend.dtos.CreateRouteRequestDTO;
import com.example.backend.dtos.RouteResponseDTO;
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

import java.util.ArrayList;
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
    public RouteResponseDTO getById(Long id) {
        Optional<Route> route = Optional.ofNullable(
                this.routeRepository.findById(id)
                        .orElseThrow(
                                () -> new MessageNotFoundException("Rota não encontrada")
                        ));

        Optional<DeliveryPoint> initialDeliveryPoint = Optional.ofNullable(
                this.deliveryPointRepository.findById(route.get().getInitialDeliveryPointId())
                        .orElseThrow(
                                () -> new MessageNotFoundException("Ponto de entrega não encontrada")
                        ));

        Optional<DeliveryPoint> destinationDeliveryPoint = Optional.ofNullable(
                this.deliveryPointRepository.findById(route.get().getDestinationDeliveryPointId())
                        .orElseThrow(
                                () -> new MessageNotFoundException("Ponto de entrega não encontrada")
                        ));

        return new RouteResponseDTO(
                route.get().getId(),
                initialDeliveryPoint.get(),
                destinationDeliveryPoint.get(),
                route.get().getDistance()
                );
    }

    @Transactional(readOnly = true)
    public List<RouteResponseDTO> getAllByRoadId(Long roadId) {
        List<Route> routes = routeRepository.findByRoad(roadId);
        List<RouteResponseDTO> response = new ArrayList<>();

        if (!routes.isEmpty()){
            routes.forEach(route -> {
                Optional<DeliveryPoint> initialDeliveryPoint = Optional.ofNullable(
                        this.deliveryPointRepository.findById(route.getInitialDeliveryPointId())
                                .orElseThrow(
                                        () -> new MessageNotFoundException("Ponto de entrega não encontrada")
                                ));

                Optional<DeliveryPoint> destinationDeliveryPoint = Optional.ofNullable(
                        this.deliveryPointRepository.findById(route.getDestinationDeliveryPointId())
                                .orElseThrow(
                                        () -> new MessageNotFoundException("Ponto de entrega não encontrada")
                                ));

                response.add(new RouteResponseDTO(
                        route.getId(),
                        initialDeliveryPoint.get(),
                        destinationDeliveryPoint.get(),
                        route.getDistance()
                ));
            });
        }

        return response;
    }

    @Transactional
    public RouteResponseDTO create(CreateRouteRequestDTO dto) {

        if (dto.initialDeliveryPointId().equals(dto.destinationDeliveryPointId()))
            throw new MessageBadRequestException("Ponto de entrega inicial não pode ser igual ao Ponto de entrega final");

        Optional<Road> road = Optional.ofNullable(
                this.roadRepository.findById(dto.roadId()).orElseThrow(
                        () -> new MessageNotFoundException("Trajeto não encontrado")
                )
        );

        Optional<DeliveryPoint> initialDeliveryPoint = Optional.ofNullable(
                this.deliveryPointRepository.findById(dto.initialDeliveryPointId())
                        .orElseThrow(
                                () -> new MessageNotFoundException("Ponto de entrega não encontrada")
                        ));

        Optional<DeliveryPoint> destinationDeliveryPoint = Optional.ofNullable(
                this.deliveryPointRepository.findById(dto.destinationDeliveryPointId())
                        .orElseThrow(
                                () -> new MessageNotFoundException("Ponto de entrega não encontrada")
                        ));

        this.routeRepository.findByInitialDeliveryPointAndDestinationDeliveryPoint(dto.initialDeliveryPointId(), dto.destinationDeliveryPointId()).ifPresent((user) -> { throw new MessageBadRequestException("Rota já existe"); });

        Route route = new Route();
        route.setInitialDeliveryPointId(dto.initialDeliveryPointId());
        route.setDestinationDeliveryPointId(dto.destinationDeliveryPointId());
        route.setDistance(dto.distance());
        route.setRoad(road.get());

        routeRepository.save(route);

        return new RouteResponseDTO(
                route.getId(),
                initialDeliveryPoint.get(),
                destinationDeliveryPoint.get(),
                route.getDistance()
        );
    }

    @Transactional
    public RouteResponseDTO update(UpdateRouteRequestDTO dto, Long id) {

        if (dto.initialDeliveryPointId().equals(dto.destinationDeliveryPointId()))
            throw new MessageBadRequestException("Ponto de entrega inicial não pode ser igual ao Ponto de entrega final");

        Optional<Route> route = Optional.ofNullable(
                this.routeRepository.findById(id)
                        .orElseThrow(
                                () -> new MessageNotFoundException("Rota não encontrada")
                        ));

        Optional<DeliveryPoint> initialDeliveryPoint = Optional.ofNullable(
                this.deliveryPointRepository.findById(dto.initialDeliveryPointId())
                        .orElseThrow(
                                () -> new MessageNotFoundException("Ponto de entrega não encontrada")
                        ));

        Optional<DeliveryPoint> destinationDeliveryPoint = Optional.ofNullable(
                this.deliveryPointRepository.findById(dto.destinationDeliveryPointId())
                        .orElseThrow(
                                () -> new MessageNotFoundException("Ponto de entrega não encontrada")
                        ));

        route.get().setInitialDeliveryPointId(dto.initialDeliveryPointId());
        route.get().setDestinationDeliveryPointId(dto.destinationDeliveryPointId());

        route.get().setDistance(dto.distance());

        this.routeRepository.save(route.get());

        return new RouteResponseDTO(
                route.get().getId(),
                initialDeliveryPoint.get(),
                destinationDeliveryPoint.get(),
                route.get().getDistance()
        );
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
