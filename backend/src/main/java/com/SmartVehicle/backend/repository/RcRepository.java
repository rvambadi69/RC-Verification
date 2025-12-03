package com.SmartVehicle.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.SmartVehicle.backend.model.Rc;

public interface RcRepository extends MongoRepository<Rc, String> {
    Rc findByRcNumber(String rcNumber);
}
