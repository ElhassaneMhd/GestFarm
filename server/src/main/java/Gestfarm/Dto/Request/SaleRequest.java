package Gestfarm.Dto.Request;

import lombok.Data;


import java.util.List;

@Data
public class SaleRequest {
    List<SheepRequest> sheep;
}
