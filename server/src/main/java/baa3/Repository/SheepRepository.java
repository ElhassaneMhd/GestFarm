package baa3.Repository;

import baa3.Model.Sheep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("*")
public interface SheepRepository extends JpaRepository<Sheep, Integer> {

    @RestResource(path = "status")
    List<Sheep> findAllBySaleStatus(String status);

}
