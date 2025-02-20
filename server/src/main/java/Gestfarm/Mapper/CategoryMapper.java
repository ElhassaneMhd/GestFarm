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

    public CategoryDTO mapToDTO(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        categoryDTO.setSheep(category.getSheep());
        return categoryDTO;
    }
}
