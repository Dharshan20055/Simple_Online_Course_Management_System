import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Checkout = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [enrolling, setEnrolling] = useState(false);
    const { user, token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/courses/${courseId}`)
            .then(res => setCourse(res.data))
            .catch(err => console.error('Error fetching course:', err));
    }, [courseId]);

    const handleEnroll = async () => {
        setEnrolling(true);
        try {
            // Direct enrollment without payment
            await axios.post(
                `http://localhost:8080/api/enrollments?userId=${user.id}&courseId=${courseId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Successfully enrolled in the course!');
            navigate('/my-courses');
        } catch (err) {
            console.error('Enrollment error:', err);
            alert(err.response?.data?.message || 'Failed to enroll. You might already be enrolled.');
            setEnrolling(false);
        }
    };

    if (!course) return <div className="text-center py-5">Loading course details...</div>;

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <h3 className="card-title fw-bold mb-4">Enroll in Course</h3>
                            <div className="mb-4">
                                <h5>{course.title}</h5>
                                <p className="text-muted">{course.description}</p>
                                <div className="d-flex justify-content-between py-3 border-top border-bottom">
                                    <span className="fw-bold">Price:</span>
                                    <span className="fw-bold text-success">${course.price}</span>
                                </div>
                            </div>
                            <button
                                className="btn btn-primary w-100"
                                onClick={handleEnroll}
                                disabled={enrolling}
                            >
                                {enrolling ? 'Enrolling...' : 'Enroll Now (Free)'}
                            </button>
                            <button
                                className="btn btn-outline-secondary w-100 mt-2"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
