package Gestfarm.Dto;

import Gestfarm.Model.Category;
import Gestfarm.Model.Sale;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
