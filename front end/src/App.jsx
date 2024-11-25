import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './frontend/Home';
import Login from './frontend/Login';
import NavBar from './frontend/NavBar';
import CreateEmployee from './frontend/Createemployee';
import Register from './frontend/register';
import EmployeeTable from './frontend/EmployeList';
import Logout from './frontend/Logout';
import  Update from './frontend/update'; 
import { useLocation } from 'react-router-dom';
import'./app.css'
const App = () => {
  const location = useLocation();

  // Corrected condition for hiding the NavBar on specific routes
  const hidenavbar = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      {/* Hide the NavBar on '/' and '/login' routes */}
      {!hidenavbar && <NavBar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateEmployee />} />
        <Route path='/update' element={<Update/>}/>
        <Route path="/employeelist" element={<EmployeeTable />} />
        <Route path="/logout" element={<Logout />} />


        {/* Catch-all route (in case user accesses an undefined route) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;