package Gestfarm.Service;

import Gestfarm.Dto.SheepDTO;
import Gestfarm.Model.Category;
import Gestfarm.Model.Sheep;
import Gestfarm.Repository.CategoryRepository;
import Gestfarm.Repository.SheepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SheepService {
    @Autowired
    private SheepRepository sheepRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public Sheep saveSheep(Sheep sheep) {
        sheepRepository.save(sheep);
        return sheep;
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
        sheepDTO.setId(Optional.of(sheep.getId()));
        sheepDTO.setNumber(Optional.of(sheep.getNumber()));
        sheepDTO.setPrice(Optional.of(sheep.getPrice()));
        sheepDTO.setWeight(Optional.of(sheep.getWeight()));
        sheepDTO.setStatus(Optional.ofNullable(sheep.getStatus()));
        sheepDTO.setAmount(Optional.of(sheep.getAmount()));
        // Include the category name
        if (sheep.getCategory() != null) {
            sheepDTO.setCategory(Optional.of(sheep.getCategory()));
            sheepDTO.setCategoryName(Optional.ofNullable(sheep.getCategory().getName()));
        }
        if (sheep.getSale() !=null){

            sheepDTO.setSale(Optional.of(sheep.getSale()));
        }
        return sheepDTO;
    }

    @Transactional
    public Sheep updateSheep(int sheepId, SheepDTO sheepDTO) {
        Sheep sheep = sheepRepository.findById(sheepId)
                .orElseThrow(() -> new RuntimeException("Sheep not found"));

        // Update fields if they are present in the request
        if (sheepDTO.getNumber() != null) sheep.setNumber(sheepDTO.getNumber().get());
        if (sheepDTO.getPrice() != null) sheep.setPrice(sheepDTO.getPrice().get());
        if (sheepDTO.getWeight() != null) sheep.setWeight(sheepDTO.getWeight().get());
        if (sheepDTO.getStatus() != null) sheep.setStatus(sheepDTO.getStatus().get());
        if (sheepDTO.getAmount() != null) sheep.setAmount(sheepDTO.getAmount().get());
        if (sheepDTO.getCategory() != null) sheep.setCategory( sheepDTO.getCategory().get());
        if (sheepDTO.getSale()!= null) sheep.setSale(sheepDTO.getSale().get());
        // Repeat for other fields...
        return sheepRepository.save(sheep);
    }

}
