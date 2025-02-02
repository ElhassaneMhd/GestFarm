package Gestfarm.Controller;

import Gestfarm.Dto.ShipmentRequest;
import Gestfarm.Model.Sheep;
import Gestfarm.Model.Shipment;
import Gestfarm.Service.SheepService;
import Gestfarm.Service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    @Autowired
    private SheepService sheepService;

    @GetMapping("")
    public Iterable<Shipment> getAllShipment() {
        return shipmentService.findAll();
    }

    @PostMapping("/add")
    public Shipment createShipment(@RequestBody ShipmentRequest shipment) {
       return shipmentService.createShipmentWithSheep(shipment);
    }
}
