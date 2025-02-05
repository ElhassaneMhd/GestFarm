package Gestfarm.Dto;


import Gestfarm.Model.User;
import lombok.*;

import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterResponse {
    private String message;
    private String token;
    private Boolean status;
    private User user;
}
