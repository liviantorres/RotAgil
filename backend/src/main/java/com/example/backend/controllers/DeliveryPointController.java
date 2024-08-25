package com.example.backend.controllers;

import com.example.backend.dtos.CreateDeliveryPointRequestDTO;
import com.example.backend.dtos.UpdateDeliveryPointRequestDTO;
import com.example.backend.entities.DeliveryPoint;
import com.example.backend.exceptions.dtos.ErrorMessageDTO;
import com.example.backend.exceptions.dtos.MessageExceptionHandlerDTO;
import com.example.backend.services.DeliveryPointService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
    @Operation(summary = "Buscar um ponto de entrega", description = "Essa função é responsável por buscar um ponto de entrega pelo id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = DeliveryPoint.class))}),
            @ApiResponse(responseCode = "404", description = "Ponto de entrega não encontrada", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class)))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity<DeliveryPoint> getById(@PathVariable Long id){
        return ResponseEntity.ok(deliveryPointService.getById(id));
    }

    @GetMapping("/road/{id}")
    @Operation(summary = "Buscar todos os pontos de entrega de um trajeto", description = "Essa função é responsável por buscar todos os pontos de entrega pelo id do trajeto")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = @Content(array = @ArraySchema(schema = @Schema(implementation = DeliveryPoint.class))))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity<List<DeliveryPoint>> getAllByRoadId(@PathVariable Long id){
        return ResponseEntity.ok(deliveryPointService.getAllByRoadId(id));
    }

    @PostMapping
    @Operation(summary = "Criar ponto de entrega", description = "Essa função é responsável por criar um ponto de entrega")
    @ApiResponses({
            @ApiResponse(responseCode = "201"),
            @ApiResponse(responseCode = "400", description = "Ponto de entrega já cadastrado", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class))),
            @ApiResponse(responseCode = "400", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity create(@Valid @RequestBody CreateDeliveryPointRequestDTO dto) {
        deliveryPointService.create(dto);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar um ponto de entrega", description = "Essa função é responsável por editar um ponto de entrega pelo id")
    @ApiResponses({
            @ApiResponse(responseCode = "204"),
            @ApiResponse(responseCode = "404", description = "Ponto de entrega não encontrada", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class)))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity update(@PathVariable Long id, @RequestBody UpdateDeliveryPointRequestDTO dto) {

        deliveryPointService.update(dto, id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um ponto de entrega", description = "Essa função é responsável por deletar um ponto de entrega pelo id")
    @ApiResponses({
            @ApiResponse(responseCode = "204"),
            @ApiResponse(responseCode = "404", description = "Ponto de entrega não encontrada", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class))),
            @ApiResponse(responseCode = "400", description = "Ponto de entrega está vinculado a uma rota", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class)))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity delete(@PathVariable Long id) {

        deliveryPointService.delete(id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
