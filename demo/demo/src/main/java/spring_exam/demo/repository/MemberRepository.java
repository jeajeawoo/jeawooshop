package spring_exam.demo.repository;

import org.springframework.data.repository.CrudRepository;
import spring_exam.demo.entity.Member;

import java.util.ArrayList;
import java.util.Optional;

public interface MemberRepository extends CrudRepository<Member,Long> {
    @Override
    ArrayList<Member> findAll();

    Optional<Member> findByEmail(String email);

    boolean existsByEmail(String email);
}
