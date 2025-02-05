package Gestfarm.Mapper;

import Gestfarm.Dto.Auth.RegistrationRequestDto;
import Gestfarm.Dto.Auth.RegistrationResponseDto;
import Gestfarm.Model.User;
import Gestfarm.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserRegistrationMapper {
    @Autowired
    private UserService userService;

    public RegistrationRequestDto toEntity(RegistrationRequestDto registrationRequestDto) {
        final var user = new User();

        user.setEmail(registrationRequestDto.email());
        user.setUsername(registrationRequestDto.username());
        user.setPassword(registrationRequestDto.password());
        user.setPhone(registrationRequestDto.phone());
        return registrationRequestDto;
    }

    public RegistrationResponseDto toRegistrationResponseDto(
            final RegistrationRequestDto request) {

        User user = new User();
        user.setEmail(request.email());
        user.setUsername(request.username());
        user.setPassword(request.password());
        String str = String.valueOf(userService.verify(user));

            return new RegistrationResponseDto(
                user.getEmail(), user.getUsername(), str,"User registered successfully",200);
    }

}