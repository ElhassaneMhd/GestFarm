package Gestfarm.Dto.Request;

import lombok.Data;


import java.util.List;

public record SaleRequest(    List<SheepRequest> sheep)  {
}
