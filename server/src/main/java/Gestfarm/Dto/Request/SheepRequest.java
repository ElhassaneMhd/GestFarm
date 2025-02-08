package Gestfarm.Dto.Request;

import Gestfarm.Enum.SheepStatus;
import Gestfarm.Model.Category;

public record SheepRequest(Integer number ,
                           Integer price ,
                           Integer weight,
                           SheepStatus status,
                           Category category
) {
}

