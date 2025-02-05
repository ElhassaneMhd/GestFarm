package Gestfarm.Dto;

import Gestfarm.Model.Category;
import Gestfarm.Model.Sale;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Data
public class SheepDTO {
    private Optional<Integer> number;
    private Optional<Integer> price;
    private Optional<Integer> id;
    private Optional<Integer> weight;
    private Optional<String> status;
    private Optional<Integer> amount;
    private Optional<String> categoryName;
    private Optional<Category> category;
    private Optional<Sale> sale;


}
