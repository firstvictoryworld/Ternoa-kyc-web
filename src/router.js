import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// import { css } from "@emotion/core";
// import ClipLoader from "react-spinners/ClipLoader";

// import Pacman from './assets/images/pacman-1.gif'
import KycPallete from './assets/images/kyc-pallete.gif'

import {
  loginStatus
} from './redux/actions';
//===============================================
//               IMPORT COMPONENTS
//===============================================
// import Loading from '../../shared/components/loading';
// import Layout from '../Layout/index';
// import MainWrapper from './MainWrapper';
//===============================================
//               IMPORT SCREENS
//===============================================
import SignIn from './views/Account/SignIn';
import SignUp from './views/Account/SignUp';
import Merci from './views/Account/Merci';

import KycDone from './views/Presale/KycDone';
import KycStart from './views/Presale/KycStart';
import Wallet from './views/Presale/Wallet';
import NFTWallet from './views/Presale/NFTWallet';

const wrappedRoutes = () => (
  <Switch>
    <Route path="/merci" component={Merci} />
    <Route path="/kyc-step-2" component={KycDone} />
    <Route path="/kyc-step-1" component={KycStart} />
    <Route path="/wallet" component={Wallet} />
    <Route path="/nft-wallet" component={NFTWallet} />
  </Switch>
);

function PrivateRoute ({component: Component, user, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => (authed && user && user.validated) === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/log_in', state: {from: props.location}}} />}
    />
  )
}

const AppRouter = (props) => {
  const history = useHistory();
  const { t } = useTranslation('common');
  const { i18n } = useTranslation('common');
  const { authed, onCheckLoginStatus, authenticatingUser, user, loading } = props;
  const consentBtnStyle = { color: "#F29FFF", background: "#141452", borderRadius: 4, fontSize: "13px", marginRight: 100 };
  
  useEffect(() => {
    if(!authenticatingUser && authed) {
      onCheckLoginStatus(history);    
    }
  }, []);
  

  return (
    <Router>
        <div className="App">
          {
            loading &&
            <div className="loader-wrapper">
              {
                <img src={KycPallete} alt="img here" height={140} style={{opacity: "1"}}/>
              }
            </div>
          }
          <CookieConsent
            location="bottom"
            buttonText={t('ternoaCookieButtonText')}
            cookieName="ternoaCookieConsent"
            style={{ background: "#05043E" }}
            buttonStyle={consentBtnStyle}
            expires={150}
          >
            {t('ternoaCookieTitle')}
          </CookieConsent>
          
          <Switch>
              <Route exact path="/" component={SignUp} />
              <Route exact path="/sign_up" component={SignUp} />
              <Route exact path="/log_in" component={SignIn} />              
              <PrivateRoute authed={authed} user={user} path='/' component={wrappedRoutes} />
          </Switch>        
        </div>
    </Router>
  )
};

const mapStateToProps = ({auth, global}) => {
  // ...
  // console.log(auth)
  const { isLogged, checkingUserStatus, user } = auth;
  const { isFetching } = global;
  return {
    authed: isLogged,
    user,
    authenticatingUser: checkingUserStatus,
    loading: isFetching
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCheckLoginStatus: (history) => dispatch(loginStatus(history))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);