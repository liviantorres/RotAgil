package com.example.backend.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.backend.dtos.*;
import com.example.backend.entities.Company;
import com.example.backend.entities.DeliveryPoint;
import com.example.backend.entities.Road;
import com.example.backend.entities.Route;
import com.example.backend.exceptions.types.MessageBadRequestException;
import com.example.backend.exceptions.types.MessageNotFoundException;
import com.example.backend.exceptions.types.MessageUnauthorizedException;
import com.example.backend.repositories.CompanyRepository;
import com.example.backend.repositories.DeliveryPointRepository;
import com.example.backend.repositories.RoadRepository;
import com.example.backend.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CompanyService {
    @Value("${security.token.secret}")
    private String secretKey;

    @Autowired
    private RoadRepository roadRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private RouteRepository routeRepository;
    @Autowired
    private DeliveryPointRepository deliveryPointRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public AuthCompanyResponseDTO generateToken(AuthCompanyRequestDTO authCompanyRequestDTO) {
        Optional<Company> company = Optional.ofNullable(
                this.companyRepository.findByEmail(authCompanyRequestDTO.email())
                        .orElseThrow(
                                () -> new MessageUnauthorizedException("username/password incorreto")
                        )
        );

        boolean passwordMatches = this.passwordEncoder.matches(authCompanyRequestDTO.password(), company.get().getPassword());

        if (!passwordMatches)
            throw new MessageUnauthorizedException("username/password incorreto");

        Algorithm algorithm = Algorithm.HMAC256(this.secretKey);

        Instant expiresIn = Instant.now().plus(Duration.ofHours(2));

        String token = JWT.create().withIssuer("RotAgil")
                .withExpiresAt(expiresIn)
                .withSubject(company.get().getId().toString())
                .sign(algorithm);

        return new AuthCompanyResponseDTO(token, expiresIn.toEpochMilli(), company.get().getId().toString());
    }

    @Transactional
    public void create(CreateCompanyRequestDTO dto) {
        this.companyRepository.findByEmail(dto.email()).ifPresent((user) -> { throw new MessageBadRequestException("E-mail já existe"); });

        Company company = new Company();
        company.setName(dto.name());
        company.setEmail(dto.email());
        company.setPassword(this.passwordEncoder.encode(dto.password()));

        this.companyRepository.save(company);
    }

    @Transactional(readOnly = true)
    public CompanyResponseDTO getById(UUID id) {
        Optional<Company> company = Optional.ofNullable(
                this.companyRepository.findById(id)
                        .orElseThrow(
                            () -> new MessageNotFoundException("Empresa não encontrada")
        ));

        return new CompanyResponseDTO(company.get().getId(), company.get().getName(), company.get().getEmail());
    }

    @Transactional
    public void update(UpdateCompanyRequestDTO dto, UUID id) {
        Optional<Company> company = Optional.ofNullable(
                this.companyRepository.findById(id)
                        .orElseThrow(
                                () -> new MessageNotFoundException("Empresa não encontrada")
                        ));

        if (dto.name() != null && !dto.name().isBlank())
            company.get().setName(dto.name());
        if (dto.email() != null && !dto.email().isBlank())
            company.get().setEmail(dto.email());
        if (dto.password() != null && !dto.password().isBlank())
            company.get().setPassword(this.passwordEncoder.encode(dto.password()));

        this.companyRepository.save(company.get());
    }

    @Transactional
    public void delete(UUID id) {
        Optional<Company> company = Optional.ofNullable(
                this.companyRepository.findById(id)
                        .orElseThrow(
                                () -> new MessageNotFoundException("Empresa não encontrada")
                        ));

        List<Road> roads = this.roadRepository.findAllByCompanyId(id);
        roads.forEach(road -> {
            List<Route> routes = this.routeRepository.findByRoad(road.getId());
            this.routeRepository.deleteAll(routes);

            List<DeliveryPoint> deliveryPoints = this.deliveryPointRepository.findByRoad(road.getId());
            this.deliveryPointRepository.deleteAll(deliveryPoints);
        });
        this.roadRepository.deleteAll(roads);

        this.companyRepository.delete(company.get());
    }
}
