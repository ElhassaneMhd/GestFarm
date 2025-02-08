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
        sheepDTO.setPrice(sheep.getPrice());
        sheepDTO.setWeight(sheep.getWeight());
        sheepDTO.setStatus(sheep.getStatus());
        // Include the category name
        if (sheep.getCategory() != null) {
            sheepDTO.setCategory(sheep.getCategory());
            sheepDTO.setCategoryName(sheep.getCategory().getName());
        }
        if (sheep.getSale() !=null){

            sheepDTO.setSale(sheep.getSale());
        }
        return sheepDTO;
    }
}
