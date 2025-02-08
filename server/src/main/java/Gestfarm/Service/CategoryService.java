package Gestfarm.Service;

import Gestfarm.Dto.CategoryDTO;
import Gestfarm.Dto.SheepDTO;
import Gestfarm.Model.Category;
import Gestfarm.Model.Sheep;
import Gestfarm.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


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
        sheepDTO.setId(sheep.getId());
        sheepDTO.setNumber(sheep.getNumber());
        sheepDTO.setPrice(sheep.getPrice());
        sheepDTO.setWeight(sheep.getWeight());
        sheepDTO.setStatus(sheep.getStatus());
        return sheepDTO;

    }
}
