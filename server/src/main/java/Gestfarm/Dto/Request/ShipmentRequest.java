package Gestfarm.Dto.Request;

import Gestfarm.Enum.ShipmentStatus;
import Gestfarm.Model.Sale;

import java.sql.Date;


public record ShipmentRequest(String name, String address,String phone,
                               ShipmentStatus status, Integer shipper,
                              Date shippingDate,Integer sale
) {
}