package Gestfarm.Dto.Request;

import Gestfarm.Model.Permission;

import java.util.List;

public record RoleRequest(int id, List<Permission> permissions ) {
}
