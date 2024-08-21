package com.example.backend.controllers;

import com.example.backend.dtos.CreateDeliveryPointRequestDTO;
import com.example.backend.dtos.UpdateDeliveryPointRequestDTO;
import com.example.backend.entities.DeliveryPoint;
import com.example.backend.services.DeliveryPointService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deliverypoint")
@CrossOrigin(origins = "http://localhost:5173")
public class DeliveryPointController {

    @Autowired
    private DeliveryPointService deliveryPointService;

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryPoint> getById(@PathVariable Long id){
        return ResponseEntity.ok(deliveryPointService.getById(id));
    }

    @GetMapping("/road/{id}")
    public ResponseEntity<List<DeliveryPoint>> getAllByRoadId(@PathVariable Long id){
        return ResponseEntity.ok(deliveryPointService.getAllByRoadId(id));
    }

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody CreateDeliveryPointRequestDTO dto) {
        deliveryPointService.create(dto);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody UpdateDeliveryPointRequestDTO dto) {

        deliveryPointService.update(dto, id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {

        deliveryPointService.delete(id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
