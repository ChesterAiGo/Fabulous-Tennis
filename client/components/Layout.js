import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import {isAuth, logout} from '../helpers/auth';
// import {useState, useEffect} from 'react';

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Layout = ({children}) => {

  const head = () => (
    <React.Fragment>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossOrigin="anonymous" />
      <link rel="stylesheet" href="/static/css/styles.css" />
    </React.Fragment>
  );

  // const [loginName, setLoginName] = useState("Login")


  const nav = () => (
    <ul className="nav nav-tabs bg-warning">


      <li className="nav-item">
        <Link href="/">
          <a className="nav-link text-dark">Home</a>
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/user/link/create">
          <a className="btn btn-success nav-link text-dark" style={{borderRadius: '0px'}}>Submit a link</a>
        </Link>
      </li>


      {
        !isAuth() && (
          <React.Fragment>
            <li className="nav-item ms-auto">
              <Link href="/login">
                 <a className="nav-link text-dark">Login</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/register">
                <a className="nav-link text-dark">Register</a>
              </Link>
            </li>
          </React.Fragment>
        )
      }

      {
        isAuth() && isAuth().role == 'admin' && (
          <li className="nav-item ms-auto">
            <Link href="/admin">
              <a suppressHydrationWarning={true} className="nav-link text-dark">{isAuth().name}</a>
            </Link>
          </li>
        )
      }

      {
        isAuth() && isAuth().role == 'subscriber' && (
          <li className="nav-item ms-auto">
            <Link href="/user">
              <a suppressHydrationWarning={true} className="nav-link text-dark">{isAuth().name}</a>
            </Link>
          </li>
        )

      }

      {
        isAuth() && (
          <li className="nav-item">
            <a suppressHydrationWarning={true} onClick={logout} className="nav-link text-dark">Logout</a>
          </li>
        )
      }

    </ul>
  )

  return <React.Fragment>
    {head()}
    {
      nav()
    }
    <div className="container pt-5 pb-5">
      {children}
    </div>
  </React.Fragment>
}


export default Layout;
