package com.SmartVehicle.backend.model;

public class Insurance {
    private String provider;
    private String policyNumber;
    private String validTill;

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getPolicyNumber() { return policyNumber; }
    public void setPolicyNumber(String policyNumber) { this.policyNumber = policyNumber; }

    public String getValidTill() { return validTill; }
    public void setValidTill(String validTill) { this.validTill = validTill; }
}
