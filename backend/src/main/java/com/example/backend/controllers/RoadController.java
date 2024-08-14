package com.example.backend.controllers;

import com.example.backend.dtos.*;
import com.example.backend.entities.Road;
import com.example.backend.services.CompanyService;
import com.example.backend.services.RoadService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/road")
public class RoadController {
    @Autowired
    private RoadService roadService;

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody CreateRoadRequestDTO dto) {
        roadService.create(dto);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/id")
    public ResponseEntity<RoadResponseDTO> getById(HttpServletRequest request){
        Object id = request.getAttribute("road_id");
        
        RoadResponseDTO response = this.roadService.getById((Long) id);

        return ResponseEntity.ok().body(response);

    }

    @PutMapping
    public ResponseEntity update(@RequestBody UpdateRoadRequestDTO dto, HttpServletRequest request) {
        Object id = request.getAttribute("road_id");

        roadService.update(dto, (Long) id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity delete(HttpServletRequest request) {
        Object id = request.getAttribute("road_id");

        roadService.delete((Long) id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
