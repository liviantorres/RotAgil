package com.example.backend.controllers;

import com.example.backend.dtos.*;
import com.example.backend.services.CompanyService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/company")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping("/auth")
    public ResponseEntity<AuthCompanyResponseDTO> authentication(@Valid @RequestBody AuthCompanyRequestDTO dto) {
        AuthCompanyResponseDTO response = companyService.generateToken(dto);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody CreateCompanyRequestDTO dto) {
        companyService.create(dto);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<CompanyResponseDTO> getById(HttpServletRequest request) {
        Object id = request.getAttribute("company_id");

        CompanyResponseDTO response = this.companyService.getById(UUID.fromString(id.toString()));

        return ResponseEntity.ok().body(response);
    }

    @PutMapping
    public ResponseEntity update(@RequestBody UpdateCompanyRequestDTO dto, HttpServletRequest request) {
        Object id = request.getAttribute("company_id");

        companyService.update(dto, UUID.fromString(id.toString()));

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity delete(HttpServletRequest request) {
        Object id = request.getAttribute("company_id");

        companyService.delete(UUID.fromString(id.toString()));

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
