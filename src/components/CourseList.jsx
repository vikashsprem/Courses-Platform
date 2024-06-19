import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../store/actions/courseActions';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const dispatch = useDispatch();
  const courseList = useSelector(state => state.course.courseList);

  // State for search input and filtered courses
  const [searchInput, setSearchInput] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    dispatch(fetchCourses());
    const intervalId = setInterval(() => {
      dispatch(fetchCourses());
    }, 100);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  // Update filteredCourses whenever courseList changes
  useEffect(() => {
    setFilteredCourses(courseList);
  }, [courseList]);

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    filterCourses(e.target.value);
  };

  // Function to filter courses based on search input
  const filterCourses = (searchTerm) => {
    if (!searchTerm) {
      setFilteredCourses(courseList);
    } else {
      const filtered = courseList.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.enrollmentStatus.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  return (

    <>
      <div className="text-center mt-7">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchInput}
          onChange={handleSearchInputChange}
          className="shadow appearance-none border border-black rounded w-1/2 py-2 px-3 text-gray-700"
        />
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Course List</h2>
        <div className='overflow-y-auto max-h-screen'>
          {filteredCourses && filteredCourses.length > 0 ? (
            <ul className="space-y-4">
              {filteredCourses.map(course => (
                <li key={course.id} className=" shadow-md rounded-md p-4 md:flex bg-gray-200 block">
                  <img src={course.thumbnail} alt={course.name} className="w-60 h-60 rounded-md mr-4 md:text-center p-5" />
                  <div className="flex-1 w-fit md:w-1/2 p-5">
                    <h3 className="text-xl font-semibold">{course.name}</h3>
                    <p><strong>Instructor:</strong> {course.instructor}</p>
                    <p><strong>Description:</strong> {course.description}</p>
                    <p><strong>Enrollment Status:</strong> {course.enrollmentStatus}</p>
                    <p><strong>Duration:</strong> {course.duration}</p>
                    <p><strong>Schedule:</strong> {course.schedule}</p>
                    <p><strong>Location:</strong> {course.location}</p>
                    <p><strong>Prerequisites:</strong> {course.prerequisites.join(', ')}</p>
                    <p>Number of likes: {course.like}</p>
                    <Link to={`/courses/${course.id}`} className="text-blue-500 hover:underline">View Details</Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No courses available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseList;
