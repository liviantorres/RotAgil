package com.example.backend.services;

import com.example.backend.dtos.CreateDeliveryPointRequestDTO;
import com.example.backend.dtos.UpdateDeliveryPointRequestDTO;
import com.example.backend.entities.Company;
import com.example.backend.entities.DeliveryPoint;
import com.example.backend.exceptions.types.MessageBadRequestException;
import com.example.backend.exceptions.types.MessageNotFoundException;
import com.example.backend.repositories.CompanyRepository;
import com.example.backend.repositories.DeliveryPointRepository;
import com.example.backend.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DeliveryPointService {

    @Autowired
    private DeliveryPointRepository deliveryPointRepository;
    @Autowired
    private RouteRepository routeRepository;
    @Autowired
    private CompanyRepository companyRepository;

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
    public List<DeliveryPoint> getAllByCompany(UUID companyId) {
        return deliveryPointRepository.findAllByCompany(companyId);
    }

    @Transactional
    public DeliveryPoint create(CreateDeliveryPointRequestDTO dto, UUID companyId) {
        this.deliveryPointRepository.findByNameAndAddress(dto.name(), dto.address()).ifPresent((user) -> { throw new MessageBadRequestException("Ponto de entrega já cadastrado"); });

        Optional<Company> company = Optional.ofNullable(
                this.companyRepository.findById(companyId)
                        .orElseThrow(
                                () -> new MessageNotFoundException("Empresa não encontrada")
                        ));

        DeliveryPoint deliveryPoint = new DeliveryPoint();
        deliveryPoint.setName(dto.name());
        deliveryPoint.setAddress(dto.address());
        deliveryPoint.setCompany(company.get());

        this.deliveryPointRepository.save(deliveryPoint);

        return deliveryPoint;
    }

    @Transactional
    public DeliveryPoint update(UpdateDeliveryPointRequestDTO dto, Long id) {
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

        return deliveryPoint.get();
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
