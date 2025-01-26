package baa3.Dto.Auth;

// RegistrationRequestDto.java
public record RegistrationRequestDto(
        String username,
        String email,
        String password
) {
}
