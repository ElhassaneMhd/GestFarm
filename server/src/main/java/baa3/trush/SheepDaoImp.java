//package baa3.Dao;
//
//import baa3.Entity.Sheep;
//import jakarta.persistence.Entity;
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.TypedQuery;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public class SheepDaoImp implements SheepDAO {
//    private final EntityManager entityManager;
//
//
//    @Autowired
//    public SheepDaoImp(EntityManager entityManager) {
//        this.entityManager = entityManager;
//    }
//
//    @Override
//    public List<Sheep> getAll() {
//        TypedQuery<Sheep> theQuery = entityManager.createQuery("from Sheep", Sheep.class);
//        return  theQuery.getResultList();
//    }
//
//    @Override
//    public Sheep getById(int id) {
//        return entityManager.find(Sheep.class, id);
//    }
//
//    @Override
//    public Sheep save(Sheep sheep) {
//        Sheep dbSheep = entityManager.merge(sheep);
//
//        return dbSheep;
//    }
//
//    @Override
//    public void delete(int id) {
//        entityManager.remove(entityManager.find(Sheep.class, id));
//    }
//}
