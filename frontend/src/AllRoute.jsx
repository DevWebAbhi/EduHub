import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Student from './Components/Student';
import Admin from './Components/Admin';
import CourseUpload from './Components/CourseUpload';

const AllRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<Student />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/admin/course_upload' element={<CourseUpload/>} />
      </Routes>
    </Router>
  );
}

export default AllRoute;