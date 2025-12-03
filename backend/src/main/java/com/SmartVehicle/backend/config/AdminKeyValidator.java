package com.SmartVehicle.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class AdminKeyValidator {

    @Value("${admin.secret.key}")
    private String adminKey;

    public boolean isAdminAuthorized(HttpServletRequest request) {
        String headerKey = request.getHeader("X-ADMIN-KEY");
        return headerKey != null && headerKey.equals(adminKey);
    }
}
