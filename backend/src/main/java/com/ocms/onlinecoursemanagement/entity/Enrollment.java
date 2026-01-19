package com.ocms.onlinecoursemanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private LocalDateTime enrolledDate;

    private String status; // ACTIVE, CANCELLED

    public Enrollment() {
    }

    public Enrollment(Long id, User user, Course course, LocalDateTime enrolledDate, String status) {
        this.id = id;
        this.user = user;
        this.course = course;
        this.enrolledDate = enrolledDate;
        this.status = status;
    }

    public static EnrollmentBuilder builder() {
        return new EnrollmentBuilder();
    }

    @PrePersist
    protected void onEnroll() {
        enrolledDate = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public LocalDateTime getEnrolledDate() {
        return enrolledDate;
    }

    public void setEnrolledDate(LocalDateTime enrolledDate) {
        this.enrolledDate = enrolledDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public static class EnrollmentBuilder {
        private Long id;
        private User user;
        private Course course;
        private LocalDateTime enrolledDate;
        private String status;

        public EnrollmentBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public EnrollmentBuilder user(User user) {
            this.user = user;
            return this;
        }

        public EnrollmentBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public EnrollmentBuilder enrolledDate(LocalDateTime enrolledDate) {
            this.enrolledDate = enrolledDate;
            return this;
        }

        public EnrollmentBuilder status(String status) {
            this.status = status;
            return this;
        }

        public Enrollment build() {
            return new Enrollment(id, user, course, enrolledDate, status);
        }
    }
}
