package baa3.Controller;

import baa3.Repository.SheepRepository;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/sheep")
public class SheepController {

    private final SheepRepository sheepRepository;

    public SheepController(SheepRepository sheepRepository) {
        this.sheepRepository = sheepRepository;
    }




}
