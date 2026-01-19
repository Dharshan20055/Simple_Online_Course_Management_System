package com.ocms.onlinecoursemanagement.controller;

import com.ocms.onlinecoursemanagement.entity.Payment;
import com.ocms.onlinecoursemanagement.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestParam Long courseId,
            @RequestParam Long userId) throws StripeException {
        PaymentIntent intent = paymentService.createPaymentIntent(courseId, userId);
        Map<String, String> responseData = new HashMap<>();
        responseData.put("clientSecret", intent.getClientSecret());
        return ResponseEntity.ok(responseData);
    }

    @PostMapping("/confirm")
    public ResponseEntity<Payment> confirmPayment(@RequestParam String paymentIntentId, @RequestParam String status) {
        return ResponseEntity.ok(paymentService.savePayment(paymentIntentId, status));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Payment>> getUserPayments(@PathVariable Long userId) {
        return ResponseEntity.ok(paymentService.getUserPayments(userId));
    }
}
