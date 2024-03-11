import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Student from './Components/Student';
import Admin from './Components/Admin';
import CourseUpload from './Components/CourseUpload';
import AllCources from './Components/AllCources';
import OptedCourse from './Components/OptedCourse';
import Lecture from './Components/Lecture';
import Assignment from './Components/Assignment';
import UploadAssignment from './Components/UploadAssignment';
import UploadLecture from './Components/UploadLecture';

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
        <Route path='/lecture' element={<Lecture/>}/>
        <Route path='/assignment' element={<Assignment/>}/>
        <Route path='/uploadassignment' element={<UploadAssignment/>}/>
        <Route src="uploadlecture" element={<UploadLecture/>}/>
      </Routes>
    </Router>
  );
}

export default AllRoute;