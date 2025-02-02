package Gestfarm.Service;

import Gestfarm.Dto.SheepDTO;
import Gestfarm.Model.Sheep;
import Gestfarm.Repository.SheepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SheepService {
    @Autowired
    private SheepRepository sheepRepository;

    @Transactional
    public void saveSheep(Sheep sheep) {
        sheepRepository.save(sheep);
    }

    public List<SheepDTO> findAll() {
        List<Sheep> sheepList= sheepRepository.findAll();
        return sheepList.stream()
                .map(this::mapToSheepDTO)
                .collect(Collectors.toList());
    }

    public Sheep find(int id) {
        return sheepRepository.findById(id).orElse(null);
    }

    private SheepDTO mapToSheepDTO(Sheep sheep) {
        SheepDTO sheepDTO = new SheepDTO();
        sheepDTO.setId(sheep.getId());
        sheepDTO.setNumber(sheep.getNumber());
        sheepDTO.setPrice(sheep.getPrice());
        sheepDTO.setWeight(sheep.getWeight());
        sheepDTO.setStatus(sheep.getStatus());
        sheepDTO.setAmount(sheep.getAmount());

        // Include the category name
        if (sheep.getCategory() != null) {
            sheepDTO.setCategoryName(sheep.getCategory().getName());
        }
        return sheepDTO;
    }

}
