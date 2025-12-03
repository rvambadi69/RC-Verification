package com.SmartVehicle.backend.model;

public class Puc {
    private String certificateNumber;
    private String validTill;
    private boolean stolen;
    private boolean suspicious;

    public String getCertificateNumber() { return certificateNumber; }
    public void setCertificateNumber(String certificateNumber) { this.certificateNumber = certificateNumber; }

    public String getValidTill() { return validTill; }
    public void setValidTill(String validTill) { this.validTill = validTill; }

    public boolean isStolen() { return stolen; }
    public void setStolen(boolean stolen) { this.stolen = stolen; }

    public boolean isSuspicious() { return suspicious; }
    public void setSuspicious(boolean suspicious) { this.suspicious = suspicious; }
}
