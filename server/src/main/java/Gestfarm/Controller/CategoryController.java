package Gestfarm.Controller;

import Gestfarm.Dto.CategoryDTO;
import Gestfarm.Model.Category;
import Gestfarm.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;


    @GetMapping("")
    public ResponseEntity<Object> getAllCategory() {
        List<Category> categories= (List<Category>) categoryService.findAll();
        List<CategoryDTO> categoryDTOs = categories.stream()
                .map(categoryService::mapToCategoryDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(categoryDTOs);
    }
}
