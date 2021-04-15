import React, { Component, useState } from 'react'
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom' 
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useTranslation } from 'react-i18next';
import { 
  // Container, 
  Col, 
  Row 
} from 'reactstrap';
import { updateUserPassword, updateUserAccount, logoutUser } from '../../redux/actions';
import Logo from '../../assets/images/ternoa_logo.png'
import ProfileIcon from '../../assets/images/account-icon.png'

// class Header extends Component {
const Header = (props) => {
  const { user, onUpdateUserPassword, question, buttonText, navLink, onButtonClick, logined, history, onLogoutUser } = props;
  const passPattern = new RegExp('^(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}');

  const { i18n } = useTranslation('common');
  const { t } = useTranslation('common');

  const [openModal, setOpenModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);
  const onUpdatePassword = async () => {
      // console.log(user);
      // console.log(newPassword);
      // history.push('/merci')
      if(user && user.id && newPassword && newPassword.length > 5) {
        // onUpdateUserPassword({userId: user.id, password : newPassword });    
        await onUpdateUserPassword({id: user.id, password : newPassword });    
        setNewPassword('');
        onCloseModal();
      }
      
  }
  const onChangePassword = (event) => {
      setNewPassword(event.target.value);
  }

  const changeLanguage = (event) => {
    let lng = event.target.value
    i18n.changeLanguage(lng)
  };

  const onLogout = () => {
    // dispatchAction(logoutUser(history));
    onLogoutUser(history);
  }
  
  return (
    	<div className="header-wrapper">
        <Modal open={openModal} onClose={onCloseModal} center>
          <div className="outh-modal-wrapper header-modal">
            <div className="popup">
                    <h3>{t('headerMyAccPopTitle')}</h3>
                </div>
                <div className="main-logout">
                <div className="col-lg-6 col-xs-12">
                <p>{t('headerMyAccPopTitle')}:</p>
                </div>
                <div className="col-lg-6 col-xs-12">
                <div className="check-kyc-1">{user && user.email || 'user@email.com'}</div>
                </div>
                </div>
                <div className="main-logout">
                <div className="col-lg-6 col-xs-12">
                <p>KYC:</p>
                </div>
                <div className="col-lg-6 col-xs-12 ">
                <div className="check-kyc-1"><NavLink to={'/merci'}>{t('accountPopVerify')}</NavLink></div>
                </div>
                </div>
                <div className="main-logout">
                <div className="col-lg-6 col-xs-12 ">
                <p>{t('accountPopPass')}:</p>
                </div>
                <div className="col-lg-6 col-xs-12 ">
                <div className="check-kyc-1">{t('accountPopChange')}</div>
                </div>
                </div>
                <div className="main-logout-2">
                <div className="col-lg-8 col-xs-8">
                 <div className="field-item-1">
                  <input 
                      type="text" 
                      name="outhSms" 
                      placeholder={t('accountPopPlace')}
                      value={newPassword}
                      minLength={6}
                      onChange={onChangePassword}
                  />
              </div>

                </div>
                <div className="col-lg-4 col-xs-4">
                <div className="confirm-btn">
                  <button className="verify-btn-1" type="button"  disabled={passPattern.test(newPassword) ? false : true } onClick={onUpdatePassword}>{t('headerMyAccPopButton')}</button>
                </div>
                </div>
                </div>
                <div className="main-logout-1">
                <p>{t('accountPopSubLine')}</p>
                </div>
                <div className="logout-btn-main">
                  <div className="logout-btn-child">
                    <div className="logout-button" onClick={onButtonClick}>{t('logOut')}</div>
                  </div>
                </div>
          </div>
        </Modal>
    		<div className="logo-wrapper align-items-center">
          <div className="col-lg-6">
            <NavLink to={'/'}>
              <img src={Logo} alt="logo" width="140" />
            </NavLink>
           </div>
           {
             /*
               <div className="form-group m-0 col-lg-3">
                <select className="form-control form-control-sm bg-transparent text-white" value={i18n.language} onChange={changeLanguage}>
                  <option value="en">
                    🇬🇧 EN
                  </option>
                  <option value="fr">
                    🇫🇷 FR
                  </option>
                </select>
               </div>
             */
           }
           <div className="select-lang-wrapper col-lg-6">
            <select className="country" value={i18n.language} onChange={changeLanguage}>
              <option value="en">
                🇬🇧 EN
              </option>
              <option value="fr">
                🇫🇷 FR
              </option>
            </select>
          </div>
    		</div>
    		<div className="account-wrapper">
    			<div className="sign-up">
    				<div className="label">{question || ''}</div>
            {
              navLink &&
              <NavLink to={navLink}>
                <div className="menu-item" onClick={onButtonClick}>{buttonText || ''}</div>
              </NavLink>
            }
            
            {
              logined &&
              <div className="profile-icon-wrapper">
                <div className="menu-item" onClick={onOpenModal}>{t('myAccountBtn')}</div>
                {
                  /*
                    <img src={ProfileIcon} alt="logo" onClick={onOpenModal}/>
                  */
                }
              </div>
            }
            
      		</div>
    		</div>
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
    onLogoutUser: (history) => dispatch(logoutUser(history)),
    onUpdateUserPassword: (payload) => dispatch(updateUserAccount(payload))
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)


