package Gestfarm.Service;

import Gestfarm.Model.Shipment;
import Gestfarm.Repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    public Shipment find(int id) {
        return shipmentRepository.findById(id).orElse(null);
    }

}
