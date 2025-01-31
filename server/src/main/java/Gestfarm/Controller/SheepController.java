package Gestfarm.Controller;

import Gestfarm.Model.Category;
import Gestfarm.Model.Sheep;
import Gestfarm.Model.Shipment;
import Gestfarm.Service.CategoryService;
import Gestfarm.Service.SheepService;
import Gestfarm.Repository.CategoryRepository;
import Gestfarm.Service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/sheep")
public class SheepController {

    @Autowired
    private SheepService sheepService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ShipmentService shipmentService;

    @GetMapping("/all")
    public Iterable<Sheep> getAllSheep() {
        return sheepService.findAll();
    }

    @PostMapping("/add")
    public Boolean createSheep(@RequestBody Sheep sheep) {
        Shipment shipment = null;
        Category category = categoryService.find(sheep.getCategory().getId());
        if (category == null) {
            return false;
        }
        sheep.setAmount(0);
        sheep.setShipment(shipment);
        sheep.setCategory(category);
        sheepService.saveSheep(sheep);
        return true;
    }
}
