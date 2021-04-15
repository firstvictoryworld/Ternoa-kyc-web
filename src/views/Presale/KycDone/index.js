import React from 'react'
import { useLocation } from 'react-router-dom'
import { connect } from "react-redux";

import img from '../../../assets/images/Vector.png'
import Header from '../../header'
import { logoutUser } from '../../../redux/actions';
import { useTranslation } from 'react-i18next';

const getInfoBySessionId = async (history, sessionId) => {
    const headers = {
      'Api-Key': '2tNYsfio11UnpXnHo3U2PTjzDISzRPWD',
      'Session-Id': sessionId
    }
   await fetch(`https://workflow-api.synaps.io/v2/session/info?sandbox=false&alias=mika`, {
        method: 'GET',
        headers: headers
      }).then(
        response => response.json()
      ).then(res => {
        console.log(res)
        history.push('/wallet');
        return ;
      })
}

const KycDone = (props) => {
    const { history, onLogout} = props;
    const { t } = useTranslation('common');
    const search = useLocation().search;
    const sessionId = new URLSearchParams(search).get('sess-id');

    const onStartKyc = () => {
          getInfoBySessionId(history, sessionId);
    }

    return (
        <div className="sign-in-wrapper">
            <Header 
                question=""
                buttonText={t('logOut')}
                navLink="/log_in"
                logined={true}
                onButtonClick={() => onLogout(history)}
            />
            <div className="form-wrapper contents">
                <img src={img} alt="img here" />
                <div className="title mb20">{t('kycFinishTitle')}</div>
                <p className="mb100">{t('kycFinishPara1')}
                <br />{t('kycFinishPara2')}
                <br />{t('kycFinishPara3')}</p>
                <div className="contain">
                    <div className="sign-in-btn" onClick={onStartKyc}>{t('kycFinishButton')}</div>
                </div>
            </div>
        </div>
    );
    
}

const mapStateToProps = ({auth}) => {
  // ...
  // console.log(userReducer)
  const { user } = auth;
  return {
    user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogout: (history) => dispatch(logoutUser(history))
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KycDone)
