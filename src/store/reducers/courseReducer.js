import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courseList: [],
  selectedCourse: null,
  enrolledCourses: [],
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourses(state, action) {
      state.courseList = action.payload;
    },
    setEnrolledCourses(state, action) {
      state.enrolledCourses = action.payload;
    },
    selectCourse(state, action) {
      state.selectedCourse = action.payload;
    },
    updateCourseStatus(state, action) {
      state.enrolledCourses = action.payload;
    },
    enrollInCourse(state, action) {
      const { courseId, enrollmentDate } = action.payload;
      const courseToEnroll = state.courseList.find(course => course.id === courseId);
      if (courseToEnroll) {
        courseToEnroll.enrollmentDate = enrollmentDate;
        courseToEnroll.enrollmentStatus = 'Enrolled';
        state.enrolledCourses.push(courseToEnroll);
      }
    },

    // Likes handle 🎁 for showcasing proficiency.
    updateCourseLike(state, action) {
      const { courseId, like } = action.payload;
      const courseToUpdate = state.courseList.find(course => course.id === courseId);
      if (courseToUpdate) {
        courseToUpdate.like = like;
      }
    },
  },
});

export const { setCourses, setEnrolledCourses, selectCourse, updateCourseStatus, enrollInCourse, updateCourseLike } = courseSlice.actions;

export default courseSlice.reducer;
