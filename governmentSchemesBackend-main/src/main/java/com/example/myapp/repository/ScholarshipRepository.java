package com.example.myapp.repository;

import com.example.myapp.model.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
 Optional<Scholarship> findByTitle(String title);
}