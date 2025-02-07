package Gestfarm.Controller;

import Gestfarm.Dto.SheepDTO;
import Gestfarm.Model.Category;
import Gestfarm.Model.Sale;
import Gestfarm.Model.Sheep;
import Gestfarm.Model.Shipment;
import Gestfarm.Service.CategoryService;
import Gestfarm.Service.SheepService;
import Gestfarm.Repository.CategoryRepository;
import Gestfarm.Service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/sheep")
public class SheepController {

    @Autowired
    private SheepService sheepService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<Object> getAllSheep() {
        return ResponseEntity.ok(sheepService.findAll());
    }

    @PostMapping("")
    public Sheep createSheep(@RequestBody Sheep sheep) {
        Sale sale = null;
        Category category = categoryService.find(sheep.getCategory().getId());
        if (category != null) {
            sheep.setCategory(category);
        }
        sheep.setAmount(1);
        sheep.setSale(sale);
        return  sheepService.saveSheep(sheep);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateSheep(@PathVariable int id, @RequestBody SheepDTO sheepDto) {
        Sheep updatedSheep = sheepService.updateSheep(id, sheepDto);
        if (updatedSheep == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedSheep);
    }
}
