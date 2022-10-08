import Router from 'next/router';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts';
import {API} from '../../../config';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer';



const ForgotPassowrd = () => {
  const [state, setState] = useState({
    email: '',
    buttonText: 'Forgot Password',
    success: '',
    error: ''
  });

  const {email, buttonText, success, error} = state;

  const handleChange = e => {
    setState({...state, email: e.target.value, success: '', error: ''});
  }

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log('post email to', email);
    try {
      const response = await axios.put(`${API}forgot-password`, {email});

      setState({
        ...state,
        email: '',
        buttonText: 'Done',
        success: response.data.message
      });
    } catch (error) {
      setState({
        ...state,
        buttonText: 'Forgot Passowrd',
        error: error.response.data.error
      });
    }
  }

  const passwordForgotForm = () => (
    <form onSubmit={handleSubmit}>
      <div div className="from-group">
        <input type="email" className="form-control mb-2" onChange={handleChange} value={email} placeholder="Your email" required />
      </div>
      <div div className="from-group">
        <button className="form-control btn btn-outline-warning">{buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Forget Password</h1>
          <br />
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          {passwordForgotForm()}
        </div>
      </div>

    </Layout>
  )

};


export default ForgotPassowrd;
