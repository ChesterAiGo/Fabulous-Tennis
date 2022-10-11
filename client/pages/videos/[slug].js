import {useState, useEffect, Fragment} from 'react';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import axios from 'axios';
import {API, APP_NAME} from '../../config';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
const parse = require('html-react-parser');


const Youtube = ({url}) => {

  const videoID = url.split("v=")[1];

  const YoutubeEmbed = ( videoID ) => (
  <div className="video-responsive">
    <iframe
      width="1000"
      height="560"
      src={`https://www.youtube.com/embed/${videoID}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

  return (
    <Fragment>
      <Layout>
      <div class="d-flex justify-content-center">
        {YoutubeEmbed(videoID)}
      </div>
      </Layout>
    </Fragment>
  );
};

Youtube.getInitialProps = async ({query, req}) => {

  const response = await axios.get(`${API}video/${query.slug}`);
  console.log("RESPONSE YOUTUBE PAGE", response);

  return { url: response.data.url };
};

export default Youtube;
