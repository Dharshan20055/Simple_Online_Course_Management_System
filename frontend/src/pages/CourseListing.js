import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CourseListing = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/courses')
            .then(res => setCourses(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2 className="mb-4">All Courses</h2>
            <div className="row g-4">
                {courses.map(course => (
                    <div key={course.id} className="col-md-4">
                        <div className="card h-100 shadow-sm border-0">
                            <img
                                src={course.thumbnailUrl || 'https://via.placeholder.com/300x200?text=Course+Thumbnail'}
                                className="card-img-top"
                                alt={course.title}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold">{course.title}</h5>
                                <p className="card-text text-muted flex-grow-1">
                                    {course.description.substring(0, 100)}...
                                </p>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="h5 mb-0 text-primary fw-bold">${course.price}</span>
                                    <Link to={`/course/${course.id}`} className="btn btn-outline-primary btn-sm">View Details</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseListing;
