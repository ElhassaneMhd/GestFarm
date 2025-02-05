package Gestfarm.Controller;

import Gestfarm.Dto.Auth.AuthenticationRequestDto;
import Gestfarm.Dto.Auth.RegistrationRequestDto;
import Gestfarm.Dto.RegisterResponse;
import Gestfarm.Mapper.UserRegistrationMapper;
import Gestfarm.Model.User;
import Gestfarm.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRegistrationMapper userRegistrationMapper;


    @GetMapping("/")
    public String home() {
        return "Welcome to the home page!";
    }

    @GetMapping("/user")
    public Map<String , Object> user(@AuthenticationPrincipal OAuth2User user, Principal principal) {

        if (Objects.nonNull(user)) {
            return user.getAttributes();
        }
        return Map.of("user",principal);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        System.out.println(user);
        return userService.verify(user);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(
            @RequestBody RegistrationRequestDto registrationDTO) {
        RegisterResponse res = userService.register(userRegistrationMapper.toEntity(registrationDTO));
        if (res.getStatus()){
            return  ResponseEntity.ok(res.getToken());
        }
        return new ResponseEntity<>(res.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
