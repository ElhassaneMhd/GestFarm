package Gestfarm.Dto.Auth;

// RegistrationResponseDto.java
public record RegistrationResponseDto(
        String username,
        String email,
        String token,
        String message,
        Integer status
) {
}
