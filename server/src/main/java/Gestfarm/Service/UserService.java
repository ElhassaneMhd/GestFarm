package Gestfarm.Service;

import Gestfarm.Dto.Auth.RegistrationRequestDto;
import Gestfarm.Dto.Auth.RegistrationResponseDto;
import Gestfarm.Dto.RegisterResponse;
import Gestfarm.Model.User;
import Gestfarm.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<String> verify(User user) {

        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );
        if (authentication.isAuthenticated()){
            String token = jwtService.generateToken(user);
            return ResponseEntity.ok(token);
        }
        return new ResponseEntity<>("Invalid credentials" , HttpStatusCode.valueOf(401));
    }

    @Transactional
    public RegisterResponse  register(RegistrationRequestDto request)  {
        RegisterResponse rep = new RegisterResponse();
        rep.setStatus(false);
        if (userRepository.existsByUsername(request.username())) {
            rep.setMessage("Username is already taken");
            return rep;
        }

        if (userRepository.existsByEmail(request.email())) {
            rep.setMessage("Email is already taken");
            return rep;
        }

        if (!request.password().equals(request.passwordConfirmation())) {
            rep.setMessage("Passwords do not match");
            return rep;
        }

        if (userRepository.existsByPhone(request.phone())) {
            rep.setMessage("Phone number is already in use");
            return rep;
        }

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPhone(request.phone());
        user.setPassword(passwordEncoder.encode(request.password()));
        User savedUser = userRepository.save(user);
        String token = jwtService.generateToken(savedUser);

        rep.setStatus(true);
        rep.setUser(savedUser);
        rep.setToken(token);
        return rep;
    }
}

