package baa3.Dao;

import baa3.Entity.Sheep;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SheepRepository extends JpaRepository<Sheep, Integer> {


}
