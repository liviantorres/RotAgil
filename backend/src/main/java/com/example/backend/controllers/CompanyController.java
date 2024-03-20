package com.example.backend.controllers;

import com.example.backend.dtos.AuthCompanyRequestDTO;
import com.example.backend.dtos.AuthCompanyResponseDTO;
import com.example.backend.services.CompanyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping("/auth")
    public ResponseEntity<Object> authentication(@Valid @RequestBody AuthCompanyRequestDTO dto) {
        try {
            AuthCompanyResponseDTO response = companyService.generateToken(dto);
            return ResponseEntity.ok().body(response);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }
}
