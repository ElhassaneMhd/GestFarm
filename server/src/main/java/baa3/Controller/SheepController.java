package baa3.Controller;

import baa3.Entity.Sheep;
import baa3.Exception.NotFound;
import baa3.Service.SheepService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sheep")
public class SheepController  {

    private final SheepService sheepService;

    public SheepController(SheepService sheepService) {
        this.sheepService = sheepService;
    }

    @GetMapping("")
    public List<Sheep> getAllSheep() {
        return  sheepService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sheep> getOneSheep(@PathVariable int id){
        Sheep sheep=  sheepService.getById(id);
        if (sheep== null){
            throw new NotFound("Cannot find sheep with id :"+ id);
        }
        return new ResponseEntity<>(sheep, HttpStatus.valueOf(200));
    }

    @PostMapping("")
    public Sheep store(@RequestBody Sheep sheep){
        sheep.setId(0);
        Sheep dbSheep= sheepService.save(sheep);
        if (dbSheep== null){
            throw new RuntimeException("Cannot add sheep");
        }
        return dbSheep;
    }
    @PutMapping("")
    public Sheep update(@RequestBody Sheep sheep){
        Sheep dbSheep= sheepService.save(sheep);
        if (dbSheep== null){
            throw new RuntimeException("Cannot update sheep");
        }
        return dbSheep;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> destroy(@PathVariable int id){
        Sheep sheep=  sheepService.getById(id);
        if (sheep== null){
            throw new NotFound("Cannot DELETE undefined sheep , id : "+ id);
        }
        sheepService.delete(id);
        return new ResponseEntity<>("Deleted succssefully" , HttpStatus.valueOf(200));
    }


}
