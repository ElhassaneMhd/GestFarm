package baa3.Repository;

import baa3.Model.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("*")
public interface ShippingRepository extends JpaRepository<Shipping, Integer> {
}
