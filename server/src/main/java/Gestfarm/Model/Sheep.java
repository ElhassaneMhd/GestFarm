package Gestfarm.Model;

import Gestfarm.Enum.SheepAge;
import Gestfarm.Enum.SheepStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity
@Table(name = "sheep")
@EntityListeners(AuditingEntityListener.class)
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Sheep {

    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Integer id;

    @Column(name = "number", nullable = false , unique = true)
    private Integer number;
    private Integer price;
    private Integer weight;
    private SheepAge age;
    private SheepStatus status;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "category_id", nullable = true)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JsonIgnore
    private Category category;

    @ManyToOne
    @JoinColumn(name = "sale_id", nullable = true)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JsonIgnore
    private Sale sale;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
    private Instant createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private Instant updatedAt;
}
