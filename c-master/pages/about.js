import Layout from '../components/MyLayout.js';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../store/store';
import PageWithIntl from '../components/PageWithIntl';

const About = () => (
  <Layout>
    <style>
      {`
        p {
          margin: 20px;
          padding: 20px;
        }
      `}
    </style>
    <p>
      
    </p>
  </Layout>
);

export default withRedux(initStore, null, null)(PageWithIntl(About));
