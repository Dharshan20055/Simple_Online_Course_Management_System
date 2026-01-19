# Online Course Management System (OCMS)

Full-stack Online Course Management System built with Spring Boot, React, and MySQL. Features role-based authentication (Student/Instructor/Admin), course creation & enrollment, JWT security, and Bootstrap UI.

## 🚀 Features

- **Role-Based Access Control**: Student, Instructor, and Admin roles
- **Course Management**: Instructors can create, update, and delete courses
- **Student Enrollment**: Students can browse and enroll in courses
- **JWT Authentication**: Secure authentication and authorization
- **RESTful API**: Clean REST API architecture
- **Responsive UI**: Bootstrap-based responsive design

## 🛠️ Tech Stack

### Backend
- Spring Boot 3.x
- Spring Security with JWT
- Spring Data JPA / Hibernate
- MySQL Database
- Maven

### Frontend
- React.js
- Redux (State Management)
- React Router
- Axios
- Bootstrap

## 📦 Installation

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6+

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Update `application.properties` with your MySQL credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/onlinecoursefinal?createDatabaseIfNotExist=true
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

3. Run the backend:
```bash
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Frontend will start on `http://localhost:3000`

## 👤 Default Users

The system comes with pre-configured test accounts:

- **Admin**: `admin@test.com` / `admin123`
- **Instructor**: `instructor@test.com` / `inst123`
- **Student**: `student@test.com` / `student123`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/{id}` - Get course by ID
- `POST /api/courses` - Create course (Instructor/Admin)
- `PUT /api/courses/{id}` - Update course (Instructor/Admin)
- `DELETE /api/courses/{id}` - Delete course (Instructor/Admin)

### Enrollments
- `GET /api/enrollments/user/{userId}` - Get user enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments/check` - Check enrollment status

## 🎯 Usage

1. **Students** can:
   - Browse available courses
   - Enroll in courses
   - View enrolled courses in "My Courses"

2. **Instructors** can:
   - Create new courses
   - Manage their courses
   - View all courses

3. **Admins** have full access to all features

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Your Name - [Your GitHub Profile](https://github.com/yourusername)
