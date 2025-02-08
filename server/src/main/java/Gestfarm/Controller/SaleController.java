package Gestfarm.Controller;

import Gestfarm.Model.Sale;
import Gestfarm.Service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    private final SaleService saleService;

    @Autowired
    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }


    @GetMapping()
    @PreAuthorize("hasPermission('READ_SALES')")
    public ResponseEntity<List<Sale>> getAll(){
        return ResponseEntity.ok(saleService.findAll()) ;
    }


}
