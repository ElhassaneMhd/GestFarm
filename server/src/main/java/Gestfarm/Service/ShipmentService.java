package Gestfarm.Service;

import Gestfarm.Dto.SheepRequest;
import Gestfarm.Dto.ShipmentRequest;
import Gestfarm.Model.Sheep;
import Gestfarm.Model.Shipment;
import Gestfarm.Repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;
    @Autowired
    private SheepService sheepService;

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
        shipment.setName(shipmentRequest.getName());
        shipment.setAddress(shipmentRequest.getAddress());
        shipment.setPhone(shipmentRequest.getPhone());
        shipment.setEmail(shipmentRequest.getEmail());
        shipment.setStatus(shipmentRequest.getStatus());
        shipment.setShippingDate(shipmentRequest.getShippingDate());

        // Step 2: Process each Sheep in the request
        List<Sheep> sheepList = new ArrayList<>();
        for (SheepRequest sheepRequest : shipmentRequest.getSheep()) {
            Sheep sheep = sheepService.find(sheepRequest.getId());

            // Associate the Sheep with the Shipment
            sheep.setShipment(shipment);
            sheepList.add(sheep);
        }

        // Step 3: Set the Sheep list to the Shipment
        shipment.setSheep(sheepList);

        // Step 4: Save the Shipment (this will cascade to Sheep)
        return shipmentRepository.save(shipment);
    }
}
