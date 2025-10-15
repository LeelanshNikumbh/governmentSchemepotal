package com.example.myapp.model;


import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@Entity
@Table(name = "scholarships")
public class Scholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    @Column(name = "short_description")
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String description;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<String> eligibility;

    @Column(nullable = false)
    private String benefit;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<String> documents;

    @Column(name = "application_process", columnDefinition = "TEXT")
    private String applicationProcess;

    private String deadline;

    private String website;

    private String department;

    private String contact;

    private String color;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<Map<String, String>> faqs;

    @OneToMany(mappedBy = "scholarship", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookMark> bookmarks = new ArrayList<>();

    // Add helper method
    
    // Constructors
    public Scholarship() {}

    public Scholarship(String title, String category, String shortDescription, String description,
            List<String> eligibility, String benefit, List<String> documents,
            String applicationProcess, String deadline, String website,
            String department, String contact, String color, List<Map<String, String>> faqs) {
        this.title = title;
        this.category = category;
        this.shortDescription = shortDescription;
        this.description = description;
        this.eligibility = eligibility;
        this.benefit = benefit;
        this.documents = documents;
        this.applicationProcess = applicationProcess;
        this.deadline = deadline;
        this.website = website;
        this.department = department;
        this.contact = contact;
        this.color = color;
        this.faqs = faqs;
    }

    // Getters and Setters
    public void addBookmark(BookMark bookmark) {
        bookmarks.add(bookmark);
        bookmark.setScholarship(this);
    }

    public void removeBookmark(BookMark bookmark) {
        bookmarks.remove(bookmark);
        bookmark.setScholarship(null);
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<String> getEligibility() { return eligibility; }
    public void setEligibility(List<String> eligibility) { this.eligibility = eligibility; }
    public String getBenefit() { return benefit; }
    public void setBenefit(String benefit) { this.benefit = benefit; }
    public List<String> getDocuments() { return documents; }
    public void setDocuments(List<String> documents) { this.documents = documents; }
    public String getApplicationProcess() { return applicationProcess; }
    public void setApplicationProcess(String applicationProcess) { this.applicationProcess = applicationProcess; }
    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public List<Map<String, String>> getFaqs() { return faqs; }
    public void setFaqs(List<Map<String, String>> faqs) { this.faqs = faqs; }
}