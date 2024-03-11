import React from 'react'
import {
    Box,
    useMediaQuery
    } from '@chakra-ui/react'
import StudentNavbar from './StudentNavbar';
const optedCourse = () => {
    const selector=useSelector(store=>store.optinCourseReducer);
    const dispatch=useDispatch();

        const [isLargerThan1100] = useMediaQuery('(min-width: 1100px)');
        const [isLargerThan730] = useMediaQuery('(min-width: 730px)');
        const [isLargerThan540] = useMediaQuery('(min-width: 540px)');

  return (
    <Box>
       <StudentNavbar/>
       <Box display={"grid"} gridTemplateColumns={isLargerThan1100?"repeat(3,1fr)":isLargerThan730?"repeat(2,1fr)":"repeat(1,1fr)"} margin={"auto"} gridGap={"2rem"} marginTop={"2rem"} width={"max-content"}>
        {
            selector.Data?selector.Data.map((e,idx)=>(
                <CourseCard key={idx} data={e} />
            )):<></>
        }
        </Box> 
    </Box>
  )
}

export default optedCourse
