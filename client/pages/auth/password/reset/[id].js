import Router, {withRouter} from 'next/router';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {showSuccessMessage, showErrorMessage} from '../../../../helpers/alerts';
import {API} from '../../../../config';
import jwt from 'jsonwebtoken';
import Layout from '../../../../components/Layout';


const ResetPassword = ({router}) => {
  const [state, setState] = useState({
    name: '',
    token: '',
    newPassword: '',
    buttonText: 'Reset Password',
    success: '',
    error: ''
  });

  const {name, token, newPassword, buttonText, success, error} = state;

  useEffect(() => {
    const decoded = jwt.decode(router.query.id); // because of [id].js
    if (decoded) {
      setState({...state, name: decoded.name, token: router.query.id});
    }
  }, [router]); // dependencies


  const handleChange = e => {
    setState({...state, newPassword: e.target.value, success: '', error: ''});
  }

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log('post email to', email);
    setState({...state, buttonText: 'Sending'});
    try {

      const response = await axios.put(`${API}reset-password`, {resetPasswordLink: token, newPassword: newPassword});

      setState({
        ...state,
        newPassword: '',
        buttonText: 'Done',
        success: response.data.message
      });
    } catch (error) {
      setState({
        ...state,
        buttonText: 'Reset Passowrd',
        error: error.response.data.error
      });
    }
  }

  const passwordResetForm = () => (
    <form onSubmit={handleSubmit}>
      <div div className="from-group">
        <input type="password" className="form-control mb-2" onChange={handleChange} value={newPassword} placeholder="Your new password" required />
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
          <h1>Hi {name}, reset your password below</h1>
          <br />
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          {passwordResetForm()}
        </div>
      </div>
    </Layout>
  )

};

export default withRouter(ResetPassword);
