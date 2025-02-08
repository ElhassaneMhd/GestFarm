package Gestfarm.Controller;

import Gestfarm.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("")
    @PreAuthorize("hasPermission('READ_USERS')")
    public ResponseEntity<Object> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

}
