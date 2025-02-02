package Gestfarm.Repository;

import Gestfarm.Model.Sheep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SheepRepository extends JpaRepository<Sheep, Integer> {

    @RestResource(path = "status")
    List<Sheep> findAllByStatus(String status);
}
