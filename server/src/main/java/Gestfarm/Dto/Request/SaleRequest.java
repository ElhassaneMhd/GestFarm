package Gestfarm.Dto.Request;

import Gestfarm.Enum.SaleStatus;
import lombok.Data;


import java.util.List;

public record SaleRequest(String name ,
                          Integer amount ,
                          SaleStatus status,
                          List<Integer> sheep)  {
}
