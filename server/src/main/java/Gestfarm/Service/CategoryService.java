package Gestfarm.Service;

import Gestfarm.Model.Category;
import Gestfarm.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;


    public Category find(int id){
        return categoryRepository.findById(id);
    }
}
