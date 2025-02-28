package Gestfarm.Repository;

import Gestfarm.Model.Sheep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SheepRepository extends JpaRepository<Sheep, Integer> {

    @Transactional
    @Modifying
    @Query("UPDATE Sheep s SET s.category = NULL WHERE s.category.id = :categoryId")
    void setCategoryToNull(Integer categoryId);

    @Transactional
    @Modifying
    @Query("UPDATE Sheep s SET s.sale = NULL WHERE s.sale.id = :saleId")
    void setSaleToNull(Integer saleId);
}
