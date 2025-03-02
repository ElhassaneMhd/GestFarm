package Gestfarm.Dto.Request;

import Gestfarm.Enum.SaleStatus;
import Gestfarm.Model.Sheep;
import lombok.Data;


import java.util.List;

public record SaleRequest(Integer id,
                          String name ,
                          Integer amount ,
                          SaleStatus status,
                          List<Sheep> sheep)  {
}
