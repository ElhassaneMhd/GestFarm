package baa3.Service;

import baa3.Dto.Auth.RegistrationRequestDto;
import baa3.Dto.Auth.RegistrationResponseDto;
import baa3.Model.User;
import baa3.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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


   public User register(User user){
       return userRepository.save(user);
   }

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
    public RegistrationResponseDto registerUser(RegistrationRequestDto request)  {
        if (userRepository.existsByUsername(request.username()) ||
                userRepository.existsByEmail(request.email())) {
            return new RegistrationResponseDto( request.username() ,
                    request.email(),null ,"User already exists" ,406);
        }
        if (!request.password().equals(request.passwordConfirmation())) {
            return new RegistrationResponseDto( request.username() ,
                    request.email(),null ,"Passwords do not match" ,406);
        }
        if (userRepository.existsByPhone(request.phone())){
            return new RegistrationResponseDto( request.username() ,
                    request.email(),null ,"Phone number already exists" ,406);
        }

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPhone(request.phone());
        user.setPassword(passwordEncoder.encode(request.password()));
        User savedUser = userRepository.save(user);
        return new RegistrationResponseDto(savedUser.getUsername(), savedUser.getEmail(),null,"User registered successfully" ,201);
    }
}

