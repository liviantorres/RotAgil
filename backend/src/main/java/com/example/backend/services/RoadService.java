package com.example.backend.services;

import com.example.backend.entities.Company;
import com.example.backend.repositories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.CreateRoadRequestDTO;
import com.example.backend.dtos.UpdateRoadRequestDTO;
import com.example.backend.entities.Road;
import com.example.backend.exceptions.types.MessageBadRequestException;
import com.example.backend.exceptions.types.MessageNotFoundException;
import com.example.backend.repositories.RoadRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoadService {
    @Autowired
    private RoadRepository roadRepository;
    @Autowired
    private CompanyRepository companyRepository;

    @Transactional
    public void create(CreateRoadRequestDTO dto, UUID companyId) {
        this.roadRepository.findByNameAndCompanyId(dto.name(), companyId).ifPresent((user) -> { throw new MessageBadRequestException("Rota com mesmo nome já existe"); });

        Optional<Company> company = Optional.ofNullable(
                this.companyRepository.findById(companyId)
                        .orElseThrow(
                                () -> new MessageNotFoundException("Empresa não encontrada")
                        ));

        Road road = new Road();
        road.setName(dto.name());
        road.setCompany(company.get());

        this.roadRepository.save(road);
    }

    @Transactional(readOnly = true)
    public List<Road> getAllByCompanyId(UUID companyId) {
        return roadRepository.findAllByCompanyId(companyId);
    }

    @Transactional(readOnly = true)
    public Road getById(Long id) {
        Optional<Road> road = Optional.ofNullable(
            this.roadRepository.findById(id).orElseThrow(
                () -> new MessageNotFoundException("Rota não encontrada")
            )
        );

        return road.get();
    }

    @Transactional
    public void update(UpdateRoadRequestDTO dto, Long id) {
        Optional<Road> road = Optional.ofNullable(
            this.roadRepository.findById(id).orElseThrow(
                () -> new MessageNotFoundException("Rota não encontrada")
            )
        );

        road.ifPresent(r -> {
            r.setName(dto.name() != null && !dto.name().isBlank() ? road.get().getName() : null);
        });
    
        this.roadRepository.save(road.get());
    }

    @Transactional
    public void delete(Long id) {
        Optional<Road> road = Optional.ofNullable(
            this.roadRepository.findById(id).orElseThrow(
                () -> new MessageNotFoundException("Rota não encontrada")
            )
        );

        this.roadRepository.delete(road.get());
    }
}
