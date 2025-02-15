package Gestfarm.Model;

import Gestfarm.Enum.SaleStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "sales")
@EntityListeners(AuditingEntityListener.class)
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Sale {

    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) int id;
    private String name;
    private int amount;
    private int price;

    @Enumerated(EnumType.STRING)
    private SaleStatus status; // Connects with the SaleStatus enum

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
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
