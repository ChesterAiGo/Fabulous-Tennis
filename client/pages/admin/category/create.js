import dynamic from 'next/dynamic';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import {API} from '../../../config';
import Layout from '../../../components/Layout';
import withAdmin from '../../withAdmin';
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts';
import 'react-quill/dist/quill.bubble.css';

const Create = ({user, token}) => {

  const [state, setState] = useState({
    name: '',
    success: '',
    error: '',
    image: '',
    buttonText: 'Create',
  });
  const [content, setContent] = useState('');
  const [imageUploadButtonName, setImageUploadButtonName] = useState('Upload image');
  const {name, success, error, image, buttonText} = state;

  const handleContent = (e) => {
    setContent(e);
    setState({...state, success:'', error: ''});
  };


  const handleChange = (name) => (e) => {
    setState({...state, [name]: e.target.value, error: "", success: ""});
  };

  const handleImage = (event) => {
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    setImageUploadButtonName(event.target.files[0].name);
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log("image content in base 64", uri);
            setState({...state, image: uri, success:"", error:""});
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log("handleImage failed", err);
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setState({...state, buttonText: 'Creating'});
    // console.log(...formData);

    try {
      const response = await axios.post(`${API}category`, {name, content, image}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('CATEGORY CREATE RESPONSE', response);
      setContent('');
      setState({...state, name: '', success: `${response.data.name} is created`, buttonText: 'Category created!'});
      setImageUploadButtonName('Upload image')
    } catch (error) {
      console.log('CATEGORY CREATE ERROR', error);
      setState({...state, buttonText: 'Create', error: error.response.data.error});
    }
  };

  const createCategoryForm = () => (
      <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label className="text-muted">Name</label>
              <input onChange={handleChange('name')} value={name} type="text" className="form-control" required />
          </div>
          <div className="form-group">
              <label className="text-muted">Content</label>
              <ReactQuill value={content} onChange={handleContent} theme="bubble" placeholder="Write something here.." style={{border: '1px solid grey'}} className='pb-5 mb-3' />
          </div>
          <div className="form-group">
              <label className="btn btn-outline-secondary">
                  {imageUploadButtonName}
                  <input
                      onChange={handleImage}
                      type="file"
                      accept="image/*"
                      className="form-control"
                      hidden
                  />
              </label>
          </div>
          <div>
              <button className="btn btn-outline-warning">{buttonText}</button>
          </div>
      </form>
  );


  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Create category</h1>
          <br />
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          {createCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default withAdmin(Create);
