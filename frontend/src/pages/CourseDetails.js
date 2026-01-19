import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const { isAuthenticated, user, token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/courses/${id}`)
            .then(res => setCourse(res.data));

        if (isAuthenticated) {
            axios.get(`http://localhost:8080/api/enrollments/check?userId=${user.id}&courseId=${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => setIsEnrolled(res.data));
        }
    }, [id, isAuthenticated, user, token]);

    if (!course) return <div className="text-center py-5">Loading...</div>;

    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <div className="row">
                <div className="col-md-8">
                    <h1 className="fw-bold mb-3">{course.title}</h1>
                    <p className="text-muted mb-4">{course.category} | {course.duration}</p>
                    <img
                        src={course.thumbnailUrl || 'https://via.placeholder.com/800x400?text=Course+Thumbnail'}
                        className="img-fluid rounded mb-4"
                        alt={course.title}
                    />
                    <h3 className="mb-3">Course Description</h3>
                    <p style={{ whiteSpace: 'pre-line' }}>{course.description}</p>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 sticky-top" style={{ top: '2rem' }}>
                        <div className="card-body text-center p-4">
                            <h2 className="fw-bold text-primary mb-3">${course.price}</h2>
                            {user && user.role === 'INSTRUCTOR' ? (
                                <div className="alert alert-info">
                                    <small>You are an instructor. Students can enroll in this course.</small>
                                </div>
                            ) : isEnrolled ? (
                                <button className="btn btn-success w-100 disabled">Already Enrolled</button>
                            ) : (
                                <button
                                    className="btn btn-primary w-100 btn-lg"
                                    onClick={() => isAuthenticated ? navigate(`/checkout/${course.id}`) : navigate('/login')}
                                >
                                    Enroll Now
                                </button>
                            )}
                            <ul className="list-unstyled mt-4 text-start small">
                                <li>✅ Full lifetime access</li>
                                <li>✅ Access on mobile and TV</li>
                                <li>✅ Certificate of completion</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
