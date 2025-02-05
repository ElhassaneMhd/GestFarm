package Gestfarm.Dto.Auth;

import lombok.AllArgsConstructor;

public record AuthenticationRequestDto(
        String username,
        String password
) {
}

