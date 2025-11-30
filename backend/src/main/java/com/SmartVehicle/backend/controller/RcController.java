package com.SmartVehicle.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SmartVehicle.backend.config.AdminKeyValidator;
import com.SmartVehicle.backend.exception.UnauthorizedException;
import com.SmartVehicle.backend.model.Rc;
import com.SmartVehicle.backend.service.RcService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/rc")
@CrossOrigin("*")
public class RcController {

    private final RcService rcService;
    private final AdminKeyValidator adminKeyValidator;

    @Autowired
    public RcController(RcService rcService, AdminKeyValidator adminKeyValidator) {
        this.rcService = rcService;
        this.adminKeyValidator = adminKeyValidator;
    }

    @GetMapping
    public List<Rc> getAll() {
        return rcService.getAll();
    }

    @GetMapping("/{id}")
    public Rc getById(@PathVariable String id) {
        return rcService.getById(id);
    }

    @GetMapping("/search")
    public Rc searchByRcNumber(@RequestParam String rcNumber) {
        return rcService.searchByRcNumber(rcNumber);
    }

    @GetMapping("/stats")
    public java.util.Map<String, Object> getStats() {
        List<Rc> all = rcService.getAll();
        long total = all.size();
        long activeCount = all.stream().filter(rc -> rc.getRegistrationInfo() != null && rc.getRegistrationInfo().isActive()).count();
        long stolenCount = all.stream().filter(rc -> Boolean.TRUE.equals(rc.getStolen())).count();
        long suspiciousCount = all.stream().filter(rc -> Boolean.TRUE.equals(rc.getSuspicious())).count();

        java.util.Map<String, Integer> byState = new java.util.HashMap<>();
        for (Rc rc : all) {
            String st = rc.getRegistrationState();
            if (st != null && !st.isEmpty()) {
                byState.put(st, byState.getOrDefault(st, 0) + 1);
            }
        }

        // Monthly verifications (by Rc.createdAt month)
        java.time.format.DateTimeFormatter fmt = java.time.format.DateTimeFormatter.ofPattern("yyyy-MM");
        java.util.Map<String, Integer> monthly = new java.util.TreeMap<>();
        for (Rc rc : all) {
            if (rc.getCreatedAt() != null) {
                String key = java.time.ZonedDateTime.ofInstant(rc.getCreatedAt(), java.time.ZoneId.systemDefault()).format(fmt);
                monthly.put(key, monthly.getOrDefault(key, 0) + 1);
            }
        }

        java.util.Map<String, Object> result = new java.util.HashMap<>();
        result.put("total", total);
        result.put("activeCount", activeCount);
        result.put("stolenCount", stolenCount);
        result.put("suspiciousCount", suspiciousCount);
        result.put("byState", byState);
        result.put("monthlyVerifications", monthly.entrySet().stream()
                .map(e -> java.util.Map.of("month", e.getKey(), "count", e.getValue()))
                .toList());
        return result;
    }

    @PostMapping
    public Rc create(@RequestBody Rc rc, HttpServletRequest request) {
        if (!adminKeyValidator.isAdminAuthorized(request)) throw new UnauthorizedException();
        return rcService.add(rc);
    }

    @PutMapping("/{id}")
    public Rc update(@PathVariable String id, @RequestBody Rc rc, HttpServletRequest request) {
        if (!adminKeyValidator.isAdminAuthorized(request)) throw new UnauthorizedException();
        return rcService.update(id, rc);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id, HttpServletRequest request) {
        if (!adminKeyValidator.isAdminAuthorized(request)) throw new UnauthorizedException();
        rcService.delete(id);
    }
}
