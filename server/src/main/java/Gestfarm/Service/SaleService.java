package Gestfarm.Service;

import Gestfarm.Dto.Request.SaleRequest;
import Gestfarm.Dto.Request.SheepRequest;
import Gestfarm.Model.Sale;
import Gestfarm.Model.Sheep;
import Gestfarm.Repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SaleService {


    private final SaleRepository saleRepository;
    private final SheepService sheepService;

    @Autowired
    public SaleService(SaleRepository saleRepository, SheepService sheepService) {
        this.saleRepository = saleRepository;
        this.sheepService = sheepService;
    }

    public List<Sale> findAll(){
        return saleRepository.findAll();
    }

    public Optional<Sale> findById(int id){
        return saleRepository.findById(id);
    }

    public Sale createSale(SaleRequest saleRequest){
        Sale sale = new Sale();
        List<Sheep> sheepList = new ArrayList<>();
        for (SheepRequest sheepRequest : saleRequest.getSheep()) {
            Sheep sheep = sheepService.find(sheepRequest.getId());
            // Associate the Sheep with the Shipment
            sheepList.add(sheep);
        }
        sale.setSheep(sheepList);
        return sale;
    }
}
