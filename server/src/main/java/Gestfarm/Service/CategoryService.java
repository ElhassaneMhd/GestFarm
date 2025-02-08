package Gestfarm.Service;

import Gestfarm.Dto.CategoryDTO;
import Gestfarm.Dto.SheepDTO;
import Gestfarm.Model.Category;
import Gestfarm.Model.Sheep;
import Gestfarm.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;


    public Iterable<Category> findAll() {
        return categoryRepository.findAll();
    }
    public Category find(int id){
        return categoryRepository.findById(id);
    }

    public CategoryDTO mapToCategoryDTO(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());

        List<SheepDTO> sheepDTOs = category.getSheep().stream()
                .map(this::mapToSheepDTO)
                .collect(Collectors.toList());
        categoryDTO.setSheep(sheepDTOs);

        return categoryDTO;
    }

    public SheepDTO mapToSheepDTO(Sheep sheep) {
        SheepDTO sheepDTO = new SheepDTO();
        sheepDTO.setId(Optional.of(sheep.getId()));
        sheepDTO.setNumber(Optional.of(sheep.getNumber()));
        sheepDTO.setPrice(Optional.of(sheep.getPrice()));
        sheepDTO.setWeight(Optional.of(sheep.getWeight()));
        sheepDTO.setStatus(Optional.ofNullable(sheep.getStatus()));
        return sheepDTO;

    }
}
