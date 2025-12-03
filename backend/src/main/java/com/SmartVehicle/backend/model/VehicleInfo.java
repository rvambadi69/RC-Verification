package com.SmartVehicle.backend.model;

public class VehicleInfo {
    private String type;
    private String make;
    private String model;
    private String variant;
    private String fuelType;
    private String color;
    private int manufactureYear;

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getVariant() { return variant; }
    public void setVariant(String variant) { this.variant = variant; }

    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public int getManufactureYear() { return manufactureYear; }
    public void setManufactureYear(int manufactureYear) { this.manufactureYear = manufactureYear; }
}
