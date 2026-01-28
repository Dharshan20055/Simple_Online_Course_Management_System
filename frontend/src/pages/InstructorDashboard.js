import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newCourse, setNewCourse] = useState({
        title: '', description: '', price: '', duration: '', category: '',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
        published: true
    });
    const { user, token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.id) {
            fetchCourses();
        }
    }, [user, token]);

    const fetchCourses = () => {
        if (!user || !user.id) return;
        axios.get(`http://localhost:8080/api/courses/instructor/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setCourses(res.data))
            .catch(err => console.error("Error fetching instructor courses:", err));
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const courseData = {
                ...newCourse,
                price: parseFloat(newCourse.price), // Ensure price is a number
                instructor: { id: user.id }
            };

            console.log("Sending course data:", courseData);

            await axios.post('http://localhost:8080/api/courses', courseData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Course added successfully!");
            setShowForm(false);
            fetchCourses();
            setNewCourse({
                title: '', description: '', price: '', duration: '', category: '',
                thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
                published: true
            });
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || err.message || "Unknown error";
            alert(`Failed to add course: ${errorMessage}`);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            await axios.delete(`http://localhost:8080/api/courses/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCourses();
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-3">
                    <button className="btn btn-outline-secondary" onClick={() => navigate('/login')}>
                        <i className="bi bi-arrow-left me-2"></i>Back to Login
                    </button>
                    <h2 className="fw-bold mb-0">Instructor Dashboard</h2>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Course'}
                </button>
            </div>

            {showForm && (
                <div className="card shadow-sm border-0 mb-4">
                    <div className="card-body p-4">
                        <h4 className="mb-4">Create New Course</h4>
                        <form onSubmit={handleAddCourse}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Category</label>
                                    <input type="text" className="form-control" value={newCourse.category} onChange={e => setNewCourse({ ...newCourse, category: e.target.value })} required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Price ($)</label>
                                    <input type="number" className="form-control" value={newCourse.price} onChange={e => setNewCourse({ ...newCourse, price: e.target.value })} required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Duration</label>
                                    <input type="text" className="form-control" value={newCourse.duration} onChange={e => setNewCourse({ ...newCourse, duration: e.target.value })} required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows="3" value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} required></textarea>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-success">Create Course</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white rounded shadow-sm overflow-hidden">
                <table className="table table-hover mb-0">
                    <thead className="table-light">
                        <tr>
                            <th className="px-4">Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Enrolled</th>
                            <th className="text-end px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course.id}>
                                <td className="px-4 fw-bold">{course.title}</td>
                                <td>{course.category}</td>
                                <td>${course.price}</td>
                                <td>-</td>
                                <td className="text-end px-4">
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(course.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InstructorDashboard;
