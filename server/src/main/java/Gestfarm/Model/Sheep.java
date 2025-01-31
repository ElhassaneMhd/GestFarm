package Gestfarm.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity
@Table(name = "sheep")
@EntityListeners(AuditingEntityListener.class)
public class Sheep {

    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) int id;

    @Column(name = "number", nullable = false , unique = true)
    private int number;

    private int price;
    private int weight;
    private String saleStatus;
    private int amount;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "shipment_id", nullable = true)
    private Shipment shipment;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
    private Instant createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private Instant updatedAt;

    public Sheep() {}

    public Sheep(int price, int weight, String saleStatus, int amount, Category category, Shipment shipment) {
        this.price = price;
        this.weight = weight;
        this.saleStatus = saleStatus;
        this.amount = amount;
        this.category = category;
        this.shipment = shipment;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(String saleStatus) {
        this.saleStatus = saleStatus;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Shipment getShipment() {
        return shipment;
    }

    public void setShipment(Shipment shipment) {
        this.shipment = shipment;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Sheep{" +
                "id=" + id +
                "number=" +number+
                ", price=" + price +
                ", weight=" + weight +
                ", saleStatus='" + saleStatus + '\'' +
                ", amount=" + amount +
                ", category=" + category +
                ", shipment=" + shipment +
                ", createdAt=" + createdAt +
                '}';
    }
}
