package Gestfarm.Dto.Auth;

// RegistrationRequestDto.java
public record RegistrationRequestDto(
        String username,
        String email,
        String password,
        String phone,
        String passwordConfirmation
) {

}
