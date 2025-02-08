package Gestfarm.Service;

import Gestfarm.Dto.SheepDTO;
import Gestfarm.Mapper.SheepMapper;
import Gestfarm.Model.Sheep;
import Gestfarm.Repository.SheepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SheepService {

    private final SheepRepository sheepRepository;
    private final SheepMapper sheepMapper;

    @Autowired
    public SheepService(SheepRepository sheepRepository, SheepMapper sheepMapper) {
        this.sheepRepository = sheepRepository;
        this.sheepMapper = sheepMapper;
    }


    public List<SheepDTO> findAll() {
        List<Sheep> sheepList= sheepRepository.findAll();
        return sheepList.stream()
                .map(sheepMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    public Sheep find(int id) {
        return sheepRepository.findById(id).orElse(null);
    }

    @Transactional
    public Sheep saveSheep(Sheep sheep) {
        sheepRepository.save(sheep);
        return sheep;
    }




    @Transactional
    public Sheep updateSheep(int sheepId, SheepDTO sheepDTO) {
        Sheep sheep = sheepRepository.findById(sheepId)
                .orElseThrow(() -> new RuntimeException("Sheep not found"));

        // Update fields if they are present in the request
        if (sheepDTO.getNumber() != null) sheep.setNumber(sheepDTO.getNumber());
        if (sheepDTO.getPrice() != null) sheep.setPrice(sheepDTO.getPrice());
        if (sheepDTO.getWeight() != null) sheep.setWeight(sheepDTO.getWeight());
        if (sheepDTO.getStatus() != null) sheep.setStatus(sheepDTO.getStatus());
        if (sheepDTO.getCategory() != null) sheep.setCategory( sheepDTO.getCategory());
        if (sheepDTO.getSale()!= null) sheep.setSale(sheepDTO.getSale());
        // Repeat for other fields...
        return sheepRepository.save(sheep);
    }

}
