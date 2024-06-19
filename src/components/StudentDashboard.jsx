import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, markCourseCompleted } from '../store/actions/courseActions';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(state => state.course.enrolledCourses);

  const calculateDueDate = (startDate, durationInWeeks) => {
    const start = new Date(startDate);
    const dueDate = new Date(start);
    dueDate.setDate(start.getDate() + durationInWeeks * 7);
    const day = dueDate.getDate().toString().padStart(2, '0');
    const month = (dueDate.getMonth() + 1).toString().padStart(2, '0');
    const year = dueDate.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleMarkCompleted = (id) => {
    dispatch(markCourseCompleted(id));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
      {enrolledCourses && enrolledCourses.length > 0 ? (
        <ul className="space-y-4">
          {enrolledCourses.map(course => (
            <li key={course.id} className="bg-white shadow-md rounded-md p-4 flex">
              <img src={course.thumbnail} alt={course.name} className="w-40 h-40 rounded-md mr-4" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{course.name}</h3>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Enrollment Date:</strong> {formatDate(course.enrollmentDate)}</p>
                <p><strong>Due Date:</strong> {calculateDueDate(course.enrollmentDate, parseInt(course.duration.split(' ')[0]))}</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${course.completed? 100: Math.floor(Math.random() * 100) + 1}%` }}></div>
                </div>
                <button 
                  onClick={() => handleMarkCompleted(course.id)}
                  className={`px-4 py-2 rounded-md text-white ${course.completed ? 'bg-green-500' : 'bg-blue-500'}`}>
                  {course.completed ? 'Completed' : 'Mark as Completed'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No enrolled courses available.</p>
      )}
    </div>
  );
};

export default StudentDashboard;
