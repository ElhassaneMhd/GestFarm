package Gestfarm.Security;

import Gestfarm.Model.Permission;
import Gestfarm.Model.Role;
import Gestfarm.Model.User;
import Gestfarm.Repository.PermissionRepository;
import Gestfarm.Repository.RoleRepository;
import Gestfarm.Repository.UserRepository;
import Gestfarm.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
public class SetupDataLoader implements
        ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService uservice;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (alreadySetup)
            return;
        Permission readPermission
                = createPermissionIfNotFound("READ_PRIVILEGE");
        Permission writePermission
                = createPermissionIfNotFound("WRITE_PRIVILEGE");

        List<Permission> adminPermissions = Arrays.asList(
                readPermission, writePermission);
        createRoleIfNotFound("ROLE_ADMIN", adminPermissions);
        createRoleIfNotFound("ROLE_USER", Arrays.asList(readPermission));

        Role adminRole = roleRepository.findByName("ROLE_ADMIN");
        User user = new User();
        user.setUsername("admin");
        user.setPassword(passwordEncoder.encode("admin123"));
        user.setEmail("admin@gmail.com");
        user.setPhone("0666552211");
        user.setRole(adminRole);
        if(!userRepository.existsByEmail(user.getEmail())&& !userRepository.existsByPhone(user.getPhone()) ){
            userRepository.save(user);
        }
        alreadySetup = true;
    }

    @Transactional
    Permission createPermissionIfNotFound(String name) {

        Permission privilege = permissionRepository.findByName(name);
        if (privilege == null) {
            privilege = new Permission(name);
            permissionRepository.save(privilege);
        }
        return privilege;
    }

    @Transactional
    Role createRoleIfNotFound(
            String name, List<Permission> privileges) {

        Role role = roleRepository.findByName(name);
        if (role == null) {
            role = new Role(name);
            role.setPermissions(privileges);
            roleRepository.save(role);
        }
        return role;
    }
}