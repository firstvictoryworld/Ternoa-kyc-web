import React, {  useState, useEffect } from 'react'
import { 
	// Container, 
	Col, 
	Row 
} from 'reactstrap';
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useTranslation } from 'react-i18next';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

import { loginUser, passwordRecoverAction, verifyUserByPin, resetLoginError } from '../../../redux/actions';
import { LoginValidator } from '../../../shared/formValidator';
import LeftCommonPanel from '../common/leftPanel';
import Header from '../../header';

// bridge url
const bridge = "https://bridge.walletconnect.org";
// create new connector
const walletConector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });


const SignIn = (props) => {
    const { history, onLogin, error, user, onPasswordRecoverySubmit, onValidateUser, onResetLoginError } = props;
    const { t } = useTranslation('common');
    const { i18n } = useTranslation('common');
    const [openModal, setOpenModal] = useState(false);
    const [openModalRecovery, setOpenModalRecovery] = useState(false);
    const [verificationPin, setVerificationPin] = useState('');
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [values, setValues] = useState({email: "", password: ""})
    const [errors, setErrors] = useState({email: "", password: ""})
    const showToast = (error) => {
        toast(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
    }

    useEffect(() => {
        if(error && error.length > 0) {
            showToast(error)        
        }
    }, [error]);

    useEffect(() => {
      onResetLoginError()
    }, []);
    
    const gotoWallet = (chainId, accounts, isWallet) => {
      history.push({
        pathname: '/nft-wallet',
        state: { accounts: accounts, chainId: chainId, isWallet: isWallet },
        wallConnect: walletConector
      })
    }

    useEffect(() => {
        if(user && !user.validated) {
            // console.log(user)
            onOpenModal();
        } else if (user && user.validated && user.status === 'CREATED') {
            history.push('/merci')
        } else if(user && user.validated) {
            // console.log(walletConector)
            if(window.ethereum){
              window.ethereum.request({ method: 'eth_accounts' }).then(resp => {
                  if(resp && resp.length > 0) {
                       // history.push('/nft-wallet')
                       gotoWallet('', resp, false) 
                       return;
                  }
              })
            }

            if(walletConector.connected) {
              let chainId = '0x'+ walletConector.chainId;
              let accounts = walletConector.accounts;
              // console.log(chainId, accounts)
              gotoWallet(chainId, accounts, true) 
              return;
            } 

            history.push('/merci')
        }
    }, [user]);

    const handleSubmit = () => {
        // console.log('in sign')
        const validationErrors = LoginValidator(values, i18n.language);
        setErrors(validationErrors);
        const noErrors = Object.keys(validationErrors).length === 0;
        // console.log(noErrors)
        if (noErrors) {
          const payload = values;
          // console.log(values)
          onLogin(payload, history);
          
          // history.push('/merci')
        }
    }

    const onOpenModal = () => {
      setVerificationPin('');
      setOpenModal(true)
    };
    const onCloseModal = () => setOpenModal(false);
    const onVerifyPin = () => {
        // console.log(verificationPin);
        onValidateUser({verificationPin : verificationPin}, history)
        // history.push('/merci')
    }
    const onChangePin = (event) => {
        setVerificationPin(event.target.value);
    }

    const onOpenModalRecovery = () => {
      setOpenModalRecovery(true);
    };
    
    const onCloseModalRecovery = () => setOpenModalRecovery(false);
    const onSubmitRecovery = () => {
        // console.log(recoveryEmail);
        onPasswordRecoverySubmit({email : recoveryEmail})
        setRecoveryEmail('');
        onCloseModalRecovery();
    }
    const onChangeRecoveryEmail = (event) => {
        setRecoveryEmail(event.target.value);
    }

    const onSignUpClick = () => {
      onResetLoginError();
    }

    const onChangeValues = (event) => {
        setErrors({
          ...errors,
          email: event.target.name === 'email' ? "" : errors.email, 
          password: event.target.name === 'password' ? "" : errors.password
        })
        setValues({...values, [event.target.name]: event.target.value});
    }
    
        return (
              <div className="sign-in-wrapper">
                <ToastContainer />
                <Modal open={openModal} onClose={onCloseModal} center>
                  <div className="outh-modal-wrapper">
                      <div className="popup">
                          <h3>{t('loginPopTitle1')}</h3>
                          <p>{t('loginPopDes1')}</p>
                      </div>
                      <div className="field-item">
                          <input 
                              type="text" 
                              name="outhSms" 
                              placeholder={t('loginPopPlace1')}
                              value={verificationPin}
                              maxLength={6}
                              minLength={6}
                              onChange={onChangePin}
                          />
                      </div>
                      <button className="verify-btn" type="button" disabled={verificationPin.length < 6 ? true : false} onClick={onVerifyPin}>{t('loginPopButton1')}</button>
                  </div>
                </Modal>
                <Modal open={openModalRecovery} onClose={onCloseModalRecovery} center>
                  <div className="outh-modal-wrapper">
                      <div className="popup">
                          <h3>{t('loginPopTitle')}</h3>
                          <p>{t('loginPopDes')}</p>
                      </div>
                      <div className="field-item email-field-item">
                          <input 
                              type="email" 
                              name="recoverEmail" 
                              placeholder={t('loginPopPlace')}
                              value={recoveryEmail}
                              className="email-field"
                              onChange={onChangeRecoveryEmail}
                          />
                      </div>
                      <button className="verify-btn" type="button" disabled={!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(recoveryEmail) ? true : false} onClick={onSubmitRecovery}>{t('loginButton')}</button>
                  </div>
                </Modal>
                <Header 
                    question={t('loginSubPara')}
                    buttonText={t('loginSignUp')}
                    navLink="/sign_up"
                    onButtonClick={() => onSignUpClick()}
                />
                <Row className="sign-in-row">
                    <Col xs={{order: 2}} lg={{size: 5, order: 1}} className="left-box">
                        <LeftCommonPanel />
                    </Col>
                    <Col xs={{order: 1}} lg={{size:7, order: 2}} className="sign-in-form">
                        <div className="form-wrapper">
                            <div className="title">{t('loginSignin')}</div>
                            <div className="fields-wrapper">
                            <div className="field-item-main">
                                <div className="field-item">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder={t('signUpEmail')} 
                                        value={values.email}
                                        onChange={onChangeValues}
                                    /></div>
                                    <span className="error">{errors && errors.email}</span>
                                </div>
                                <div className="field-item-main">
                                <div className="field-item">
                                    <input 
                                        type="password" 
                                        name="password" 
                                        placeholder={t('signUpPass')} 
                                        value={values.password}
                                        onChange={onChangeValues}
                                    /></div>
                                    <span className="error">{errors && errors.password}</span>
                                </div>
                            </div>
                            <div className="sign-up-btn-main">
                                <div className="sign-up-btn-child">
                                  <div className="sign-in-btn" onClick={handleSubmit}>{t('signUpLogin')}</div>
                                </div>
                            </div>
                            <div className="forgot-password-text" onClick={onOpenModalRecovery}>{t('loginForgetPass')}</div>
                        </div>
                      </Col>
              </Row>
            </div>
        );
}   
    

// export default SignIn;

const mapStateToProps = ({auth}) => {
  // ...
  const { error, user } = auth;
  return {
    error,
    user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogin: (payload, history) => dispatch(loginUser(payload, history)),
    onPasswordRecoverySubmit: (payload) => dispatch(passwordRecoverAction(payload)),
    onValidateUser: (payload, history) => dispatch(verifyUserByPin(payload, history)),
    onResetLoginError: () => dispatch(resetLoginError())
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)