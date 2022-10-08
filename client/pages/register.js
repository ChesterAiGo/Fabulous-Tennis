import {useState, useEffect} from 'react'
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import axios from 'axios'
import Router from 'next/router';
// import {showSuccessMessage, showErrorMessage} from '../helpers/alerts';
import {API} from '../config';
import {isAuth} from '../helpers/auth';
const alertHelper = require('../helpers/alerts');

const Register = () => {

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: '',
    buttonText: 'Register',
    loadedCategories: [],
    categories: []
  });

  const {name, email, password, error, success, buttonText, loadedCategories, categories} = state;

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  useEffect(() => {
      loadCategories();
  }, []);

  const loadCategories = async () => {
      const response = await axios.get(`${API}/categories`);
      setState({ ...state, loadedCategories: response.data });
  };

  const handleToggle = c => () => {
      // return the first index or -1
      const clickedCategory = categories.indexOf(c);
      const all = [...categories];

      if (clickedCategory === -1) {
          all.push(c);
      } else {
          all.splice(clickedCategory, 1);
      }
      console.log('all >> categories', all);
      setState({ ...state, categories: all, success: '', error: '' });
  };


  // show categories > checkbox
  const showCategories = () => {
      return (
          loadedCategories &&
          loadedCategories.map((c, i) => (
              <li className="list-unstyled" key={c._id}>
                  <input type="checkbox" onChange={handleToggle(c._id)} className="mr-2" />
                  <label className="form-check-label ms-2">{c.name}</label>
              </li>
          ))
      );
  };

  const handleChange = name => e => {
      setState({ ...state, [name]: e.target.value, error: '', success: '', buttonText: 'Register' });
  };

  const handleSubmit = async e => {
      e.preventDefault();
      console.table({
          name,
          email,
          password,
          categories
      });
      setState({ ...state, buttonText: 'Registering' });
      try {
          const response = await axios.post(`${API}register`, {
              name,
              email,
              password,
              categories
          });
          console.log(response);
          setState({
              ...state,
              name: '',
              email: '',
              password: '',
              buttonText: 'Submitted',
              success: response.data.message
          });
      } catch (error) {
          console.log(error);
          setState({ ...state, buttonText: 'Register', error: error.response.data.error });
      }
  };


  const registerForm = () => (
      <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
              <input
                  value={name}
                  onChange={handleChange('name')}
                  type="text"
                  className="form-control"
                  placeholder="Type your name"
                  required
              />
          </div>
          <div className="form-group mb-2">
              <input
                  value={email}
                  onChange={handleChange('email')}
                  type="email"
                  className="form-control"
                  placeholder="Type your email"
                  required
              />
          </div>
          <div className="form-group mb-2">
              <input
                  value={password}
                  onChange={handleChange('password')}
                  type="password"
                  className="form-control"
                  placeholder="Type your password"
                  required
              />
          </div>

          <div className="form-group">
              <label className="text-muted ms-4">Favourite Players</label>
              <ul style={{ maxHeight: '100px', overflowY: 'scroll' }}>{showCategories()}</ul>
          </div>

          <div className="form-group">
              <button className="btn btn-outline-warning">{buttonText}</button>
          </div>
      </form>
  );

  return (
    <Layout>

    <div className="col-md-6 offset-md-3">
      <h1>Register</h1>
      <br />
      {success && alertHelper.showSuccessMessage(success)}
      {error && alertHelper.showErrorMessage(error)}
      {registerForm()}
    </div>
  </Layout>
  );
}

export default Register;
