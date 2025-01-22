package baa3.Service;

import baa3.Dao.SheepRepository;
import baa3.Entity.Sheep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SheepServiceImp implements SheepService {
    private final SheepRepository sheepRepository;

    @Autowired
    public SheepServiceImp(SheepRepository sheepRepository) {
        this.sheepRepository = sheepRepository;
    }

    @Override
    public List<Sheep> getAll() {
        return sheepRepository.findAll();
    }

    @Override
    public Sheep getById(int id) {
        Optional<Sheep> sheep = sheepRepository.findById(id);
        return sheep.orElse(null);
    }

    @Override
    public Sheep save(Sheep sheep) {
        return sheepRepository.save(sheep);
    }

    @Override
    public void delete(int id) {
        sheepRepository.deleteById(id);
    }

}
