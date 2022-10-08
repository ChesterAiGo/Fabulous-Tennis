import {useState, useEffect} from 'react'
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios'
import {API} from '../config';
import {authenticate, isAuth} from '../helpers/auth';
const alertHelper = require('../helpers/alerts');

const Login = () => {

  const [state, setState] = useState({
    email: '',
    password: '',
    error: '',
    success: '',
    buttonText: 'Login'
  });

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  const {email, password, error, success, buttonText} = state;

  const handleChange = (name) => (e) => {
    setState({...state, [name]: e.target.value, error: "", success: "", buttonText: "Login"})
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setState({...state, buttonText: 'Logging in'});
    try {
      const response = await axios.post(`${API}login`, {name, email, password});

      authenticate(response, () => {
        if(isAuth() && isAuth().role == 'admin') {
          return Router.push('/admin');
        }
        else {
          return Router.push('/user');
        }
      });
    } catch (error) {
      setState({...state, buttonText: 'Login', error: error.response.data.error});
    }
  }


  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="from-group">
        <input
        value={email}
        onChange={handleChange('email')}
        type="email"
        className="form-control mt-2 mb-2"
        placeholder="Type email"
        required
        />
      </div>
      <div className="from-group">
        <input
        value={password}
        onChange={handleChange('password')}
        type="password"
        className="form-control mt-2 mb-2"
        placeholder="Type password"
        required
        />
      </div>
      <div className="from-group">
        <button className="btn btn-outline-warning form-control mb-2">{state.buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>

    <div className="col-md-6 offset-md-3">
      <h1>Login</h1>
      <br />
      {success && alertHelper.showSuccessMessage(success)}
      {error && alertHelper.showErrorMessage(error)}
      {loginForm()}
      <Link href="/auth/password/forgot">
        <a className="text-danger float-end">Forgot Password</a>
      </Link>
    </div>
  </Layout>
  );
}

export default Login;
