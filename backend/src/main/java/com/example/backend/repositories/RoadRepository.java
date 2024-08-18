package com.example.backend.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.backend.entities.Road;

@Repository
public interface RoadRepository extends JpaRepository<Road, Long>  {
    Optional<Road> findByNameAndCompanyId(String name, UUID companyId);

    @Query(value = "SELECT * FROM road WHERE company_id = :companyId", nativeQuery = true)
    List<Road> findAllByCompanyId(UUID companyId);
}
