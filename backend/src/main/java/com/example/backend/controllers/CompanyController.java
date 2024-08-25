package com.example.backend.controllers;

import com.example.backend.dtos.*;
import com.example.backend.exceptions.dtos.ErrorMessageDTO;
import com.example.backend.exceptions.dtos.MessageExceptionHandlerDTO;
import com.example.backend.services.CompanyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
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
    @Operation(summary = "Autenticação da empresa", description = "Essa função é responsável por criar um token de autenticação para uma empresa")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = AuthCompanyResponseDTO.class))}),
            @ApiResponse(responseCode = "401", description = "Username/password incorreto", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class))),
            @ApiResponse(responseCode = "400", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))))
    })
    public ResponseEntity<AuthCompanyResponseDTO> authentication(@Valid @RequestBody AuthCompanyRequestDTO dto) {
        AuthCompanyResponseDTO response = companyService.generateToken(dto);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    @Operation(summary = "Cadastro da empresa", description = "Essa função é responsável por cadastrar uma empresa")
    @ApiResponses({
            @ApiResponse(responseCode = "201"),
            @ApiResponse(responseCode = "400", description = "E-mail já existe", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class))),
            @ApiResponse(responseCode = "400", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))))
    })
    public ResponseEntity create(@Valid @RequestBody CreateCompanyRequestDTO dto) {
        companyService.create(dto);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Buscar empresa", description = "Essa função é responsável por buscar uma empresa")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = CompanyResponseDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Empresa não encontrada", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class)))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity<CompanyResponseDTO> getById(HttpServletRequest request) {
        Object id = request.getAttribute("company_id");

        CompanyResponseDTO response = this.companyService.getById(UUID.fromString(id.toString()));

        return ResponseEntity.ok().body(response);
    }

    @PutMapping
    @Operation(summary = "Editar cadastro da empresa", description = "Essa função é responsável por editar as informações de uma empresa")
    @ApiResponses({
            @ApiResponse(responseCode = "204"),
            @ApiResponse(responseCode = "404", description = "Empresa não encontrada", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class)))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity update(@RequestBody UpdateCompanyRequestDTO dto, HttpServletRequest request) {
        Object id = request.getAttribute("company_id");

        companyService.update(dto, UUID.fromString(id.toString()));

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    @Operation(summary = "Deletar uma empresa", description = "Essa função é responsável por deletar uma empresa")
    @ApiResponses({
            @ApiResponse(responseCode = "204"),
            @ApiResponse(responseCode = "404", description = "Empresa não encontrada", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class)))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity delete(HttpServletRequest request) {
        Object id = request.getAttribute("company_id");

        companyService.delete(UUID.fromString(id.toString()));

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
