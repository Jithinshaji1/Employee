import { Link } from 'react-router-dom';
import './CSS/NavBar.css'

const NavBar = () => {
    const name = localStorage.getItem('username');

    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <ul className='list'>
                    <li className='list-item'>
                        <Link to='/home'> @EMP</Link>
                    </li>
               
                <li className='list-item'>
                    <Link to='/employeelist'>Employee List</Link>
                </li>
            </ul>
            </div>
            <div className='navbar-right'>
                <ul className='list'>
                    <div><p>{name}im</p></div>
                    <li className='list-item'><Link to='/logout'>Logout</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;
