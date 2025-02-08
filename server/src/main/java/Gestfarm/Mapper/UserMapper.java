package Gestfarm.Mapper;

import Gestfarm.Dto.UserDTO;
import Gestfarm.Model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO mapToDto(User user){
        UserDTO userDto = new UserDTO();
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole());
        userDto.setPhone(user.getPhone());
        userDto.setCreatedAt(user.getCreatedAt());
        return userDto;
    }



}