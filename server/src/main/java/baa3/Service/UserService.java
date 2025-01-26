package baa3.Service;

import baa3.Dto.Auth.RegistrationRequestDto;
import baa3.Model.User;
import baa3.Repository.UserRepository;
import io.micrometer.core.instrument.config.validate.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
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

    public String verify(User user) {

        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );
        if (authentication.isAuthenticated()){
            return jwtService.generateToken(user);
        }
        return "Invalid credentials";
    }

    @Transactional
    public User registerUser(RegistrationRequestDto request) throws ValidationException {
        if (userRepository.existsByUsername(request.username()) ||
                userRepository.existsByEmail(request.email())) {
            return null;
        }
        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        return userRepository.save(user);
    }
}

