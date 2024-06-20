import axios from 'axios';
import { setCourses,setEnrolledCourses,updateCourseStatus,updateCourseLike } from '../reducers/courseReducer';

export const fetchCourses = () => async dispatch => {
  try {
    const response = await axios.get('http://localhost:5000/courses');
    dispatch(setCourses(response.data));
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};

export const fetchEnrolledCourses = () => async dispatch => {
  try{
    const response = await axios.get('http://localhost:5000/enrolledCourses');
    dispatch(setEnrolledCourses(response.data));
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
  }
}

export const markCourseCompleted = (id) => (dispatch, getState) => {
  const { course: { enrolledCourses } } = getState();
  const updatedCourses = enrolledCourses.map(course => 
    course.id === id ? { ...course, completed: !course.completed } : course
  );

  dispatch(updateCourseStatus(updatedCourses));
};


// Likes handle 🎁 for showcasing proficiency.
export const fetchCourseLikes = () => async dispatch => {
  try {
    const response = await axios.get(`http://localhost:5000/courses`);
    response.data.forEach(course => {
      dispatch(updateCourseLike({ courseId: course.id, like: course.like }));
    });
  } catch (error) {
    console.error('Error fetching course likes:', error);
  }
};