import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import SignUpForm from '../components/User/SignUpForm';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { loadFavoriteMovieAction } from '../actions/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';

const SingUp = () => {
  const { signUpDone, loginDone } = useSelector((state) => state.user);

  useEffect(() => {
    if (signUpDone || loginDone) {
      Router.replace('/');
    }
  }, [signUpDone, loginDone]);

  return (
    <Layout PageName="회원가입">
      <SignUpForm />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(loadFavoriteMovieAction());
    context.store.dispatch(END);
    await context.store['sagaTask'].toPromise();
  }
);

export default SingUp;
