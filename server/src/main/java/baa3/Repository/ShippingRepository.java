package baa3.Repository;

import baa3.Model.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
public interface ShippingRepository extends JpaRepository<Shipping, Integer> {
}
