package Gestfarm.Repository;

import Gestfarm.Model.Role;
import Gestfarm.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);
    boolean existsByUsername(String username);
    User findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    List<User> findUsersByRoleNot(Role role);

    List<User> findUsersByRole_Name(String role_name);
}

