package Gestfarm.Service;

import Gestfarm.Dto.CategoryDTO;
import Gestfarm.Dto.Request.CategoryRequest;
import Gestfarm.Dto.SheepDTO;
import Gestfarm.Mapper.CategoryMapper;
import Gestfarm.Model.Category;
import Gestfarm.Model.Sheep;
import Gestfarm.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }


    public List<CategoryDTO> findAll() {
        List<Category> categories= (List<Category>) categoryRepository.findAll();
        return categories.stream()
                .map(categoryMapper::mapToDTO)
                .toList();
    }
    public Category find(int id){
        return categoryRepository.findById(id);
    }


    public ResponseEntity<Object> save(CategoryRequest req) {
        Category newCategory = new Category();
        newCategory.setName(req.name());
        Category category = categoryRepository.save(newCategory);
        if (!category.getName().isEmpty()){
            return ResponseEntity.ok(category);
        }
        return new ResponseEntity<>("Cannot create category without name " , HttpStatusCode.valueOf(404));
    }

    public Category update(int id,CategoryRequest req) {
        Category category = categoryRepository.findById(id);
        if (req.name()!=null){
            category.setName(req.name());
        }
        return categoryRepository.save(category);
    }

    public ResponseEntity<Object> delete(int id) {
        Category category= categoryRepository.findById(id);
        categoryRepository.delete(category);
        return ResponseEntity.ok("Category deleted successfully");
    }

    public void multipleDelete(List<Integer> ids){
        ids.forEach(this::delete);
    }

}
