package Gestfarm.Controller;

import Gestfarm.Dto.Request.SheepRequest;
import Gestfarm.Model.Category;
import Gestfarm.Model.Sheep;
import Gestfarm.Service.CategoryService;
import Gestfarm.Service.SheepService;
import Gestfarm.Security.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/sheep")
public class SheepController {
    private final SheepService sheepService;
    private final CategoryService categoryService;

    @Autowired
    public SheepController(SheepService sheepService, CategoryService categoryService, UserService userService) {
        this.sheepService = sheepService;
        this.categoryService = categoryService;
    }

    @GetMapping("")
    @PreAuthorize("hasPermission('READ_SHEEP')")
    public ResponseEntity<Object> getAll() {
        return ResponseEntity.ok(sheepService.findAll());
    }

    @PostMapping("")
    @PreAuthorize("hasPermission('CREATE_SHEEP')")
    public Sheep create(@RequestBody Sheep sheep) {
        Category category = categoryService.find(sheep.getCategory().getId());
        if (category != null) {
            sheep.setCategory(category);
        }
        sheep.setSale(null);
        return  sheepService.save(sheep);
    }
    @PreAuthorize("hasPermission('UPDATE_SHEEP')")
    @PutMapping(value = "/{id}")
    public ResponseEntity<Object> update(@PathVariable int id, @RequestBody SheepRequest sheep) {
            System.out.println(sheep);
        Sheep updatedSheep = sheepService.update(id, sheep);
        if (updatedSheep == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedSheep);
    }

    @PreAuthorize("hasPermission('DELETE_SHEEP')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete( @PathVariable int id){
        return  sheepService.delete(id);
    }

    @PreAuthorize("hasPermission('DELETE_SHEEP')")
    @PostMapping("/delete/multiple")
    public void multipleDelete(@RequestBody List<Integer> ids){
        sheepService.multipleDelete(ids);
    }

}
