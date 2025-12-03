package com.SmartVehicle.backend.model;

public class RegistrationInfo {
    private String registrationDate;
    private String validTill;
    private boolean active;

    public String getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(String registrationDate) { this.registrationDate = registrationDate; }

    public String getValidTill() { return validTill; }
    public void setValidTill(String validTill) { this.validTill = validTill; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
