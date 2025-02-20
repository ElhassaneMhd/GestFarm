package Gestfarm.Controller;

import Gestfarm.Security.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    @PreAuthorize("hasPermission('READ_USERS')")
    public ResponseEntity<Object> getAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/shippers")
    @PreAuthorize("hasPermission('READ_USERS')")
    public ResponseEntity<Object> getShippers() {
        return ResponseEntity.ok(userService.findAllShippers());
    }

    @PreAuthorize("hasPermission('DELETE_USERS')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete( @PathVariable Integer id){
        return  userService.delete(id);
    }

    @PreAuthorize("hasPermission('DELETE_USERS')")
    @PostMapping("/delete/multiple")
    public void multipleDelete(@RequestBody List<Integer> ids){
        userService.multipleDelete(ids);
    }
}
