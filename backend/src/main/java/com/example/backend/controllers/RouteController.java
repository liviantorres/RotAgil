package com.example.backend.controllers;

import com.example.backend.dtos.CreateRouteRequestDTO;
import com.example.backend.dtos.RouteResponseDTO;
import com.example.backend.dtos.UpdateRouteRequestDTO;
import com.example.backend.exceptions.dtos.ErrorMessageDTO;
import com.example.backend.exceptions.dtos.MessageExceptionHandlerDTO;
import com.example.backend.services.RouteService;
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
@RequestMapping("/route")
@CrossOrigin(origins = "http://localhost:5173")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @GetMapping("/{id}")
    @Operation(summary = "Buscar rota", description = "Essa função é responsável por buscar uma rota pelo id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = RouteResponseDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Rota não encontrada", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class))})
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity<RouteResponseDTO> getById(@PathVariable Long id){
        return ResponseEntity.ok(routeService.getById(id));
    }

    @GetMapping("/road/{id}")
    @Operation(summary = "Buscar todas as rotas de um trajeto", description = "Essa função é responsável por buscar todas as rotas pelo id do trajeto")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(array = @ArraySchema(schema = @Schema(implementation = RouteResponseDTO.class)))}),
            @ApiResponse(responseCode = "404", description = "Ponto de entrega não encontrada", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class))})
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity<List<RouteResponseDTO>> getAllByRoadId(@PathVariable Long id){
        return ResponseEntity.ok(routeService.getAllByRoadId(id));
    }

    @PostMapping
    @Operation(summary = "Criar rota", description = "Essa função é responsável por criar uma nova rota")
    @ApiResponses({
            @ApiResponse(responseCode = "201"),
            @ApiResponse(responseCode = "400", description = "Ponto de entrega inicial não pode ser igual ao Ponto de entrega final", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class))),
            @ApiResponse(responseCode = "404", description = "Trajeto não encontrado", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class))),
            @ApiResponse(responseCode = "400", content = { @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))) })
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity create(@Valid @RequestBody CreateRouteRequestDTO dto) {
        routeService.create(dto);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar rota", description = "Essa função é responsável por editar uma rota pelo id")
    @ApiResponses({
            @ApiResponse(responseCode = "204"),
            @ApiResponse(responseCode = "400", description = "Ponto de entrega inicial não pode ser igual ao Ponto de entrega final", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class))),
            @ApiResponse(responseCode = "404", description = "Rota não encontrada", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class))),
            @ApiResponse(responseCode = "400", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity update(@PathVariable Long id, @Valid @RequestBody UpdateRouteRequestDTO dto) {

        routeService.update(dto, id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar rota", description = "Essa função é responsável por deletar uma rota pelo id")
    @ApiResponses({
            @ApiResponse(responseCode = "204"),
            @ApiResponse(responseCode = "404", description = "Rota não encontrada", content =
            @Content(mediaType = "application/json", schema = @Schema(implementation = MessageExceptionHandlerDTO.class)))
    })
    @SecurityRequirement(name = "jwt_auth")
    public ResponseEntity delete(@PathVariable Long id) {

        routeService.delete(id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
