package Gestfarm.Repository;

import Gestfarm.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Category findByName(String name);
    boolean existsByName(String name);
    Category findById(int id );
    boolean existsById(Integer id);
}
