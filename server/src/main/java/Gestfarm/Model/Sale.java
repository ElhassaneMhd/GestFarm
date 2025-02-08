package Gestfarm.Model;

import Gestfarm.Enum.SaleStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.Instant;
import java.util.List;

@Entity
@Data
public class Sale {

    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) int id;
    private String name;
    private int amount;
    private int price;

    @Enumerated(EnumType.STRING)
    private SaleStatus status; // Connects with the SaleStatus enum

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Sheep> sheep;

    @OneToOne(mappedBy = "sale", cascade = CascadeType.ALL) // CascadeType.ALL for convenience
    private Shipment shipment;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
    private Instant createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private Instant updatedAt;
}
