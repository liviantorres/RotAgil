package com.example.backend.controllers;

import com.example.backend.dtos.CreateRouteRequestDTO;
import com.example.backend.dtos.RouteResponseDTO;
import com.example.backend.dtos.UpdateRouteRequestDTO;
import com.example.backend.services.RouteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/route")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @GetMapping("/{id}")
    public ResponseEntity<RouteResponseDTO> getById(@PathVariable Long id){
        return ResponseEntity.ok(routeService.getById(id));
    }

    @GetMapping("/road/{id}")
    public ResponseEntity<List<RouteResponseDTO>> getAllByRoadId(@PathVariable Long id){
        return ResponseEntity.ok(routeService.getAllByRoadId(id));
    }

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody CreateRouteRequestDTO dto) {
        routeService.create(dto);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody UpdateRouteRequestDTO dto) {

        routeService.update(dto, id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {

        routeService.delete(id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
