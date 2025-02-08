package Gestfarm.Controller;

import Gestfarm.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("")
    @PreAuthorize("hasPermission('READ_USERS')")
    public ResponseEntity<Object> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

}
