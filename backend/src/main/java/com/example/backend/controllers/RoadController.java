package com.example.backend.controllers;

import com.example.backend.dtos.*;
import com.example.backend.entities.Road;
import com.example.backend.exceptions.dtos.ErrorMessageDTO;
import com.example.backend.exceptions.dtos.MessageExceptionHandlerDTO;
import com.example.backend.services.PathService;
import com.example.backend.services.RoadService;

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

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/road")
@CrossOrigin(origins = "http://localhost:5173")
public class RoadController {
    @Autowired
    private RoadService roadService;
    @Autowired
    private PathService pathService;

    @PostMapping
    @Operation(summary = "Criar trajeto", description = "Essa função é responsável por criar um novo trajeto")
    @ApiResponses({
            @ApiResponse(responseCode = "201"),
            @ApiResponse(responseCode = "400", description = "Trajeto com mesmo nome já existe", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class))),
            @ApiResponse(responseCode = "404", description = "Empresa não encontrada", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class))),
            @ApiResponse(responseCode = "400", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity create(@Valid @RequestBody CreateRoadRequestDTO dto, HttpServletRequest request) {
        Object companyId = request.getAttribute("company_id");
        roadService.create(dto, UUID.fromString(companyId.toString()));
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar por trajeto", description = "Essa função é responsável por buscar um trajeto pelo id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Road.class))}),
            @ApiResponse(responseCode = "404", description = "Trajeto não encontrado", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class)))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity<Road> getById(@PathVariable Long id){
        return ResponseEntity.ok().body(this.roadService.getById(id));
    }

    @GetMapping
    @Operation(summary = "Buscar todos os trajetos de uma empresa", description = "Essa função é responsável por buscar todos os trajetos de uma empresa")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = @Content(array = @ArraySchema(schema = @Schema(implementation = Road.class))))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity<List<Road>> getAllByCompanyId(HttpServletRequest request){
        Object companyId = request.getAttribute("company_id");
        return ResponseEntity.ok().body(this.roadService.getAllByCompanyId(UUID.fromString(companyId.toString())));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar trajeto", description = "Essa função é responsável por editar as informações de um trajeto pelo id")
    @ApiResponses({
            @ApiResponse(responseCode = "204"),
            @ApiResponse(responseCode = "404", description = "Trajeto não encontrada", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class)))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity update(@PathVariable Long id, @RequestBody UpdateRoadRequestDTO dto) {
        roadService.update(dto, id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar trajeto", description = "Essa função é responsável por deletar um trajeto pelo id")
    @ApiResponses({
            @ApiResponse(responseCode = "204"),
            @ApiResponse(responseCode = "404", description = "Trajeto não encontrada", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class)))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity delete(@PathVariable Long id) {
        roadService.delete(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/path")
    @Operation(summary = "Criar percurso", description = "Essa função é responsável por criar um percurso")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = GeneratePathResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Não existe nenhuma rota para esse trajeto", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class))),
            @ApiResponse(responseCode = "404", description = "Ponto de entrega não encontrada", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class))),
            @ApiResponse(responseCode = "400", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity<GeneratePathResponseDTO> generatePath(@Valid @RequestBody GeneratePathRequestDTO dto){
        return ResponseEntity.ok().body(pathService.generateRoute(dto));
    }
}
