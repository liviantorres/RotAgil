package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.CreateRoadRequestDTO;
import com.example.backend.dtos.RoadResponseDTO;
import com.example.backend.dtos.UpdateRoadRequestDTO;
import com.example.backend.entities.Road;
import com.example.backend.exceptions.types.MessageBadRequestException;
import com.example.backend.exceptions.types.MessageNotFoundException;
import com.example.backend.repositories.RoadRepository;
import org.springframework.transaction.annotation.Transactional;

import java.lang.foreign.Linker.Option;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoadService {
    @Autowired
    private RoadRepository roadRepository;

    @Transactional
    public void create(CreateRoadRequestDTO dto) {
        this.roadRepository.findByName(dto.name()).ifPresent((user) -> { throw new MessageBadRequestException("Rota com mesmo nome já existe"); });
        
        Road road = new Road();
        road.setName(dto.name());
        road.setLength(dto.length());
        road.setStartAddress(dto.startAddress());
        road.setEndAddress(dto.endAddress());
        road.setEstimatedTime(dto.estimatedTime());

        this.roadRepository.save(road);
    }

    @Transactional(readOnly = true)
    public RoadResponseDTO getById(Long id) {
        Optional<Road> road = Optional.ofNullable(
            this.roadRepository.findById(id).orElseThrow(
                () -> new MessageNotFoundException("Rota não encontrada")
            )
        );

        return new RoadResponseDTO(
            road.get().getId(), 
            road.get().getName(), 
            road.get().getLength(), 
            road.get().getStartAddress(), 
            road.get().getEndAddress(), 
            road.get().getEstimatedTime()
            );
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
            r.setLength(dto.length() != null ? road.get().getLength() : null);
            r.setStartAddress(dto.startAddress() != null && !dto.startAddress().isBlank() ? road.get().getStartAddress() : null);
            r.setEndAddress(dto.endAddress() != null && !dto.endAddress().isBlank() ? road.get().getEndAddress() : null);
            r.setEstimatedTime(dto.estimatedTime() != null ? road.get().getEstimatedTime() : null);
        });
    
        this.roadRepository.save(road.get());
    }

    @Transactional
    public void delete(Long id) {
        Optional<Road> company = Optional.ofNullable(
            this.roadRepository.findById(id).orElseThrow(
                () -> new MessageNotFoundException("Rota não encontrada")
            )
        );
    }
}
