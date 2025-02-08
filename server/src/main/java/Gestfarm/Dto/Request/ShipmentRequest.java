package Gestfarm.Dto.Request;

import Gestfarm.Enum.ShipmentStatus;
import Gestfarm.Model.Sale;

import java.sql.Date;


public record ShipmentRequest(String name, String address,String phone,
                              String email, ShipmentStatus status,
                              Date shippingDate,Sale sale
) {
}