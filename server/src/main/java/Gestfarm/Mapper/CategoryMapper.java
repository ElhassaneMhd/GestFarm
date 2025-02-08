package Gestfarm.Mapper;

import Gestfarm.Dto.CategoryDTO;
import Gestfarm.Dto.SheepDTO;
import Gestfarm.Model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryMapper {

    private final SheepMapper sheepMapper;

    @Autowired
    public CategoryMapper(SheepMapper sheepMapper) {
        this.sheepMapper = sheepMapper;
    }

    public CategoryDTO mapToDTO(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());

        List<SheepDTO> sheepDTOs = category.getSheep().stream()
                .map(sheepMapper::mapToDTO)
                .collect(Collectors.toList());
        categoryDTO.setSheep(sheepDTOs);

        return categoryDTO;
    }
}
