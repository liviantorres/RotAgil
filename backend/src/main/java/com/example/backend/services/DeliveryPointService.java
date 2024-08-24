package com.example.backend.services;

import com.example.backend.dtos.CreateDeliveryPointRequestDTO;
import com.example.backend.dtos.UpdateDeliveryPointRequestDTO;
import com.example.backend.entities.DeliveryPoint;
import com.example.backend.entities.Road;
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
public class DeliveryPointService {

    @Autowired
    private DeliveryPointRepository deliveryPointRepository;
    @Autowired
    private RoadRepository roadRepository;
    @Autowired
    private RouteRepository routeRepository;

    @Transactional(readOnly = true)
    public DeliveryPoint getById(Long id) {
        Optional<DeliveryPoint> deliveryPoint = Optional.ofNullable(
                this.deliveryPointRepository.findById(id)
                        .orElseThrow(
                                () -> new MessageNotFoundException("Ponto de entrega não encontrada")
                        ));

        return deliveryPoint.get();
    }

    @Transactional(readOnly = true)
    public List<DeliveryPoint> getAllByRoadId(Long roadId) {
        return deliveryPointRepository.findByRoad(roadId);
    }

    @Transactional
    public void create(CreateDeliveryPointRequestDTO dto) {
        this.deliveryPointRepository.findByNameAndAddress(dto.name(), dto.address()).ifPresent((user) -> { throw new MessageBadRequestException("Ponto de entrega já cadastrado"); });

        Optional<Road> road = Optional.ofNullable(
                this.roadRepository.findById(dto.roadId()).orElseThrow(
                        () -> new MessageNotFoundException("Rota não encontrada")
                )
        );

        DeliveryPoint deliveryPoint = new DeliveryPoint();
        deliveryPoint.setName(dto.name());
        deliveryPoint.setAddress(dto.address());
        deliveryPoint.setRoad(road.get());

        this.deliveryPointRepository.save(deliveryPoint);
    }

    @Transactional
    public void update(UpdateDeliveryPointRequestDTO dto, Long id) {
        Optional<DeliveryPoint> deliveryPoint = Optional.ofNullable(
                this.deliveryPointRepository.findById(id)
                        .orElseThrow(
                                () -> new MessageNotFoundException("Ponto de entrega não encontrada")
                        ));

        if (dto.name() != null && !dto.name().isBlank())
            deliveryPoint.get().setName(dto.name());
        if (dto.address() != null && !dto.address().isBlank())
            deliveryPoint.get().setAddress(dto.address());

        this.deliveryPointRepository.save(deliveryPoint.get());
    }

    @Transactional
    public void delete(Long id) {

        if (!this.routeRepository.findByInitialDeliveryPointOrDestinationDeliveryPoint(id).isEmpty())
            throw new MessageBadRequestException("Ponto de entrega está vinculado a uma rota");

        Optional<DeliveryPoint> deliveryPoint = Optional.ofNullable(
                this.deliveryPointRepository.findById(id)
                        .orElseThrow(
                                () -> new MessageNotFoundException("Ponto de entrega não encontrada")
                        ));

        this.deliveryPointRepository.delete(deliveryPoint.get());
    }
}
