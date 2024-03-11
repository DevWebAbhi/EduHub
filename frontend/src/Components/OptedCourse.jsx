import React, { useEffect } from 'react';
import {
    Box,
    Heading,
    useMediaQuery
} from '@chakra-ui/react';
import StudentNavbar from './StudentNavbar';
import OptedCourseCard from './OptedCourseCard';
import { useDispatch, useSelector } from "react-redux";
import {getData} from "../Redux/optinCource/action";
const OptedCourse = () => {
    const optedCoursesIds = useSelector(store => store.optinCourseReducer.Data);
    const allCourses = useSelector(store => store.allCourcesReducer.Data);
    const dispatch=useDispatch();

    const [isLargerThan1100] = useMediaQuery('(min-width: 1100px)');
    const [isLargerThan730] = useMediaQuery('(min-width: 730px)');
    const [isLargerThan540] = useMediaQuery('(min-width: 540px)');

    useEffect(()=>{
        console.log(optedCoursesIds);
        console.log(allCourses);
        dispatch(getData());
    },[])

    return (
        <Box>
            <StudentNavbar />
            <Heading textAlign={"center"} marginTop={"1rem"} marginBottom={"2rem"}>Enrolled Courses</Heading>
            <Box
                display={"grid"}
                gridTemplateColumns={isLargerThan1100 ? "repeat(3,1fr)" : isLargerThan730 ? "repeat(2,1fr)" : "repeat(1,1fr)"}
                margin={"auto"}
                gridGap={"2rem"}
                marginTop={"2rem"}
                width={"max-content"}
            >
                {optedCoursesIds.map((optedCourseId, idx) => {
                    const course = allCourses.find(course => course._id == optedCourseId);
                    if (course) {
                        return <OptedCourseCard key={idx} data={course} />;
                    } else {
                        return <></>; // Or render a placeholder component
                    }
                })}
            </Box>
        </Box>
    );
};

export default OptedCourse;