package Gestfarm.Controller;

import Gestfarm.Dto.Request.ShipmentRequest;
import Gestfarm.Model.Shipment;
import Gestfarm.Service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
public class ShipmentController {

    private final ShipmentService shipmentService;

    @Autowired
    public ShipmentController(ShipmentService shipmentService) {
        this.shipmentService = shipmentService;
    }

    @GetMapping()
    @PreAuthorize("hasPermission('READ_SHIPPMENT')")
    public ResponseEntity<Object> getAll() {
        return ResponseEntity.ok(shipmentService.findAll());
    }

    @PostMapping()
    @PreAuthorize("hasPermission('CREATE_SHIPPMENT')")
    public Shipment create(@RequestBody ShipmentRequest shipment) {
       return shipmentService.save(shipment);
    }

    @PutMapping()
    @PreAuthorize("hasPermission('UPDATE_SHIPPMENT')")
    public Shipment update(@RequestBody ShipmentRequest shipment) {
        return null;
    }

    @PreAuthorize("hasPermission('DELETE_SHIPPMENT')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Integer id){
        return  shipmentService.delete(id);
    }

    @PreAuthorize("hasPermission('DELETE_SHIPPMENT')")
    @PostMapping("/delete/multiple")
    public void multipleDelete(@RequestBody List<Integer> ids) {
        shipmentService.multipleDelete(ids);
    }
}
