package baa3.Controller;

import baa3.Model.Role;
import baa3.Model.User;
import baa3.Repository.UserRepository;
import baa3.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return null;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword()));

        return   userService.register(user);
    }
}
