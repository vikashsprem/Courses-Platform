import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCourse, enrollInCourse } from '../store/reducers/courseReducer';
import { fetchCourses } from '../store/actions/courseActions';

const CourseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedCourse = useSelector(state => state.course.selectedCourse);
  const courseList = useSelector(state => state.course.courseList);
  const enrolledCourses = useSelector(state => state.course.enrolledCourses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCourse?.id !== id) {
      const course = courseList.find(course => course.id === id);
      dispatch(selectCourse(course));
    }
  }, [dispatch, id, selectedCourse, courseList]);

  const handleEnroll = () => {
    const currentDate = new Date();
    const enrollmentDate = currentDate.toISOString();

    const alreadyEnrolled = enrolledCourses.some(course => course.id === id);
    if (alreadyEnrolled) {
      alert("You are already enrolled in this course.");
      return;
    }

    dispatch(enrollInCourse({ courseId: id, enrollmentDate }));
    alert("Course Enrolled Successfully");
  };
  

  if (!selectedCourse) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className='block md:flex gap-5 h-fit'>
        <div className='md:w-1/3 w-fit border border-gray-150 m-5 text-center p-5'>
          <img src={selectedCourse.thumbnail} alt={selectedCourse.name} className="object-cover rounded-md mb-4" />
          <button
            className="text-black"
            onClick={handleEnroll}
            disabled={selectedCourse.enrollmentStatus !== 'Open'}
          >
            {selectedCourse.enrollmentStatus === 'Open' ? (
              <span className='bg-green-500 p-3 px-20 rounded-md'>Enroll</span>
            ) : selectedCourse.enrollmentStatus === 'Closed' ? (
              <span className='bg-red-500 p-3 px-20 rounded-md w-3/4'>Closed</span>
            ) : selectedCourse.enrollmentStatus === 'In Progress' ? (
              <span className='bg-yellow-500 p-3 px-20 rounded-md w-3/4'>In Progress</span>
            ) : (
              <span className='bg-gray-300 p-3 px-20 rounded-md w-3/4'>Unknown Status</span>
            )}
          </button>
        </div>
        <div className='md:w-2/3 w-fit m-5'>
          <h2 className="text-2xl font-bold mb-4">{selectedCourse.name}</h2>
          <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
          <p><strong>Description:</strong> {selectedCourse.description}</p>
          <p><strong>Enrollment Status:</strong> {selectedCourse.enrollmentStatus}</p>
          <p><strong>Duration:</strong> {selectedCourse.duration}</p>
          <p><strong>Schedule:</strong> {selectedCourse.schedule}</p>
          <p><strong>Location:</strong> {selectedCourse.location}</p>
          <p><strong>Prerequisites:</strong> {selectedCourse.prerequisites.join(', ')}</p>
          <h3 className="text-xl font-semibold mt-4">Syllabus</h3>
          <div className='overflow-y-auto max-h-60'>
            {selectedCourse.syllabus.map((week, index) => (
              <div key={index} className="mt-2 bg-gray-200 p-2">
                <p><strong>Week {week.week}:</strong> {week.topic}</p>
                <p>{week.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold mt-4">Enrolled Students</h3>
      {selectedCourse.students && selectedCourse.students.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {selectedCourse.students.map(student => (
            <li key={student.id} className="bg-gray-100 p-2 rounded-md">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No students enrolled.</p>
      )}
    </div>
  );
};

export default CourseDetails;
