package com.example.backend.repositories;

import com.example.backend.entities.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    @Query(value = "SELECT * FROM route WHERE initial_delivery_point_id = :initialDeliveryPointId AND " +
            "destination_delivery_point_id = :destinationDeliveryPointId", nativeQuery = true)
    Optional<Route> findByInitialDeliveryPointAndDestinationDeliveryPoint(Long initialDeliveryPointId, Long destinationDeliveryPointId);

    @Query(value = "SELECT * FROM route WHERE road_id = :roadId", nativeQuery = true)
    List<Route> findByRoad(Long roadId);

    @Query(value = "SELECT * FROM route WHERE initial_delivery_point_id = :deliveryPointId OR " +
            "destination_delivery_point_id = :deliveryPointId", nativeQuery = true)
    List<Route> findByInitialDeliveryPointOrDestinationDeliveryPoint(Long deliveryPointId);
}
