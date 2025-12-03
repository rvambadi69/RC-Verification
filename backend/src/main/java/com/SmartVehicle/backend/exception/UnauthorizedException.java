package com.SmartVehicle.backend.exception;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException() {
        super("Unauthorized: Admin key required");
    }
}
