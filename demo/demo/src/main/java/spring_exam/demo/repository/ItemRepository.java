package spring_exam.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import spring_exam.demo.entity.Item;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item,Long> {
    @Override
    List<Item> findAll();
}
