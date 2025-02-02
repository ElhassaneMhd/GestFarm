package Gestfarm.Dto;

import java.sql.Date;
import java.time.Instant;
import java.util.List;

public class ShipmentRequest {
    private String name;
    private String address;
    private String phone;
    private String email;
    private String status;
    private Date shippingDate;
    private List<SheepRequest> sheep;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getShippingDate() {
        return shippingDate;
    }

    public void setShippingDate(Date shippingDate) {
        this.shippingDate = shippingDate;
    }

    public List<SheepRequest> getSheep() {
        return sheep;
    }

    public void setSheep(List<SheepRequest> sheep) {
        this.sheep = sheep;
    }
}