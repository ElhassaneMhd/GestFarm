package Gestfarm.Repository;

import Gestfarm.Model.Sheep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SheepRepository extends JpaRepository<Sheep, Integer> {
    void deleteById(int id);
    Sheep findSheepByCategory_Name(String S);
}
