package Gestfarm.Dto.Request;

import Gestfarm.Model.Category;

public record SheepRequest(Integer number ,
                           Integer price ,
                           Integer weight,
                           Category category) {
}

