package Gestfarm.Controller;

import Gestfarm.Dto.SheepDTO;
import Gestfarm.Model.Category;
import Gestfarm.Model.Sheep;
import Gestfarm.Service.CategoryService;
import Gestfarm.Service.SheepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/sheep")
public class SheepController {
    private final SheepService sheepService;
    private final CategoryService categoryService;

    @Autowired
    public SheepController(SheepService sheepService, CategoryService categoryService) {
        this.sheepService = sheepService;
        this.categoryService = categoryService;
    }

    @GetMapping("")
    @PreAuthorize("hasPermission('READ_SHEEP')")
    public ResponseEntity<Object> getAllSheep() {
        return ResponseEntity.ok(sheepService.findAll());
    }

    @PostMapping("")
    @PreAuthorize("hasPermission('CREATE_SHEEP')")
    public Sheep createSheep(@RequestBody Sheep sheep) {
        Category category = categoryService.find(sheep.getCategory().getId());
        if (category != null) {
            sheep.setCategory(category);
        }
        sheep.setSale(null);
        return  sheepService.saveSheep(sheep);
    }
    @PreAuthorize("hasPermission('UPDATE_SHEEP')")
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> updateSheep(@PathVariable int id, @RequestBody SheepDTO sheepDto) {
            System.out.println(sheepDto);
        Sheep updatedSheep = sheepService.updateSheep(id, sheepDto);
        if (updatedSheep == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedSheep);
    }
}
