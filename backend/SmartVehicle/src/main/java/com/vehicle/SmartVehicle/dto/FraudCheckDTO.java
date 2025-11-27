package com.vehicle.SmartVehicle.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FraudCheckDTO {
    private String type;
    private String message;
    private String severity; // low, medium, high
}
