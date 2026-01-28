package com.ocms.onlinecoursemanagement.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private Double price;

    private String duration;

    private String category;

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private User instructor;

    @Column(length = 500)
    private String thumbnailUrl;

    private boolean published;

    public Course() {
    }

    public Course(Long id, String title, String description, Double price, String duration, String category,
            User instructor, String thumbnailUrl, boolean published) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.duration = duration;
        this.category = category;
        this.instructor = instructor;
        this.thumbnailUrl = thumbnailUrl;
        this.published = published;
    }

    public static CourseBuilder builder() {
        return new CourseBuilder();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public User getInstructor() {
        return instructor;
    }

    public void setInstructor(User instructor) {
        this.instructor = instructor;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public static class CourseBuilder {
        private Long id;
        private String title;
        private String description;
        private Double price;
        private String duration;
        private String category;
        private User instructor;
        private String thumbnailUrl;
        private boolean published;

        public CourseBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public CourseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public CourseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public CourseBuilder price(Double price) {
            this.price = price;
            return this;
        }

        public CourseBuilder duration(String duration) {
            this.duration = duration;
            return this;
        }

        public CourseBuilder category(String category) {
            this.category = category;
            return this;
        }

        public CourseBuilder instructor(User instructor) {
            this.instructor = instructor;
            return this;
        }

        public CourseBuilder thumbnailUrl(String thumbnailUrl) {
            this.thumbnailUrl = thumbnailUrl;
            return this;
        }

        public CourseBuilder published(boolean published) {
            this.published = published;
            return this;
        }

        public Course build() {
            return new Course(id, title, description, price, duration, category, instructor, thumbnailUrl, published);
        }
    }
}
