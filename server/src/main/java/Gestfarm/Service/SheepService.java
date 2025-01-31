package Gestfarm.Service;

import Gestfarm.Model.Sheep;
import Gestfarm.Repository.SheepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SheepService {
    @Autowired
    private SheepRepository sheepRepository;

    @Transactional
    public void saveSheep(Sheep sheep) {
        sheepRepository.save(sheep);
    }

    public List<Sheep> findAll() {
        return sheepRepository.findAll();
    }

}
