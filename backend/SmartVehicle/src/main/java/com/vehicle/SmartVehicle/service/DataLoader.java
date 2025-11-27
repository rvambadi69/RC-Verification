package com.vehicle.SmartVehicle.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.vehicle.SmartVehicle.model.FraudFlag;
import com.vehicle.SmartVehicle.model.User;
import com.vehicle.SmartVehicle.model.Vehicle;
import com.vehicle.SmartVehicle.model.Verification;
import com.vehicle.SmartVehicle.repository.FraudFlagRepository;
import com.vehicle.SmartVehicle.repository.UserRepository;
import com.vehicle.SmartVehicle.repository.VehicleRepository;
import com.vehicle.SmartVehicle.repository.VerificationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Seed sample data to MongoDB for testing
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {
    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final FraudFlagRepository fraudFlagRepository;
    private final VerificationRepository verificationRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only load data if database is empty
        if (userRepository.count() == 0) {
            loadSampleData();
        }
    }

    private void loadSampleData() {
        log.info("Loading sample data into MongoDB...");

        // Create sample users
        User buyer = new User("buyer@example.com", "password123", "John Buyer");
        buyer.setRole("buyer");
        buyer.setCreatedAt(LocalDateTime.now());

        User police = new User("police@example.com", "password123", "Officer Smith");
        police.setRole("police");
        police.setCreatedAt(LocalDateTime.now());

        User rtoAdmin = new User("admin@example.com", "password123", "RTO Administrator");
        rtoAdmin.setRole("rto_admin");
        rtoAdmin.setCreatedAt(LocalDateTime.now());

        userRepository.save(buyer);
        userRepository.save(police);
        userRepository.save(rtoAdmin);
        log.info("✓ Sample users created");

        // Create sample vehicles with nested structure
        Vehicle vehicle1 = Vehicle.builder()
                .rcNumber("KA01AB1234")
                .qrCodeId("QR_KA01AB1234")
                .owner(Vehicle.Owner.builder()
                        .name("Rohit Kumar")
                        .phone("9876543210")
                        .email("rohit@example.com")
                        .address("Bengaluru, Karnataka")
                        .aadhaarLast4("1234")
                        .build())
                .vehicleInfo(Vehicle.VehicleInfo.builder()
                        .type("Car")
                        .make("Maruti")
                        .model("Swift")
                        .variant("VXI")
                        .fuelType("Petrol")
                        .color("Red")
                        .manufactureYear(2021)
                        .build())
                .chassisNumber("CHS123456789")
                .engineNumber("ENG987654321")
                .registrationState("KA")
                .registrationInfo(Vehicle.RegistrationInfo.builder()
                        .registrationDate(LocalDate.of(2021, 1, 5))
                        .validTill(LocalDate.of(2036, 1, 4))
                        .active(true)
                        .build())
                .insurance(Vehicle.Insurance.builder()
                        .provider("ABC Insurance")
                        .policyNumber("POL123456")
                        .validTill(LocalDate.of(2025, 12, 31))
                        .build())
                .puc(Vehicle.PUC.builder()
                        .certificateNumber("PUC987654")
                        .validTill(LocalDate.of(2025, 12, 31))
                        .build())
                .stolen(false)
                .suspicious(false)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Vehicle vehicle2 = Vehicle.builder()
                .rcNumber("DL02CD5678")
                .qrCodeId("QR_DL02CD5678")
                .owner(Vehicle.Owner.builder()
                        .name("Priya Singh")
                        .phone("9123456789")
                        .email("priya@example.com")
                        .address("Delhi, India")
                        .aadhaarLast4("5678")
                        .build())
                .vehicleInfo(Vehicle.VehicleInfo.builder()
                        .type("Car")
                        .make("Hyundai")
                        .model("Creta")
                        .variant("ZXI")
                        .fuelType("Diesel")
                        .color("Blue")
                        .manufactureYear(2023)
                        .build())
                .chassisNumber("CHS987654321")
                .engineNumber("ENG123456789")
                .registrationState("DL")
                .registrationInfo(Vehicle.RegistrationInfo.builder()
                        .registrationDate(LocalDate.of(2023, 3, 20))
                        .validTill(LocalDate.of(2038, 3, 20))
                        .active(true)
                        .build())
                .insurance(Vehicle.Insurance.builder()
                        .provider("XYZ Insurance")
                        .policyNumber("POL987654")
                        .validTill(LocalDate.of(2026, 3, 20))
                        .build())
                .puc(Vehicle.PUC.builder()
                        .certificateNumber("PUC123456")
                        .validTill(LocalDate.of(2025, 9, 20))
                        .build())
                .stolen(false)
                .suspicious(false)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        vehicleRepository.save(vehicle1);
        vehicleRepository.save(vehicle2);
        log.info("✓ Sample vehicles created");

        // Create sample fraud flags
        FraudFlag fraudFlag = new FraudFlag(
                vehicle1.getId(),
                "expired_insurance",
                "Insurance policy expired on 2024-01-01"
        );
        fraudFlag.setFraudScore(0.6);
        fraudFlag.setFlaggedBy(police.getId());
        fraudFlag.setCreatedAt(LocalDateTime.now());

        fraudFlagRepository.save(fraudFlag);
        log.info("✓ Sample fraud flags created");

        // Create sample verifications
        Verification verification1 = new Verification(
                vehicle1.getId(),
                buyer.getId(),
                "qr_scan",
                "verified"
        );
        verification1.setFraudScore(0.3);
        verification1.setVerificationIP("192.168.1.100");
        verification1.setVerificationLocation("Mumbai");
        verification1.setCreatedAt(LocalDateTime.now());

        Verification verification2 = new Verification(
                vehicle2.getId(),
                police.getId(),
                "manual_search",
                "suspicious"
        );
        verification2.setFraudScore(0.7);
        verification2.setVerificationIP("192.168.1.101");
        verification2.setVerificationLocation("Delhi");
        verification2.setCreatedAt(LocalDateTime.now());

        verificationRepository.save(verification1);
        verificationRepository.save(verification2);
        log.info("✓ Sample verifications created");

        log.info("✅ Sample data loaded successfully!");
    }
}
