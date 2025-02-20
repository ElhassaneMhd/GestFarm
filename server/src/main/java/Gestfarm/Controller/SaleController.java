package Gestfarm.Controller;

import Gestfarm.Dto.Request.SaleRequest;
import Gestfarm.Dto.SaleDTO;
import Gestfarm.Model.Sale;
import Gestfarm.Service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @PreAuthorize("hasPermission('CREATE_SALES')")
    @PostMapping()
    public ResponseEntity<Sale> create(@RequestBody SaleRequest request){
        return saleService.save(request);
    }

    @PreAuthorize("hasPermission('UPDATE_SALES')")
    @PutMapping()
    public ResponseEntity<Sale> update(@RequestBody SaleRequest request){
     return null;
    }

    @PreAuthorize("hasPermission('DELETE_SALES')")
    @DeleteMapping("/{id}")
    public  ResponseEntity<Object> delete(@PathVariable Integer id){
        return saleService.delete(id);
    }

    @PreAuthorize("hasPermission('DELETE_SALES')")
    @PostMapping("/delete/multiple")
    public void multipleDelete(@RequestBody List<Integer> ids){
        saleService.multipleDelete(ids);
    }
}
