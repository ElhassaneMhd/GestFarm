package Gestfarm.Service;

import Gestfarm.Dto.Request.ShipmentRequest;
import Gestfarm.Dto.ShipmentDTO;
import Gestfarm.Mapper.ShipmentMapper;
import Gestfarm.Model.Sale;
import Gestfarm.Model.Shipment;
import Gestfarm.Model.User;
import Gestfarm.Repository.SaleRepository;
import Gestfarm.Repository.ShipmentRepository;
import Gestfarm.Security.UserService;
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
    private final SaleService saleService;
    private final UserService userService;
    private final ShipmentMapper shipmentMapper;
    private final SaleRepository saleRepository;

    @Autowired
    public ShipmentService(ShipmentRepository shipmentRepository, SaleRepository saleRepository, SaleService saleService, UserService userService, ShipmentMapper shipmentMapper) {
        this.shipmentRepository = shipmentRepository;
        this.saleService = saleService;
        this.userService = userService;
        this.shipmentMapper = shipmentMapper;
        this.saleRepository = saleRepository;
    }

    public List<ShipmentDTO> findAll() {
        List<Shipment> shipmentsList = shipmentRepository.findAll();
        return  shipmentsList.stream().map(shipmentMapper::mapToDto).toList();
    }
    public Shipment find(Integer id) {
        return shipmentRepository.findById(id).orElse(null);
    }

    @Transactional
    public Shipment save(ShipmentRequest shipmentRequest) {
        Sale sale = saleService.findById(shipmentRequest.sale());
        User shipper = userService.findById(shipmentRequest.shipper());
        Shipment shipment = new Shipment();
        shipment.setAddress(shipmentRequest.address());
        shipment.setPhone(shipmentRequest.phone());
        shipment.setStatus(shipmentRequest.status());
        shipment.setShippingDate(shipmentRequest.shippingDate());
        shipment.setSale(sale);
        shipment.setShipper(shipper);
        return shipmentRepository.save(shipment);
    }

    @Transactional
    public ResponseEntity<Object> delete(Integer id) {
        Optional<Shipment> shipment = shipmentRepository.findById(id);
        saleRepository.setShipmentToNull(id);
        if (shipment.isPresent()){
            shipmentRepository.deleteById(id);
            return ResponseEntity.ok("Deleted successfully");
        }
        return new ResponseEntity<>("Cannot delete undefined shipments" , HttpStatusCode.valueOf(404));
    }

    @Transactional
    public void multipleDelete(List<Integer> ids){
        ids.forEach(this::delete);
    }

}
