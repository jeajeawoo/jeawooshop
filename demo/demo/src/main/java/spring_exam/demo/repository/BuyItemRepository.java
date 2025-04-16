package spring_exam.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import spring_exam.demo.entity.BuyItem;

import java.util.ArrayList;
import java.util.List;

public interface BuyItemRepository extends JpaRepository<BuyItem,Long> {
    @Override
    ArrayList<BuyItem> findAll();

    ArrayList<BuyItem> findByMemberId(Long memberid);

    List<BuyItem> findByMemberIdAndItemTitle(Long memberId, String item);
}
