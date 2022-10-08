import {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import axios from 'axios';
import {API} from '../config';
import Link from 'next/link';
import moment from 'moment';

const Main = ({categories}) => {

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    loadPopular()
  }, []);


  const loadPopular = async () => {
    const response = await axios.get(`${API}link/popular`);
    setPopular(response.data);
  };

  const handleClick = async linkId => {
      const response = await axios.put(`${API}click-count`, { linkId });
      loadPopular();
  };

  const listOfLinks = () =>
      popular.map((l, i) => (
          <div key={i} className="row alert alert-secondary p-2">
              <div className="col-md-8" onClick={() => handleClick(l._id)}>
                  <a href={l.url} target="_blank">
                      <h5 className="pt-2">{l.title}</h5>
                      <h6 className="pt-2 text-danger" style={{ fontSize: '12px' }}>
                          {l.url}
                      </h6>
                  </a>
              </div>

              <div className="col-md-4 pt-2">
                  <span className="pull-right">
                      {moment(l.createdAt).fromNow()} by {l.postedBy.name}
                  </span>
              </div>

              <div className="col-md-12">
                  <span className="badge text-dark">
                      {l.type} {l.medium}
                  </span>
                  {l.categories.map((c, i) => (
                      <span key={i} className="badge text-success">
                          {c.name}
                      </span>
                  ))}
                  <span className="badge text-secondary pull-right">{l.clicks} clicks</span>
              </div>
          </div>
      ));


  const listCategories = () => {
    return (categories.map((c, i) => (
      <Link href={`/links/${c.slug}`}>
      <a key={c.name} style={{border: '1px solid red'}} className="bg-light p-2 col-md-6">
        <div>
          <div className="row">
            <div className="col-md-6">
              <img className="pr-3" src={c.image && c.image.url} alt={c.name} style={{width: '300px', height: 'auto'}} />
            </div>

            <div className="col-md-6 d-flex align-items-center justify-content-center">
             <h3><p className="text-center">{c.name}</p></h3>
          </div>
          </div>
        </div>
      </a>
      </Link>
    )))
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <h1 className="font-weight-bold">The "Big Four"</h1>
          <br />
        </div>
      </div>
      <div className="row">
        {listCategories()}
      </div>

      <div className="row pt-5">
        <h2 className="font-weight-bold pb-3">
          Most Popular Videos
        </h2>
        <div className="col-md-12 overflow-hidden">
          {listOfLinks()}
        </div>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

// server side rendering
Main.getInitialProps = async () => {
  const response = await axios.get(`${API}categories`);
  return {
    categories: response.data
  };
}


export default Main;
