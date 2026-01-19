package com.ocms.onlinecoursemanagement.serviceImpl;

import com.ocms.onlinecoursemanagement.entity.Course;
import com.ocms.onlinecoursemanagement.entity.Payment;
import com.ocms.onlinecoursemanagement.entity.User;
import com.ocms.onlinecoursemanagement.repository.PaymentRepository;
import com.ocms.onlinecoursemanagement.service.CourseService;
import com.ocms.onlinecoursemanagement.service.EnrollmentService;
import com.ocms.onlinecoursemanagement.service.PaymentService;
import com.ocms.onlinecoursemanagement.service.UserService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CourseService courseService;

    @Autowired
    private UserService userService;

    @Autowired
    private EnrollmentService enrollmentService;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    @Override
    public PaymentIntent createPaymentIntent(Long courseId, Long userId) throws StripeException {
        Course course = courseService.getCourseById(courseId);
        User user = userService.getUserById(userId);

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) (course.getPrice() * 100)) // Amount in cents
                .setCurrency("usd")
                .putMetadata("courseId", courseId.toString())
                .putMetadata("userId", userId.toString())
                .build();

        PaymentIntent intent = PaymentIntent.create(params);

        // Pre-save payment as PENDING
        Payment payment = Payment.builder()
                .user(user)
                .course(course)
                .amount(course.getPrice())
                .currency("usd")
                .paymentIntentId(intent.getId())
                .paymentStatus("PENDING")
                .build();
        paymentRepository.save(payment);

        return intent;
    }

    @Override
    public Payment savePayment(String paymentIntentId, String status) {
        List<Payment> payments = paymentRepository.findByPaymentIntentId(paymentIntentId);
        if (payments.isEmpty()) {
            throw new RuntimeException("Payment record not found for intent: " + paymentIntentId);
        }
        Payment payment = payments.get(0);
        payment.setPaymentStatus(status);

        if ("SUCCESS".equalsIgnoreCase(status)) {
            enrollmentService.enrollUser(payment.getUser().getId(), payment.getCourse().getId());
        }

        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getUserPayments(Long userId) {
        return paymentRepository.findByUserId(userId);
    }
}
