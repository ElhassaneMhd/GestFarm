package Gestfarm.Service;

import Gestfarm.Dto.PaginateDTO;
import Gestfarm.Dto.Request.ShipmentRequest;
import Gestfarm.Dto.SheepDTO;
import Gestfarm.Dto.ShipmentDTO;
import Gestfarm.Mapper.ShipmentMapper;
import Gestfarm.Model.Sale;
import Gestfarm.Model.Sheep;
import Gestfarm.Model.Shipment;
import Gestfarm.Model.User;
import Gestfarm.Repository.SaleRepository;
import Gestfarm.Repository.ShipmentRepository;
import Gestfarm.Security.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ShipmentService {


    private final ShipmentRepository shipmentRepository;
    private final UserService userService;
    private final ShipmentMapper shipmentMapper;
    private final SaleRepository saleRepository;

    @Autowired
    public ShipmentService(ShipmentRepository shipmentRepository, SaleRepository saleRepository, UserService userService, ShipmentMapper shipmentMapper) {
        this.shipmentRepository = shipmentRepository;
        this.userService = userService;
        this.shipmentMapper = shipmentMapper;
        this.saleRepository = saleRepository;
    }

    public List<ShipmentDTO> findAll() {
        List<Shipment> shipmentsList = shipmentRepository.findAll();
        return  shipmentsList.stream().map(shipmentMapper::mapToDto).toList();
    }

    public PaginateDTO<ShipmentDTO> paginate(int page, int limit) {
        int total = (int) shipmentRepository.count();
        Pageable pageable = PageRequest.of(page-1, limit);
        Page<Shipment> sheep= shipmentRepository.findAll(pageable);
        List<ShipmentDTO> ShipmentDTOS= sheep.stream()
                .map(shipmentMapper::mapToDto)
                .toList();
        return new PaginateDTO<ShipmentDTO>(page,limit,total,ShipmentDTOS);
    }

    public Shipment find(Integer id) {
        return shipmentRepository.findById(id).orElse(null);
    }

    public Shipment save(ShipmentRequest shipmentRequest) {
        Sale sale = saleRepository.findById(shipmentRequest.sale()).orElse(null);
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
        Shipment shipment = shipmentRepository.findById(id).orElse(null);
        if (shipment != null){
            shipment.setSale(null);
            shipment.setShipper(null);
            shipmentRepository.delete(shipment);
            return ResponseEntity.ok("Deleted successfully");
        }
        return new ResponseEntity<>("Cannot delete undefined shipments" , HttpStatusCode.valueOf(404));
    }

    public void multipleDelete(List<Integer> ids){
        ids.forEach(this::delete);
    }

}
