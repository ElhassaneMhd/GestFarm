package Gestfarm.Mapper;

import Gestfarm.Dto.Request.SaleRequest;
import Gestfarm.Dto.SaleDTO;
import Gestfarm.Dto.SheepDTO;
import Gestfarm.Model.Sale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SaleMapper {
    private final SheepMapper sheepMapper;

    @Autowired
    public SaleMapper(SheepMapper sheepMapper) {
        this.sheepMapper = sheepMapper;
    }

    public SaleDTO mapToDto(Sale sale){
        SaleDTO saleDto = new SaleDTO();
        saleDto.setId(sale.getId());
        saleDto.setName(sale.getName());
        saleDto.setAmount(sale.getAmount());
        List<SheepDTO> sheepDTOs = sale.getSheep().stream()
                .map(sheepMapper::mapToDTO)
                .toList();
        saleDto.setSheep(sheepDTOs);
        return saleDto;
    }
}
