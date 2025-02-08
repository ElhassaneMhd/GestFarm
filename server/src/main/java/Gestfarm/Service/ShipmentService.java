package Gestfarm.Service;

import Gestfarm.Dto.Request.ShipmentRequest;
import Gestfarm.Model.Shipment;
import Gestfarm.Repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
        shipment.setAddress(shipmentRequest.getAddress());
        shipment.setPhone(shipmentRequest.getPhone());
        shipment.setEmail(shipmentRequest.getEmail());
        shipment.setStatus(shipmentRequest.getStatus());
        shipment.setShippingDate(shipmentRequest.getShippingDate());
        shipment.setSale(shipmentRequest.getSale());

        // Step 3: Set the Sheep list to the Shipment

        // Step 4: Save the Shipment (this will cascade to Sheep)
        return shipmentRepository.save(shipment);
    }
}
