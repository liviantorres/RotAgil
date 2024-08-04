package com.example.backend.repositories;

import com.example.backend.entities.DeliveryPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryPointRepository extends JpaRepository<DeliveryPoint, Long> {
    Optional<Object> findByNameAndAddress(String name, String address);

    @Query(value = "SELECT * FROM delivery_point WHERE road_id = :roadId", nativeQuery = true)
    List<DeliveryPoint> findByRoad(Long roadId);
}
