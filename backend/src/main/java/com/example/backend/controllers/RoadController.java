package com.example.backend.controllers;

import com.example.backend.dtos.*;
import com.example.backend.entities.Road;
import com.example.backend.services.RoadService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/road")
public class RoadController {
    @Autowired
    private RoadService roadService;

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody CreateRoadRequestDTO dto, HttpServletRequest request) {
        Object companyId = request.getAttribute("company_id");
        roadService.create(dto, UUID.fromString(companyId.toString()));
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Road> getById(@PathVariable Long id){
        return ResponseEntity.ok().body(this.roadService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<Road>> getAllByCompanyId(HttpServletRequest request){
        Object companyId = request.getAttribute("company_id");
        return ResponseEntity.ok().body(this.roadService.getAllByCompanyId(UUID.fromString(companyId.toString())));
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody UpdateRoadRequestDTO dto) {
        roadService.update(dto, id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        roadService.delete(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
