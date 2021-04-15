import React from 'react'
import { 
	// Container, 
	Col, 
	Row 
} from 'reactstrap';
// import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";
import { SynapsClient } from '@synaps-io/synaps-client-sdk-js';
import { useTranslation } from 'react-i18next';
import { logoutUser, updateUserAccount, loginStatus } from '../../../redux/actions';
import LeftCommonPanel from '../common/leftPanel'
import Header from '../../header'
import img from '../../../assets/images/Vectora.png'

const Merci = (props) => {
    const { history, user, onLogout, onUpdateUserProfile } = props;
    const { t } = useTranslation('common');
    const onStartKyc = async() => {
          // initSynaps(history);
          // console.log(user)
          // console.log(user && user.status == 'CREATED')
          if(user && user.status === 'CREATED' && user.sessionkyc) {
              const Synaps = new SynapsClient(user.sessionkyc, 'workflow');
              Synaps.init()
              Synaps.on('finish', () => {
                  // Do something
                  onUpdateUserProfile({id: user.id, status: 'PENDING'});  
              });
              Synaps.on('close', () => {
                  onUpdateUserProfile({id: user.id, status: 'PENDING'});  
              });
          } else {
            history.push('/wallet');
          }
    }

    const onContinueMyKyc = async() => {
      if(user && user.sessionkyc) {
        const Synaps = new SynapsClient(user.sessionkyc, 'workflow');
        Synaps.init()
        Synaps.on('finish', () => {
            // Do something
            onUpdateUserProfile({id: user.id, status: 'PENDING'});  
        });
        Synaps.on('close', () => {
            onUpdateUserProfile({id: user.id, status: 'PENDING'});  
        });
      }
    }

    return (
        <div className="sign-in-wrapper merci">
            <Header
                question=""
                buttonText={t('logOut')}
                logined={true}
                onButtonClick={() => onLogout(history)}
            />
            <Row className="sign-in-row">
                <Col xs={{order: 2}} lg={{size: 5, order: 1}} className="left-box">
                    <LeftCommonPanel />
                </Col>
                <Col xs={{order: 1}} lg={{size:7, order: 2}} className="sign-in-form">
                    <div className="form-wrapper contents">
                        <img src={img} alt="img here"/>
                        <div className="title mb100">{t('thankYou')}</div>
                        {
                          user && user.status === 'PENDING' &&
                          <button className="continue-my-kyc" id="synaps-btn" onClick={onContinueMyKyc}>{t('continueMyKyc')}</button>
                        }
                        
                        {/*
                            <div className="sign-in-btn" onClick={onStartKyc}>{t('thanksButton')}</div>
                        */}
                        
                        {/*<button id={user && user.status == 'CREATED' ? "synaps-btn" : 'non-synaps'} className="sign-in-btn"  onClick={onStartKyc}>{user && user.status == 'FINISHED' ? 'Participate to sales' : (user && user.status == 'CREATED') ? 'Start my KYC' : 'Pending KYC'}</button>*/}
                        <button id={user && user.status === 'CREATED' ? "synaps-btn" : 'non-synaps'} className="sign-in-btn-merci"  onClick={onStartKyc}>{user && user.status === 'FINISHED' ? 'Participate to sales' : (user && user.status === 'CREATED') ? 'Start my KYC' : 'Participate to sales'}</button>
                        {/*
                            <NavLink to={'/kyc-step-2'}>
                                <div className="sign-in-btn" onClick={onStartKyc}>{t('thanksButton')}</div>
                            </NavLink>
                        */}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

const mapStateToProps = ({auth}) => {
  const { user } = auth;
  return {
    user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogout: (history) => dispatch(logoutUser(history)),
    onUpdateUserProfile: (payload) => dispatch(updateUserAccount(payload)),
    checkKycStatus: (history) => dispatch(loginStatus(history))
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Merci)

