package com.SmartVehicle.backend.service;

import com.SmartVehicle.backend.model.Rc;
import java.util.List;

public interface RcService {

    List<Rc> getAll();
    Rc getById(String id);
    Rc searchByRcNumber(String rcNumber);
    Rc add(Rc rc);
    Rc update(String id, Rc rc);
    void delete(String id);
    List<Rc> getFiltered(String registrationState, Boolean stolen, Boolean suspicious, String make, String ownerName);
}
