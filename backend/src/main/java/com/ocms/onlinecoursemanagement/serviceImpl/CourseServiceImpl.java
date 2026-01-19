package com.ocms.onlinecoursemanagement.serviceImpl;

import com.ocms.onlinecoursemanagement.entity.Course;
import com.ocms.onlinecoursemanagement.repository.CourseRepository;
import com.ocms.onlinecoursemanagement.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Long id, Course courseDetails) {
        Course course = getCourseById(id);
        course.setTitle(courseDetails.getTitle());
        course.setDescription(courseDetails.getDescription());
        course.setPrice(courseDetails.getPrice());
        course.setDuration(courseDetails.getDuration());
        course.setCategory(courseDetails.getCategory());
        course.setThumbnailUrl(courseDetails.getThumbnailUrl());
        course.setPublished(courseDetails.isPublished());
        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    @Override
    public List<Course> getAllPublishedCourses() {
        return courseRepository.findByPublishedTrue();
    }

    @Override
    public List<Course> getCoursesByInstructor(Long instructorId) {
        return courseRepository.findByInstructorId(instructorId);
    }

    @Override
    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
    }
}
