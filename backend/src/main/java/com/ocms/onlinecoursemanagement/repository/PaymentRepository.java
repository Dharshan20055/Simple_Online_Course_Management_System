package com.ocms.onlinecoursemanagement.repository;

import com.ocms.onlinecoursemanagement.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserId(Long userId);

    List<Payment> findByPaymentIntentId(String paymentIntentId);
}
