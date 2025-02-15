package Gestfarm.Service;

import Gestfarm.Dto.Request.SheepRequest;
import Gestfarm.Dto.SheepDTO;
import Gestfarm.Mapper.SheepMapper;
import Gestfarm.Model.Category;
import Gestfarm.Model.Sheep;
import Gestfarm.Repository.SheepRepository;
import org.springframework.beans.factory.annotation.Autowired;
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


    public List<SheepDTO> findAll() {
        List<Sheep> sheepList= sheepRepository.findAll();
        return sheepList.stream()
                .map(sheepMapper::mapToDTO)
                .toList();
    }

    public Sheep find(int id) {
        return sheepRepository.findById(id).orElse(null);
    }

    @Transactional
    public Sheep save(Sheep sheep) {
        sheepRepository.save(sheep);
        return sheep;
    }

    @Transactional
    public Sheep update(int sheepId, SheepRequest sheepRequest) {
        Sheep sheep = sheepRepository.findById(sheepId)
                .orElseThrow(() -> new RuntimeException("Sheep not found"));

        if (sheepRequest.number() != null) sheep.setNumber(sheepRequest.number());
        if (sheepRequest.price() != null) sheep.setPrice(sheepRequest.price());
        if (sheepRequest.weight() != null) sheep.setWeight(sheepRequest.weight());
        if (sheepRequest.status()!= null) sheep.setStatus(sheepRequest.status());
        if (sheepRequest.age() != null) sheep.setAge(sheepRequest.age());
        if (sheepRequest.category() != null){
            Category category = categoryService.find(sheepRequest.category().getId());
            sheep.setCategory(category);
        }
        return sheepRepository.save(sheep);
    }

    public ResponseEntity<Object> delete(int id) {
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
