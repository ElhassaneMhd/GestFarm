package Gestfarm.Repository;

import Gestfarm.Model.Category;
import Gestfarm.Model.Permission;
import Gestfarm.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, Integer> {
    Permission findByName(String name);

}
