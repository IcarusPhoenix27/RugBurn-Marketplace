import { Fragment } from 'react';
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as RugLogo } from '../../assets/crown.svg'
import './navigation.styles.scss';

const Navigation = () => {
    return (
      <Fragment>
        <div className='navigation'>
        <Link className='logo-container' to='/'>
            <RugLogo className='logo'/>
          <div></div>
      </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
              Shop
          </Link>
          <Link className='nav-link' to='/sign-in'>
          Sign In
          </Link>
          </div>
      </div>
      <Outlet />
    </Fragment>
    )
  }
  export default Navigation;