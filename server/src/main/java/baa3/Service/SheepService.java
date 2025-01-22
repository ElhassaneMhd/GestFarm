package baa3.Service;


import baa3.Entity.Sheep;

import java.util.List;

public interface SheepService {
    List<Sheep> getAll();
    Sheep getById(int id);
    Sheep save(Sheep sheep);
    void delete(int id);
}
