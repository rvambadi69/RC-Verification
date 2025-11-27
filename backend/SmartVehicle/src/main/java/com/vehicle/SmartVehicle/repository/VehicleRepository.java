package com.vehicle.SmartVehicle.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.vehicle.SmartVehicle.model.Vehicle;

@Repository
public interface VehicleRepository extends MongoRepository<Vehicle, String> {
    Optional<Vehicle> findByRcNumber(String rcNumber);
    
    long countByChassisNumber(String chassisNumber);
    
    long countByEngineNumber(String engineNumber);
    
    @Query("{ 'registrationInfo.active': true, 'deletedAt': null }")
    List<Vehicle> findAllActive();
    
    @Query("{ 'owner.name': { $regex: ?0, $options: 'i' }, 'deletedAt': null }")
    List<Vehicle> searchByOwnerName(String ownerName);
    
    @Query("{ 'registrationState': ?0, 'deletedAt': null }")
    List<Vehicle> findByRegisteredState(String state);
    
    @Query("{ 'createdAt': { $gte: ?0, $lte: ?1 }, 'deletedAt': null }")
    List<Vehicle> findByCreatedDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("{ 'insurance.validTill': { $lt: new Date() }, 'deletedAt': null }")
    List<Vehicle> findWithExpiredInsurance();
    
    @Query("{ 'puc.validTill': { $lt: new Date() }, 'deletedAt': null }")
    List<Vehicle> findWithExpiredPuc();
    
    @Query("{ 'rcNumber': { $regex: ?0, $options: 'i' }, 'deletedAt': null }")
    Page<Vehicle> searchByRcNumber(String rcNumber, Pageable pageable);
}
