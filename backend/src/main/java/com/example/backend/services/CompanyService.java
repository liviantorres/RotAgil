package com.example.backend.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.backend.dtos.AuthCompanyRequestDTO;
import com.example.backend.dtos.AuthCompanyResponseDTO;
import com.example.backend.entities.Company;
import com.example.backend.repositories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.time.Duration;
import java.time.Instant;
import java.util.Optional;

@Service
public class CompanyService {
    @Value("${security.token.secret}")
    private String secretKey;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthCompanyResponseDTO generateToken(AuthCompanyRequestDTO authCompanyRequestDTO) throws AuthenticationException {
        Optional<Company> company = Optional.ofNullable(
                this.companyRepository.findByName(authCompanyRequestDTO.name())
                        .orElseThrow(
                                () -> new UsernameNotFoundException("name/password incorrect")
                        )
        );

        boolean passwordMatches = this.passwordEncoder.matches(authCompanyRequestDTO.password(), company.get().getPassword());

        if (!passwordMatches)
            throw new AuthenticationException("name/password incorrect");

        Algorithm algorithm = Algorithm.HMAC256(this.secretKey);

        Instant expiresIn = Instant.now().plus(Duration.ofHours(2));

        String token = JWT.create().withIssuer("RotAgil")
                .withExpiresAt(expiresIn)
                .withSubject(company.get().getId().toString())
                .sign(algorithm);

        return new AuthCompanyResponseDTO(token, expiresIn.toEpochMilli(), company.get().getId().toString());
    }
}
