package Gestfarm.Repository;

import Gestfarm.Model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Integer> {
    @Transactional
    @Modifying
    @Query("UPDATE Sale s SET s.shipment = NULL WHERE s.shipment.id = :shipmentId")
    void setShipmentToNull(Integer shipmentId);
}
