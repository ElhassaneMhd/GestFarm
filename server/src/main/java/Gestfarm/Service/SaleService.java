package Gestfarm.Service;

import Gestfarm.Dto.Request.SaleRequest;
import Gestfarm.Dto.SaleDTO;
import Gestfarm.Enum.SheepStatus;
import Gestfarm.Mapper.SaleMapper;
import Gestfarm.Model.Sale;
import Gestfarm.Model.Sheep;
import Gestfarm.Repository.SaleRepository;
import Gestfarm.Repository.SheepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class SaleService {


    private final SaleRepository saleRepository;
    private final SheepService sheepService;
    private final SaleMapper saleMapper;
    private final SheepRepository sheepRepository;

    @Autowired
    public SaleService(SaleRepository saleRepository, SheepService sheepService, SaleMapper saleMapper, SheepRepository sheepRepository) {
        this.saleRepository = saleRepository;
        this.sheepService = sheepService;
        this.saleMapper = saleMapper;
        this.sheepRepository = sheepRepository;
    }

    public List<Sale> findAll(){
        return saleRepository.findAll();
    }

    public Sale findById(Integer id){
        return saleRepository.findById(id).orElse(null);
    }


    public ResponseEntity<Sale> save(SaleRequest saleRequest){
        ArrayList<Sheep> sheepList = new ArrayList<>();
        Integer price=0;
        Sale sale = new Sale();
        sale.setName(saleRequest.name());
        sale.setAmount(saleRequest.amount());
        sale.setStatus(saleRequest.status());
        saleRequest.sheep().forEach(id -> {
            Sheep sheep = sheepService.find(id);
            sheep.setSale(sale);
            sheep.setStatus(SheepStatus.SOLD);
            sheepList.add(sheep);
        });
        sale.setPrice(10000);
        sale.setSheep(sheepList);
        saleRepository.save(sale);
        return ResponseEntity.ok(sale);
    }

    @Transactional
    public ResponseEntity<Object> delete(Integer id) {
        Sale sale = saleRepository.findById(id).orElse(null);
        sheepRepository.setSaleToNull(id);
        if (sale != null){
            saleRepository.deleteById(id);
            return ResponseEntity.ok("Deleted successfully");
        }
        return new ResponseEntity<>("Cannot delete undefined Sale" , HttpStatusCode.valueOf(404));
    }

    @Transactional
    public void multipleDelete(List<Integer> ids){
        ids.forEach(this::delete);
    }
}
