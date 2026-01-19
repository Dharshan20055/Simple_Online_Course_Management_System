package com.ocms.onlinecoursemanagement.controller;

import com.ocms.onlinecoursemanagement.entity.Enrollment;
import com.ocms.onlinecoursemanagement.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Enrollment>> getUserEnrollments(@PathVariable Long userId) {
        return ResponseEntity.ok(enrollmentService.getUserEnrollments(userId));
    }

    @PostMapping
    public ResponseEntity<Enrollment> createEnrollment(@RequestParam Long userId, @RequestParam Long courseId) {
        return ResponseEntity.ok(enrollmentService.enrollUser(userId, courseId));
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkEnrollment(@RequestParam Long userId, @RequestParam Long courseId) {
        return ResponseEntity.ok(enrollmentService.isEnrolled(userId, courseId));
    }
}
