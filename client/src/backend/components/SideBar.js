import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const SideBar = () => {
  const location = useLocation()
  const { pathname } = location
  const splitUrl = pathname.split('/')
  return (
    <aside className='main-sidebar sidebar-dark-primary elevation-4'>
      {/* Brand Logo */}
      <Link to='/' className='brand-link'>
        {/* <img src="/%PUBLIC_URL%/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} /> */}
        <span className='brand-text font-weight-light'>SkyBook</span>
      </Link>
      {/* Sidebar */}
      <div className='sidebar'>
        {/* Sidebar user panel (optional) */}
        <div className='user-panel mt-3 pb-3 mb-3 d-flex'>
          <div className='image'>
            {/* <img src="/%PUBLIC_URL%/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" /> */}
          </div>
          <div className='info'>
            <a href='#' className='d-block'>
              Admin
            </a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className='mt-2'>
          <ul
            className='nav nav-pills nav-sidebar flex-column'
            data-widget='treeview'
            role='menu'
            data-accordion='false'
          >
            {/* Add icons to the links using the .nav-icon class
                    with font-awesome or any other icon font library */}
            <li className='nav-item has-treeview menu-open'>
              <Link
                to='/admin/dashboard'
                className={
                  splitUrl[1] === 'admin' && splitUrl[2] === 'dashboard'
                    ? 'active nav-link'
                    : 'nav-link'
                }
              >
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>Dashboard</p>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/admin/user'
                className={
                  splitUrl[1] === 'admin' && splitUrl[2] === 'user'
                    ? 'active nav-link'
                    : 'nav-link'
                }
              >
                <i className='nav-icon fas fa-users' />
                <p>Users</p>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/admin/profession'
                className={
                  splitUrl[1] === 'admin' && splitUrl[2] === 'profession'
                    ? 'active nav-link'
                    : 'nav-link'
                }
              >
                <i className='nav-icon far fa-user' />
                <p>Professions</p>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/admin/smileySticker'
                className={
                  splitUrl[1] === 'admin' && splitUrl[2] === 'smileySticker'
                    ? 'active nav-link'
                    : 'nav-link'
                }
              >
                <i className='nav-icon fas fa-grin-squint' />
                <p>Smilies & Stickers</p>
              </Link>
            </li>
            <li
              className='nav-item has-treeview'
              className={
                splitUrl[1] === 'admin' &&
                (splitUrl[2] === 'guidelines' ||
                  splitUrl[2] === 'contactus' ||
                  splitUrl[2] === 'aboutus')
                  ? 'nav-item has-treeview menu-open'
                  : 'nav-item'
              }
            >
              <Link to='#' className='nav-link'>
                <i className='nav-icon fas fa-copy' />
                <p>
                  CMS
                  <i className='fas fa-angle-left right' />
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link
                    to='/admin/guidelines'
                    className={
                      splitUrl[1] === 'admin' && splitUrl[2] === 'guidelines'
                        ? 'active nav-link'
                        : 'nav-link'
                    }
                  >
                    <i className='nav-icon fas fa-edit' />
                    <p>Guidelines</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/admin/contactus'
                    className={
                      splitUrl[1] === 'admin' && splitUrl[2] === 'contactus'
                        ? 'active nav-link'
                        : 'nav-link'
                    }
                  >
                    <i className='nav-icon fa fa-edit' />
                    <p>Contact Us</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/admin/aboutus'
                    className={
                      splitUrl[1] === 'admin' && splitUrl[2] === 'aboutus'
                        ? 'active nav-link'
                        : 'nav-link'
                    }
                  >
                    <i className='nav-icon fas fa-edit' />
                    <p>About Us</p>
                  </Link>
                </li>
              </ul>
            </li>
            {console.log(
              '0',
              splitUrl[0],
              '1',
              splitUrl[1],
              '2',
              splitUrl[2],
              '3',
              splitUrl[3]
            )}
            <li
              className={
                splitUrl[1] === 'admin' &&
                splitUrl[2] === 'helpAndSupport' &&
                (splitUrl[3] === 'viewAllReportMessages' ||
                  splitUrl[3] === 'viewAllReportTypes')
                  ? 'nav-item has-treeview menu-open'
                  : 'nav-item'
              }
            >
              <Link to='#' className='nav-link'>
                <i className='nav-icon fas fa-copy' />
                <p>
                  Help & Support
                  <i className='fas fa-angle-left right' />
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link
                    to='/admin/helpAndSupport/viewAllReportMessages'
                    className={
                      splitUrl[1] === 'admin' &&
                      splitUrl[2] === 'helpAndSupport' &&
                      splitUrl[3] === 'viewAllReportMessages'
                        ? 'active nav-link'
                        : 'nav-link'
                    }
                  >
                    <i className='nav-icon fas fa-edit' />
                    <p>View Report Messages</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/admin/helpAndSupport/viewAllReportTypes'
                    className={
                      splitUrl[1] === 'admin' &&
                      splitUrl[2] === 'helpAndSupport' &&
                      splitUrl[3] === 'viewAllReportTypes'
                        ? 'active nav-link'
                        : 'nav-link'
                    }
                  >
                    <i className='far fa-circle nav-icon' />
                    <p>Manage Report Type</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={
                splitUrl[1] === 'admin' &&
                splitUrl[2] === 'company' &&
                (splitUrl[3] === 'manage' || splitUrl[3] === 'category')
                  ? 'nav-item has-treeview menu-open'
                  : 'nav-item'
              }
            >
              <Link to='#' className='nav-link'>
                <i className='nav-icon fas fa-home' />
                <p>
                  Company
                  <i className='fas fa-angle-left right' />
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link
                    to='/admin/company/manage'
                    className={
                      splitUrl[1] === 'admin' &&
                      splitUrl[2] === 'company' &&
                      splitUrl[3] === 'manage'
                        ? 'active nav-link'
                        : 'nav-link'
                    }
                  >
                    <i className='fa fa-home nav-icon' />
                    <p>Manage Companies</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/admin/company/category'
                    className={
                      splitUrl[1] === 'admin' &&
                      splitUrl[2] === 'company' &&
                      splitUrl[3] === 'category'
                        ? 'active nav-link'
                        : 'nav-link'
                    }
                  >
                    <i className='nav-icon fas fa-list-alt' />
                    <p> Manage Category </p>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={
                splitUrl[1] === 'admin' &&
                splitUrl[2] === 'company' &&
                (splitUrl[3] === 'manage' || splitUrl[3] === 'category')
                  ? 'nav-item has-treeview menu-open'
                  : 'nav-item'
              }
            >
              <Link to='#' className='nav-link'>
                <i className='nav-icon fas fa-comments' />
                <p>
                  Chat & messages
                  <i className='fas fa-angle-left right' />
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link
                    to='/admin/chat/groups'
                    className={
                      splitUrl[1] === 'admin' &&
                      splitUrl[2] === 'chat' &&
                      splitUrl[3] === 'groups'
                        ? 'active nav-link'
                        : 'nav-link'
                    }
                  >
                    <i className='fa fa-comments nav-icon' />
                    <p>Chat Groups</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/admin/company/category'
                    className={
                      splitUrl[1] === 'admin' &&
                      splitUrl[2] === 'company' &&
                      splitUrl[3] === 'category'
                        ? 'active nav-link'
                        : 'nav-link'
                    }
                  >
                    <i className='nav-icon fas fa-list-alt' />
                    <p> Manage Category </p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  )
}
export default SideBar
