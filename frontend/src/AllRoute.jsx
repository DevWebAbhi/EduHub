import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Student from './Components/Student';
import Admin from './Components/Admin';
import CourseUpload from './Components/CourseUpload';
import AllCources from './Components/AllCources';
import OptedCourse from './Components/OptedCourse';

const AllRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<Student />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/admin/course_upload' element={<CourseUpload/>} />
        <Route path='/allcources' element={<AllCources/>}/>
        <Route path='/opted' element={<OptedCourse/>}/>
      </Routes>
    </Router>
  );
}

export default AllRoute;