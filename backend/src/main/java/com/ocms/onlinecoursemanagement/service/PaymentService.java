package com.ocms.onlinecoursemanagement.service;

import com.ocms.onlinecoursemanagement.entity.Payment;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import java.util.List;

public interface PaymentService {
    PaymentIntent createPaymentIntent(Long courseId, Long userId) throws StripeException;

    Payment savePayment(String paymentIntentId, String status);

    List<Payment> getUserPayments(Long userId);
}
