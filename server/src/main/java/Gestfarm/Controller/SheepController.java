package Gestfarm.Controller;

import Gestfarm.Dto.Request.SheepRequest;
import Gestfarm.Model.Sheep;
import Gestfarm.Service.SheepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/sheep")
public class SheepController {

    private final SheepService sheepService;

    @Autowired
    public SheepController(SheepService sheepService) {
        this.sheepService = sheepService;
    }


    @GetMapping()
    @PreAuthorize("hasPermission('READ_SHEEP')")
    public ResponseEntity<Object> findAll( ) {
        return ResponseEntity.ok(sheepService.getAll());
    }

    @GetMapping("/paginate")
    @PreAuthorize("hasPermission('READ_SHEEP')")
    public ResponseEntity<Object> paginate(@RequestParam int page ,@RequestParam int limit  ) {
        return ResponseEntity.ok(sheepService.paginate(page,limit));
    }

    @PostMapping()
    @PreAuthorize("hasPermission('CREATE_SHEEP')")
    public Sheep create(@RequestBody SheepRequest sheepRequest) {
        return  sheepService.save(sheepRequest);
    }

    @PreAuthorize("hasPermission('UPDATE_SHEEP')")
    @PutMapping(value = "/{id}")
    public ResponseEntity<Object> update(@PathVariable Integer id, @RequestBody SheepRequest sheep) {
        Sheep updatedSheep = sheepService.update(id, sheep);
        if (updatedSheep == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedSheep);
    }

    @PreAuthorize("hasPermission('DELETE_SHEEP')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete( @PathVariable Integer id){
        return  sheepService.delete(id);
    }

    @PreAuthorize("hasPermission('DELETE_SHEEP')")
    @PostMapping("/delete/multiple")
    public void multipleDelete(@RequestBody List<Integer> ids){
        sheepService.multipleDelete(ids);
    }

}
