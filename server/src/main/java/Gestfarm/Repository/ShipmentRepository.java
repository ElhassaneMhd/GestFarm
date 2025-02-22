package Gestfarm.Repository;

import Gestfarm.Model.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Integer> {
}
