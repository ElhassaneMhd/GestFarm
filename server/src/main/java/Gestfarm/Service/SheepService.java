package Gestfarm.Service;

import Gestfarm.Dto.CategoryDTO;
import Gestfarm.Dto.PaginateDTO;
import Gestfarm.Dto.Request.SheepRequest;
import Gestfarm.Dto.SheepDTO;
import Gestfarm.Mapper.SheepMapper;
import Gestfarm.Model.Category;
import Gestfarm.Model.Sheep;
import Gestfarm.Repository.SheepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SheepService {

    private final SheepRepository sheepRepository;
    private final SheepMapper sheepMapper;
    private final CategoryService categoryService;

    @Autowired
    public SheepService(SheepRepository sheepRepository, SheepMapper sheepMapper, CategoryService categoryService) {
        this.sheepRepository = sheepRepository;
        this.sheepMapper = sheepMapper;
        this.categoryService = categoryService;
    }
    public List<SheepDTO> getAll(){
        List<Sheep> sheepList= sheepRepository.findAll();
        return sheepList.stream()
                .map(sheepMapper::mapToDTO)
                .toList();
    }

    public PaginateDTO<SheepDTO> paginate(int page, int limit) {
        int total = (int) sheepRepository.count();
        Pageable pageable = PageRequest.of(page-1, limit);
        Page<Sheep> sheep= sheepRepository.findAll(pageable);
        List<SheepDTO> sheepDTOS= sheep.stream()
                    .map(sheepMapper::mapToDTO)
                    .toList();
        return new PaginateDTO<SheepDTO>(page,limit,total,sheepDTOS);
    }

    public Sheep find(Integer id) {
        return sheepRepository.findById(id).orElse(null);
    }

    @Transactional
    public Sheep save(SheepRequest sheepRequest) {
        Category category = categoryService.find(sheepRequest.category());
        Sheep sheep = new Sheep();
        sheep.setNumber(sheepRequest.number());
        sheep.setAge(sheepRequest.age());
        sheep.setStatus(sheepRequest.status());
        sheep.setWeight(sheepRequest.weight());
        sheep.setSale(null);
        sheep.setCategory(category);
        return sheepRepository.save(sheep);
    }

    @Transactional
    public Sheep update(Integer sheepId, SheepRequest sheepRequest) {
        Sheep sheep = sheepRepository.findById(sheepId)
                .orElseThrow(() -> new RuntimeException("Sheep not found"));
        Category category = categoryService.find(sheepRequest.category());
        if (sheepRequest.number() != null) sheep.setNumber(sheepRequest.number());
        if (sheepRequest.weight() != null) sheep.setWeight(sheepRequest.weight());
        if (sheepRequest.status()!= null) sheep.setStatus(sheepRequest.status());
        if (sheepRequest.age() != null) sheep.setAge(sheepRequest.age());
        if (category!= null) sheep.setCategory(category);
        return sheepRepository.save(sheep);
    }

    @Transactional
    public ResponseEntity<Object> delete(Integer id) {
        Optional<Sheep> sheep = sheepRepository.findById(id);
        if (sheep.isPresent()){
            sheepRepository.deleteById(id);
            return ResponseEntity.ok("Deleted successfully");
        }
        return new ResponseEntity<>("Cannot delete undefined Sheep" , HttpStatusCode.valueOf(404));
    }

    public void multipleDelete(List<Integer> ids){
        ids.forEach(this::delete);
    }
}
