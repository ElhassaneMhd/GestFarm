package Gestfarm.Dto;

import java.util.List;

public class CategoryDTO {
    private int id;
    private String name;
    private List<SheepDTO> sheep;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<SheepDTO> getSheep() {
        return sheep;
    }

    public void setSheep(List<SheepDTO> sheep) {
        this.sheep = sheep;
    }

}
