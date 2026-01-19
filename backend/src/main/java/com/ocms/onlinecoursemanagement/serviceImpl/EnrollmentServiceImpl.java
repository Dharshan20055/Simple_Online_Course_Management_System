package com.ocms.onlinecoursemanagement.serviceImpl;

import com.ocms.onlinecoursemanagement.entity.Course;
import com.ocms.onlinecoursemanagement.entity.Enrollment;
import com.ocms.onlinecoursemanagement.entity.User;
import com.ocms.onlinecoursemanagement.repository.EnrollmentRepository;
import com.ocms.onlinecoursemanagement.service.CourseService;
import com.ocms.onlinecoursemanagement.service.EnrollmentService;
import com.ocms.onlinecoursemanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CourseService courseService;

    @Override
    public Enrollment enrollUser(Long userId, Long courseId) {
        User user = userService.getUserById(userId);
        Course course = courseService.getCourseById(courseId);

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .status("ACTIVE")
                .build();
        return enrollmentRepository.save(enrollment);
    }

    @Override
    public List<Enrollment> getUserEnrollments(Long userId) {
        return enrollmentRepository.findByUserId(userId);
    }

    @Override
    public boolean isEnrolled(Long userId, Long courseId) {
        return enrollmentRepository.findByUserIdAndCourseId(userId, courseId).isPresent();
    }
}
