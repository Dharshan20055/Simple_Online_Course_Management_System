package com.ocms.onlinecoursemanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private Double amount;

    private String currency;

    private String paymentIntentId;

    private String paymentStatus; // SUCCESS, FAILED, PENDING

    private LocalDateTime paymentDate;

    public Payment() {
    }

    public Payment(Long id, User user, Course course, Double amount, String currency, String paymentIntentId,
            String paymentStatus, LocalDateTime paymentDate) {
        this.id = id;
        this.user = user;
        this.course = course;
        this.amount = amount;
        this.currency = currency;
        this.paymentIntentId = paymentIntentId;
        this.paymentStatus = paymentStatus;
        this.paymentDate = paymentDate;
    }

    public static PaymentBuilder builder() {
        return new PaymentBuilder();
    }

    @PrePersist
    protected void onPayment() {
        paymentDate = LocalDateTime.now();
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

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getPaymentIntentId() {
        return paymentIntentId;
    }

    public void setPaymentIntentId(String paymentIntentId) {
        this.paymentIntentId = paymentIntentId;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public static class PaymentBuilder {
        private Long id;
        private User user;
        private Course course;
        private Double amount;
        private String currency;
        private String paymentIntentId;
        private String paymentStatus;
        private LocalDateTime paymentDate;

        public PaymentBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public PaymentBuilder user(User user) {
            this.user = user;
            return this;
        }

        public PaymentBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public PaymentBuilder amount(Double amount) {
            this.amount = amount;
            return this;
        }

        public PaymentBuilder currency(String currency) {
            this.currency = currency;
            return this;
        }

        public PaymentBuilder paymentIntentId(String paymentIntentId) {
            this.paymentIntentId = paymentIntentId;
            return this;
        }

        public PaymentBuilder paymentStatus(String paymentStatus) {
            this.paymentStatus = paymentStatus;
            return this;
        }

        public PaymentBuilder paymentDate(LocalDateTime paymentDate) {
            this.paymentDate = paymentDate;
            return this;
        }

        public Payment build() {
            return new Payment(id, user, course, amount, currency, paymentIntentId, paymentStatus, paymentDate);
        }
    }
}
