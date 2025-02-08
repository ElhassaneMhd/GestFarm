package Gestfarm.Dto.Request;

import Gestfarm.Enum.ShipmentStatus;
import Gestfarm.Model.Sale;
import lombok.Data;

import java.sql.Date;

@Data
public class ShipmentRequest {
     private String name;
     private String address;
     private String phone;
     private String email;
     private ShipmentStatus status;
     private Date shippingDate;
     private Sale sale;
}