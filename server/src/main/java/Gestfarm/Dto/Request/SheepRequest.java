package Gestfarm.Dto.Request;


import lombok.Data;

@Data
public class SheepRequest {
    private int id;
    private int number;
    private int price;
    private int weight;
    private String status;
    private int amount;
    private int categoryId;
}

