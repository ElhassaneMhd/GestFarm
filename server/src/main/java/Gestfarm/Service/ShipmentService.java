package Gestfarm.Service;

import Gestfarm.Dto.Request.ShipmentRequest;
import Gestfarm.Model.Sheep;
import Gestfarm.Model.Shipment;
import Gestfarm.Repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ShipmentService {


    private final ShipmentRepository shipmentRepository;

    @Autowired
    public ShipmentService(ShipmentRepository shipmentRepository) {
        this.shipmentRepository = shipmentRepository;
    }

    public List<Shipment> findAll() {
        return shipmentRepository.findAll();
    }
    public Shipment find(int id) {
        return shipmentRepository.findById(id).orElse(null);
    }

    @Transactional
    public void saveShipment(Shipment shipment) {
        shipmentRepository.save(shipment);
    }

    @Transactional
    public Shipment createShipmentWithSheep(ShipmentRequest shipmentRequest) {
        // Step 1: Create and populate the Shipment entity
        Shipment shipment = new Shipment();
        shipment.setAddress(shipmentRequest.address());
        shipment.setPhone(shipmentRequest.phone());
        shipment.setEmail(shipmentRequest.email());
        shipment.setStatus(shipmentRequest.status());
        shipment.setShippingDate(shipmentRequest.shippingDate());
        shipment.setSale(shipmentRequest.sale());

        // Step 3: Set the Sheep list to the Shipment

        // Step 4: Save the Shipment (this will cascade to Sheep)
        return shipmentRepository.save(shipment);
    }

    public ResponseEntity<Object> delete(int id) {
        Optional<Shipment> shipment = shipmentRepository.findById(id);
        if (shipment.isPresent()){
            shipmentRepository.deleteById(id);
            return ResponseEntity.ok("Deleted successfully");
        }
        return new ResponseEntity<>("Cannot delete undefined shipments" , HttpStatusCode.valueOf(404));
    }
    public void multipleDelete(List<Integer> ids){
        ids.forEach(this::delete);
    }

}
