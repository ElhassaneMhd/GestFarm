package baa3.Controller;

import baa3.Dto.Auth.RegistrationRequestDto;
import baa3.Dto.Auth.RegistrationResponseDto;
import baa3.Mapper.UserRegistrationMapper;
import baa3.Model.User;
import baa3.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;
import java.util.Objects;

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
    public ResponseEntity<RegistrationResponseDto> registerUser(
            @RequestBody RegistrationRequestDto registrationDTO) {

        final var regestred = userService.registerUser(userRegistrationMapper.toEntity(registrationDTO));

            if (regestred.status() == 406) {
                return new ResponseEntity<>(regestred, HttpStatusCode.valueOf(406));
            }else {
                return new ResponseEntity<>(regestred, HttpStatus.OK);
            }
    }
}
