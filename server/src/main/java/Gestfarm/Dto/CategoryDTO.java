package Gestfarm.Dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CategoryDTO {
    private int id;
    private String name;
    private List<SheepDTO> sheep;

}
