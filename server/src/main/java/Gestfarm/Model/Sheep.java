package Gestfarm.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Entity
@Table(name = "sheep")
public class Sheep {


    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) int id;

    private int price;
    private int weight;
    private String saleStatus;
    private int amount;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "shipping_id", nullable = false)
    private Shipping shipping;

    @ColumnDefault("current_timestamp()")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @ColumnDefault("current_timestamp()")
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;


    public Sheep() {

    }

    public Sheep(int price, int weight, String saleStatus, int amount, Category category, Shipping shipping) {
        this.price = price;
        this.weight = weight;
        this.saleStatus = saleStatus;
        this.amount = amount;
        this.category = category;
        this.shipping = shipping;

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

    public Shipping getString() {
        return shipping;
    }

    public void setString(Shipping shipping) {
        this.shipping = shipping;
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
                ", price=" + price +
                ", weight=" + weight +
                ", saleStatus='" + saleStatus + '\'' +
                ", amount=" + amount +
                ", category=" + category +
                ", shipping=" + shipping +
                ", createdAt=" + createdAt +
                '}';
    }
}
