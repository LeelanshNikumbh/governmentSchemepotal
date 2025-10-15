package com.example.myapp.controller;

import com.example.myapp.model.Scholarship;
import org.springframework.http.ResponseEntity;
import com.example.myapp.repository.ScholarshipRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;



@RestController
@RequestMapping("/api/scholarships")
public class ScholarshipController {
    @Autowired
    private ScholarshipRepository repository;

    @GetMapping
    public List<Scholarship> getAllScholarships() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<Scholarship> createScholarship(@RequestBody Scholarship scholarship) {
        Scholarship savedScholarship = repository.save(scholarship);
        return ResponseEntity.ok(savedScholarship);
    }

    @PostMapping("/{search}")
    public ResponseEntity<Scholarship> getTitle(@RequestBody TitleRequest request) {
        System.out.println(request.getTitle());
        return repository.findByTitle(request.getTitle())
            .map(scholarship -> ResponseEntity.ok(scholarship))
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {

        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

static class TitleRequest {
    private String title;
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
}
}