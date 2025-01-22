package baa3.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "sheep")
public class Sheep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int price;
    private int weight;
    private String saleStatus;
    private int amount;
    private String category;
    private  String shipping;

    public Sheep() {}

    public Sheep(int price, int weight, String saleStatus, int amount, String category, String shipping) {
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getShipping() {
        return shipping;
    }

    public void setShipping(String shipping) {
        this.shipping = shipping;
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
                '}';
    }
}
