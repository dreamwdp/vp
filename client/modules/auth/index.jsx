import React from 'react';
import { message } from 'antd';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import Auth from './components/Auth';

const mapStateToProps = ({user}) => {
  return {
    user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin() {
      message.error('Credential is not correct, will be continue in anonymous mode.', 2.5);
      setTimeout(function(){
        browserHistory.push('/');
      }, 3000);
    },
    onOAuth(url) {
      window.location = url;
    },
    goBack(){
    },
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
