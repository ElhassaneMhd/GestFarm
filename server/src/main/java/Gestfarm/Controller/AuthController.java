package Gestfarm.Controller;

import Gestfarm.Dto.Auth.RegistrationRequest;
import Gestfarm.Dto.Response.RegisterResponse;
import Gestfarm.Dto.UserDTO;
import Gestfarm.Mapper.UserMapper;
import Gestfarm.Model.User;
import Gestfarm.Repository.UserRepository;
import Gestfarm.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;


    @GetMapping("/user")
    public UserDTO user(@AuthenticationPrincipal OAuth2User oAuthuser, Principal principal) {

//        if (Objects.nonNull(oAuthuser)) {
//            return oAuthuser.getAttributes();
//        }
        User user = userRepository.findByUsername(principal.getName());
        return userMapper.mapToDto(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        System.out.println(user);
        return userService.verify(user);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegistrationRequest registrationDTO) {
        RegisterResponse res = userService.register(registrationDTO);
        if (res.getStatus()){
            return  ResponseEntity.ok(res.getToken());
        }
        return new ResponseEntity<>(res.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
