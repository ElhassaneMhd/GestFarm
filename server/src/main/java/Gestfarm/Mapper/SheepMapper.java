package Gestfarm.Mapper;

import Gestfarm.Dto.SheepDTO;
import Gestfarm.Model.Sheep;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class SheepMapper {

    public SheepDTO mapToDTO(Sheep sheep) {
        SheepDTO sheepDTO = new SheepDTO();
        sheepDTO.setId(Optional.of(sheep.getId()));
        sheepDTO.setNumber(Optional.of(sheep.getNumber()));
        sheepDTO.setPrice(Optional.of(sheep.getPrice()));
        sheepDTO.setWeight(Optional.of(sheep.getWeight()));
        sheepDTO.setStatus(Optional.ofNullable(sheep.getStatus()));
        // Include the category name
        if (sheep.getCategory() != null) {
            sheepDTO.setCategory(Optional.of(sheep.getCategory()));
            sheepDTO.setCategoryName(Optional.ofNullable(sheep.getCategory().getName()));
        }
        if (sheep.getSale() !=null){

            sheepDTO.setSale(Optional.of(sheep.getSale()));
        }
        return sheepDTO;
    }
}
