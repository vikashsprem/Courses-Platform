import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="p-4 border-b-2 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold">
          <Link to="/">Manage Courses</Link>
        </div>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-black hover:text-gray-700 hover:underline">Student Dashboard</Link>
          <Link to="/" className="text-black hover:text-gray-700 hover:underline">Course List</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
