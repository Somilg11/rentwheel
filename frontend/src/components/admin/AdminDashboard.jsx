// AdminDashboard.jsx
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard pt-44">
      <nav>
        <ul>
          <li><Link to="/admindashboard/vehicles">Manage Vehicles</Link></li>
          <li><Link to="/admindashboard/logs">Rental Logs</Link></li>
          <li><Link to="/admindashboard/contact">Contact Queries</Link></li>
          <li><Link to="/admindashboard/newsletter">Newsletter Subscribers</Link></li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
