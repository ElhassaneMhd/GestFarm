package Gestfarm.Model;

import Gestfarm.Enum.ShipmentStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Date;
import java.time.Instant;


@Entity
@Table(name = "Shipments")
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String address;
    private String phone;
    private String email;

    @Enumerated(EnumType.STRING)
    private ShipmentStatus status;


    @Column(name = "shipping_date", nullable = false)
    private Date shippingDate;

    @OneToOne
    @JoinColumn(name = "sale_id", unique = true) // Foreign key and uniqueness constraint
    private Sale sale;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
    private Instant createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private Instant updatedAt;



}
