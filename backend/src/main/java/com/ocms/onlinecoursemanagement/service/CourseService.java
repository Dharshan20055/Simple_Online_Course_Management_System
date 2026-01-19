package com.ocms.onlinecoursemanagement.service;

import com.ocms.onlinecoursemanagement.entity.Course;
import java.util.List;

public interface CourseService {
    Course createCourse(Course course);

    Course updateCourse(Long id, Course course);

    void deleteCourse(Long id);

    List<Course> getAllPublishedCourses();

    List<Course> getCoursesByInstructor(Long instructorId);

    Course getCourseById(Long id);
}
