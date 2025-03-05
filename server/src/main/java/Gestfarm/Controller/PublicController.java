package Gestfarm.Controller;

import Gestfarm.Dto.CategoryDTO;
import Gestfarm.Dto.PublicCategoryDTO;
import Gestfarm.Dto.SheepDTO;
import Gestfarm.Enum.SheepStatus;
import Gestfarm.Mapper.CategoryMapper;
import Gestfarm.Mapper.SheepMapper;
import Gestfarm.Model.Category;
import Gestfarm.Model.Sheep;
import Gestfarm.Repository.CategoryRepository;
import Gestfarm.Repository.SheepRepository;
import Gestfarm.Service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private final SheepRepository sheepRepository;
    private final SheepMapper sheepMapper;
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public PublicController( SheepRepository sheepRepository, SheepMapper sheepMapper, CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.sheepRepository = sheepRepository;
        this.sheepMapper = sheepMapper;
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @GetMapping("/categories")
    public ResponseEntity<Object> getCategoriesName(){
        List<PublicCategoryDTO> categories = categoryRepository.findAll()
                .stream().map(categoryMapper::mapToPublicDTO).toList();
        return  ResponseEntity.ok().body(categories);
    }

    @GetMapping("/sheep/{number}")
    public ResponseEntity<Object> getSheepByNumber(@PathVariable int number){
        Sheep sheep = sheepRepository.findByNumber(number);
        return ResponseEntity.ok().body(sheepMapper.mapToPublicSheep(sheep));

    }
    @GetMapping("/sheep/available")
    public ResponseEntity<Object> getAvailableSheep(){
        List<SheepDTO> sheep = sheepRepository.findByStatus(SheepStatus.AVAILABLE)
                .stream().map(sheepMapper::mapToDTO).toList();
        return ResponseEntity.ok().body(sheep);
    }

}
