package Gestfarm.Security;

import Gestfarm.Dto.Request.RegistrationRequest;
import Gestfarm.Dto.Response.RegisterResponse;
import Gestfarm.Dto.UserDTO;
import Gestfarm.Mapper.UserMapper;
import Gestfarm.Model.Role;
import Gestfarm.Model.User;
import Gestfarm.Model.User;
import Gestfarm.Repository.RoleRepository;
import Gestfarm.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final AuthenticationManager authManager;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;

    @Autowired
    public  UserService (UserMapper userMapper,
                         UserRepository userRepository,
                         JWTService jwtService,
                         AuthenticationManager authManager,
                         RoleRepository roleRepository,
                         PasswordEncoder passwordEncoder){
        this.userMapper = userMapper;
        this.authManager= authManager;
        this.passwordEncoder= passwordEncoder;
        this.jwtService= jwtService;
        this.roleRepository= roleRepository;
        this.userRepository=userRepository;
    }

    public List<UserDTO>  findAll() {
        Role role = roleRepository.findByName("ROLE_ADMIN");
        List<User> usersList = userRepository.findUsersByRoleNot(role);
        return usersList.stream().map(userMapper::mapToDto).toList();
    }

    public User findById(Integer id){
        return userRepository.findById(id).orElse(null);
    }

    public Object findAllShippers() {
        List<User> shippersList = userRepository.findUsersByRole_Name("ROLE_SHIPPER");
        return shippersList.stream().map(userMapper::mapToShipper).toList();
    }

    public Boolean checkIfExists(User user){
        return userRepository.existsByPhone(user.getPhone()) ||
                userRepository.existsByUsername(user.getUsername()) ||
                userRepository.existsByEmail(user.getEmail());
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
    public RegisterResponse  register(RegistrationRequest request)  {
        RegisterResponse rep = new RegisterResponse();
        rep.setStatus(false);
        Role role = roleRepository.findByName("ROLE_USER");
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

        if (roleRepository.existsByName("ROLE_"+request.role())){
             role = roleRepository.findByName("ROLE_"+request.role());
        }
        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPhone(request.phone());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(role);
        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(savedUser);
        rep.setStatus(true);
        rep.setUser(savedUser);
        rep.setToken(token);
        return rep;
    }

    @Transactional
    public ResponseEntity<Object> delete(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()){
            userRepository.deleteById(id);
            return ResponseEntity.ok("Deleted successfully");
        }
        return new ResponseEntity<>("Cannot delete undefined User" , HttpStatusCode.valueOf(404));
    }

    @Transactional
    public void multipleDelete(List<Integer> ids){
        ids.forEach(this::delete);
    }


}

