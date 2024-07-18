package com.example.backend.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entities.Road;

@Repository
public interface RoadRepository extends JpaRepository<Road, UUID>  {
    Optional<Road> findByName(String name);
}
