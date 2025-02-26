package Gestfarm.Mapper;

import Gestfarm.Dto.SheepDTO;
import Gestfarm.Model.Sheep;
import org.springframework.stereotype.Component;


@Component
public class SheepMapper {

    public SheepDTO mapToDTO(Sheep sheep) {
        SheepDTO sheepDTO = new SheepDTO();
        sheepDTO.setId(sheep.getId());
        sheepDTO.setNumber(sheep.getNumber());
        sheepDTO.setPrice(0);
        sheepDTO.setWeight(sheep.getWeight());
        sheepDTO.setStatus(sheep.getStatus());
        sheepDTO.setAge(sheep.getAge());
        if (sheep.getCategory() != null) {
            sheepDTO.setCategory(sheep.getCategory());
            sheepDTO.setCategoryName(sheep.getCategory().getName());
            sheepDTO.setPrice(sheep.getCategory().getPrice()*sheep.getWeight());
        }
        if (sheep.getSale() !=null){
            sheepDTO.setStatus(sheep.getStatus());
            sheepDTO.setSale(sheep.getSale());
        }
        return sheepDTO;
    }
}
