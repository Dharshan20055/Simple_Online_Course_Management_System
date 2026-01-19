package com.ocms.onlinecoursemanagement.config;

import com.ocms.onlinecoursemanagement.entity.Course;
import com.ocms.onlinecoursemanagement.entity.Role;
import com.ocms.onlinecoursemanagement.entity.User;
import com.ocms.onlinecoursemanagement.repository.CourseRepository;
import com.ocms.onlinecoursemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private CourseRepository courseRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Override
        public void run(String... args) throws Exception {
                // Initialize Users
                if (userRepository.count() == 0) {
                        // Create Admin
                        User admin = new User();
                        admin.setName("Admin User");
                        admin.setEmail("admin@test.com");
                        admin.setPassword(passwordEncoder.encode("admin123"));
                        admin.setRole(Role.ADMIN);
                        admin.setCreatedAt(LocalDateTime.now());
                        userRepository.save(admin);

                        // Create Instructor
                        User instructor = new User();
                        instructor.setName("John Instructor");
                        instructor.setEmail("instructor@test.com");
                        instructor.setPassword(passwordEncoder.encode("inst123"));
                        instructor.setRole(Role.INSTRUCTOR);
                        instructor.setCreatedAt(LocalDateTime.now());
                        userRepository.save(instructor);

                        // Create Student
                        User student = new User();
                        student.setName("Jane Student");
                        student.setEmail("student@test.com");
                        student.setPassword(passwordEncoder.encode("student123"));
                        student.setRole(Role.STUDENT);
                        student.setCreatedAt(LocalDateTime.now());
                        userRepository.save(student);
                }

                // Initialize Courses
                if (courseRepository.count() == 0) {
                        // Fetch the Instructor to associate with courses
                        // Assuming instructor@test.com exists from the block above or previous runs
                        User instructor = userRepository.findByEmail("instructor@test.com").orElse(null);

                        // If instructor doesn't exist for some reason, we can't seed courses linked to
                        // them.
                        // In a real app, we'd handle this better, but here we assume the seeding above
                        // ran or user exists.
                        if (instructor != null) {
                                Course course1 = new Course();
                                course1.setTitle("Full Stack Java Developer");
                                course1.setDescription(
                                                "Learn Java, Spring Boot, React, and MySQL to become a full stack developer. This comprehensive course covers everything from basic Java syntax to advanced Spring Boot features and React hooks.");
                                course1.setPrice(49.99);
                                course1.setDuration("40 Hours");
                                course1.setCategory("Development");
                                course1.setInstructor(instructor);
                                course1.setThumbnailUrl(
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Java_Black_icon.svg/1200px-Java_Black_icon.svg.png");
                                course1.setPublished(true);
                                courseRepository.save(course1);

                                Course course2 = new Course();
                                course2.setTitle("React - The Complete Guide");
                                course2.setDescription(
                                                "Dive deep into React.js. Learn Hooks, Redux, React Router, and Next.js. Perfect for beginners and intermediate developers looking to master modern frontend development.");
                                course2.setPrice(39.99);
                                course2.setDuration("30 Hours");
                                course2.setCategory("Frontend");
                                course2.setInstructor(instructor);
                                course2.setThumbnailUrl(
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png");
                                course2.setPublished(true);
                                courseRepository.save(course2);

                                Course course3 = new Course();
                                course3.setTitle("Python for Data Science");
                                course3.setDescription(
                                                "Master Python specifically for Data Science. Learn NumPy, Pandas, Matplotlib, and Scikit-Learn. Build real-world projects and start your journey as a Data Scientist.");
                                course3.setPrice(59.99);
                                course3.setDuration("45 Hours");
                                course3.setCategory("Data Science");
                                course3.setInstructor(instructor);
                                course3.setThumbnailUrl(
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png");
                                course3.setPublished(true);
                                courseRepository.save(course3);

                                Course course4 = new Course();
                                course4.setTitle("AWS Certified Cloud Practitioner");
                                course4.setDescription(
                                                "Prepare for the AWS Certified Cloud Practitioner Coruse (CLF-C01). Learn cloud concepts, security, technology, and billing from the ground up.");
                                course4.setPrice(29.99);
                                course4.setDuration("15 Hours");
                                course4.setCategory("Cloud Computing");
                                course4.setInstructor(instructor);
                                course4.setThumbnailUrl(
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png");
                                course4.setPublished(true);
                                courseRepository.save(course4);
                        }
                        System.out.println("Courses Initialized Successfully");
                }
        }
}
