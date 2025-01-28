package baa3.Mapper;

import baa3.Dto.Auth.RegistrationRequestDto;
import baa3.Dto.Auth.RegistrationResponseDto;
import baa3.Model.User;
import baa3.Service.UserService;
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
        //Authenticate user by registering

        User user = new User();
        user.setEmail(request.email());
        user.setUsername(request.username());
        user.setPassword(request.password());
        String str = String.valueOf(userService.verify(user));

        return new RegistrationResponseDto(
                user.getEmail(), user.getUsername(), str,"User registered successfully",200);
    }

}