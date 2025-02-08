package Gestfarm.Dto.Auth;

// RegistrationRequestDto.java
public record RegistrationRequest(
        String username,
        String email,
        String password,
        String phone,
        String passwordConfirmation,
        String role
) {

}
