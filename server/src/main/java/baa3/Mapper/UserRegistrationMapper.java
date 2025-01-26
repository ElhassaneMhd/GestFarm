package baa3.Mapper;

import baa3.Dto.Auth.RegistrationRequestDto;
import baa3.Dto.Auth.RegistrationResponseDto;
import baa3.Model.User;
import org.springframework.stereotype.Component;

@Component
public class UserRegistrationMapper {

    public RegistrationRequestDto toEntity(RegistrationRequestDto registrationRequestDto) {
        final var user = new User();

        user.setEmail(registrationRequestDto.email());
        user.setUsername(registrationRequestDto.username());
        user.setPassword(registrationRequestDto.password());

        return registrationRequestDto;
    }

    public RegistrationResponseDto toRegistrationResponseDto(
            final User user) {

        return new RegistrationResponseDto(
                user.getEmail(), user.getUsername());
    }

}