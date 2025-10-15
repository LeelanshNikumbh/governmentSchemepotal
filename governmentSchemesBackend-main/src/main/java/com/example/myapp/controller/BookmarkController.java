package com.example.myapp.controller;

import com.example.myapp.model.BookMark;
import com.example.myapp.model.Users;
import com.example.myapp.model.Scholarship;
import com.example.myapp.repository.BookMarkRepository;
import com.example.myapp.repository.ScholarshipRepository;
import com.example.myapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    @Autowired
    private BookMarkRepository bookmarkRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScholarshipRepository scholarshipRepository;

    // Create a new bookmark
    @PostMapping
    public ResponseEntity<BookMark> createBookmark(@RequestBody BookmarkRequest request) {
        System.out.println(request);
        System.out.println(request.getUserId());
        System.out.println(request.getScholarshipId());
        Users user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Scholarship scholarship = scholarshipRepository.findById(request.getScholarshipId())
            .orElseThrow(() -> new RuntimeException("Scholarship not found"));

        BookMark bookmark = new BookMark(user, scholarship);
        return ResponseEntity.ok(bookmarkRepository.save(bookmark));
    }

    @GetMapping("/user/{userId}")
    public List<BookMark> getUserBookmarks(@PathVariable Long userId) {
        return bookmarkRepository.findByUserId(userId);
    }


    // ...existing code...

@DeleteMapping("/user/{userId}/scholarship/{scholarshipId}")
public ResponseEntity<Void> deleteBookmark(@PathVariable Long userId, @PathVariable Long scholarshipId) {
    if (!userRepository.existsById(userId)) {
        return ResponseEntity.notFound().build();
    }

    List<BookMark> bookmarks = bookmarkRepository.findByUserId(userId);
    BookMark bookmarkToDelete = bookmarks.stream()
        .filter(b -> b.getScholarship().getId().equals(scholarshipId))
        .findFirst()
        .orElse(null);

    if (bookmarkToDelete != null) {
        bookmarkRepository.delete(bookmarkToDelete);
        return ResponseEntity.ok().build();
    }

    return ResponseEntity.notFound().build();
}

// ...existing code...


    @GetMapping("/user/scholarships/{userId}")
    public ResponseEntity<List<Long>> getUserBookmarkedScholarshipIds(@PathVariable Long userId) {
        if (!userRepository.existsById(userId)) {
            return ResponseEntity.notFound().build();
        }

        List<Long> scholarshipIds = bookmarkRepository.findByUserId(userId)
                .stream()
                .map(bookmark -> bookmark.getScholarship().getId())
                .toList();

        return ResponseEntity.ok(scholarshipIds);
    }
}

// Request DTO for creating bookmarks
class BookmarkRequest {
    private Long userId;
    private Long scholarshipId;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getScholarshipId() {
        return scholarshipId;
    }

    public void setScholarshipId(Long scholarshipId) {
        this.scholarshipId = scholarshipId;
    }
}