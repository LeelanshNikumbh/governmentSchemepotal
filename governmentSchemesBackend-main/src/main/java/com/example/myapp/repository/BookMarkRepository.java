package com.example.myapp.repository;

import com.example.myapp.model.BookMark;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

public interface BookMarkRepository extends JpaRepository<BookMark, Long> {
    @Query("SELECT b FROM BookMark b JOIN FETCH b.user JOIN FETCH b.scholarship WHERE b.user.id = :userId")
    List<BookMark> findByUserId(Long userId);

    @Query("SELECT b.scholarship.id FROM BookMark b WHERE b.user.id = :userId")
    List<Long> findScholarshipIdsByUserId(Long userId);


    @Query("DELETE FROM BookMark b WHERE b.user.id = :userId AND b.scholarship.id = :scholarshipId")
    void deleteByUserIdAndScholarshipId(Long userId, Long scholarshipId);
}