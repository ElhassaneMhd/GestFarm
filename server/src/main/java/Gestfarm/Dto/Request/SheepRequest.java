package Gestfarm.Dto.Request;

import Gestfarm.Enum.SheepAge;
import Gestfarm.Enum.SheepStatus;

public record SheepRequest(Integer number ,
                           Integer price ,
                           Integer weight,
                           SheepAge age,
                           SheepStatus status,
                           Integer category
) {
}

