package Gestfarm.Controller;

import Gestfarm.Dto.Request.ShipmentRequest;
import Gestfarm.Model.Shipment;
import Gestfarm.Service.ShipmentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipments")
public class ShipmentController {

    private final ShipmentService shipmentService;

    public ShipmentController(ShipmentService shipmentService) {
        this.shipmentService = shipmentService;
    }


    @GetMapping("")
    @PreAuthorize("hasPermission('READ_SHIPPMENT')")
    public Iterable<Shipment> getAllShipment() {
        return shipmentService.findAll();
    }

    @PostMapping("/add")
    @PreAuthorize("hasPermission('CREATE_SHIPPMENT')")
    public Shipment createShipment(@RequestBody ShipmentRequest shipment) {
       return shipmentService.createShipmentWithSheep(shipment);
    }
}
