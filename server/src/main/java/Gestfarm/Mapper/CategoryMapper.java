package Gestfarm.Mapper;

import Gestfarm.Dto.CategoryDTO;
import Gestfarm.Model.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryDTO mapToDTO(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        categoryDTO.setDescription(category.getDescription());
        categoryDTO.setPrice(category.getPrice());
        categoryDTO.setImage(category.getImage());
        categoryDTO.setSheep(category.getSheep());
        return categoryDTO;
    }
}
