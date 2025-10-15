package com.example.myapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import java.util.List;
import java.util.ArrayList;

@Entity
public class Users{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name ;
    private String email;
    private String password;

    public Users(){}

    public Users(String name,String password){

        this.name = name ;
        this.password = password;

    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookMark> bookmarks = new ArrayList<>();

    // Add helper method
    public void addBookmark(BookMark bookmark) {
        bookmarks.add(bookmark);
        bookmark.setUser(this);
    }

    public void removeBookmark(BookMark bookmark) {
        bookmarks.remove(bookmark);
        bookmark.setUser(null);
    }

    public Long getId() {
        return this.id;
    };
    public void setId(Long id){this.id = id;};
    public String getName(){return this.name;};
    public void setEmail(String email){ this.email = email;};
    public void setName(String name){this.name = name;};
    public String getEmail(){return this.email;};
    public String getPassword(){return this.password;};
    public void setPassword(String password){this.password = password;};


    
}
