package com.SmartVehicle.backend.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ownership_history")
public class OwnershipHistory {

    @Id
    private String id;

    @Indexed
    private String rcId; // reference to Rc document id
    @Indexed
    private String rcNumber; // denormalized for convenience

    private String previousOwnerName;
    private String newOwnerName;
    private Instant transferredAt;
    private Boolean stolenAtTransfer;
    private Boolean suspiciousAtTransfer;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRcId() { return rcId; }
    public void setRcId(String rcId) { this.rcId = rcId; }

    public String getRcNumber() { return rcNumber; }
    public void setRcNumber(String rcNumber) { this.rcNumber = rcNumber; }

    public String getPreviousOwnerName() { return previousOwnerName; }
    public void setPreviousOwnerName(String previousOwnerName) { this.previousOwnerName = previousOwnerName; }

    public String getNewOwnerName() { return newOwnerName; }
    public void setNewOwnerName(String newOwnerName) { this.newOwnerName = newOwnerName; }

    public Instant getTransferredAt() { return transferredAt; }
    public void setTransferredAt(Instant transferredAt) { this.transferredAt = transferredAt; }

    public Boolean getStolenAtTransfer() { return stolenAtTransfer; }
    public void setStolenAtTransfer(Boolean stolenAtTransfer) { this.stolenAtTransfer = stolenAtTransfer; }

    public Boolean getSuspiciousAtTransfer() { return suspiciousAtTransfer; }
    public void setSuspiciousAtTransfer(Boolean suspiciousAtTransfer) { this.suspiciousAtTransfer = suspiciousAtTransfer; }
}
