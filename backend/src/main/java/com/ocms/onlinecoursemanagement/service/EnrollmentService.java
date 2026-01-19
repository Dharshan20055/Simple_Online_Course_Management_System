package com.ocms.onlinecoursemanagement.service;

import com.ocms.onlinecoursemanagement.entity.Enrollment;
import java.util.List;

public interface EnrollmentService {
    Enrollment enrollUser(Long userId, Long courseId);

    List<Enrollment> getUserEnrollments(Long userId);

    boolean isEnrolled(Long userId, Long courseId);
}
