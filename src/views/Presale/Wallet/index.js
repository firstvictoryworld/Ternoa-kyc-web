import React, { Component, useEffect, useState } from 'react'
import { connect } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useTranslation } from 'react-i18next';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

import img from '../../../assets/images/Vector3.png'
import Header from '../../header'
import { logoutUser, addMetamaskAddressAction } from '../../../redux/actions';


// // Create a connector
// const connector = new WalletConnect({
//   bridge: "https://example.walletconnect.org/", // Required
//   qrcodeModal: QRCodeModal,
// });

// bridge url
const bridge = "https://bridge.walletconnect.org";
// create new connector
let walletConector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

const Wallet = (props) => {
    const { history, user, onLogout, onAddMetamaskAddressAction } = props;
    const { t } = useTranslation('common');
    const [openModal, setOpenModal] = useState(false);

    const onOpenModal = () => setOpenModal(true);
    const onCloseModal = () => setOpenModal(false);




    const gotoWallet = (chainId, accounts, isWallet) => {
      // onAddMetamaskAddressAction({address: accounts[0]});              
      history.push({
        pathname: '/nft-wallet',
        state: { accounts: accounts, chainId: chainId, isWallet: isWallet },
        wallConnect: walletConector
      })
    }

    const subscribeToEvents = () => {
      if (!walletConector) {
        return;
      }

      // walletConector.on("session_update", async (error, payload) => {
      //   // console.log(`connector.on("session_update")`);

      //   if (error) {
      //     throw error;
      //   }

      //   // const { chainId, accounts } = payload.params[0];
      //   // console.log( chainId , accounts)
      //   // this.onSessionUpdate(accounts, chainId);
      // });

      walletConector.on("connect", (error, payload) => {
        // console.log(`connector.on("connect")`);

        // console.log( payload)
        if (error) {
          throw error;
        }
        const { chainId, accounts } = payload.params[0];
        let chainTypye = '0x'+ chainId;
        let accts = accounts;
        gotoWallet(chainTypye, accts, true) 
        // this.onConnect(payload);
      });

      walletConector.on("disconnect", (error, payload) => {
        console.log(`connector.on("disconnect")`);

        if (error) {
          throw error;
        }
      });
    };



    const walletConnectInit = async () => {      
      // console.log(walletConector)
      setTimeout(function(){
        if(walletConector) {
          // subscribe to events
          subscribeToEvents();  
        }
      },1000);
    };

    const onWalletConnect = () => {

      console.log(walletConector)
      // check if already connected
      if (!walletConector.connected) {
          walletConector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
        // create new session
        walletConector.createSession();
      } else {
         let chainId = '0x'+ walletConector.chainId;
         let accounts = walletConector.accounts;
         gotoWallet(chainId, accounts, true) 
      }
    }

    const metamaskInit = () => {
        setTimeout(function(){
          const ethereumButton = document.querySelector('.enableEthereumButton');
          if(ethereumButton) {
            ethereumButton.addEventListener('click', () => {
              //Will Start the metamask extension
              if(window.ethereum) {
                window.ethereum.request({ method: 'eth_requestAccounts' }).then(resp => {
                  onAddMetamaskAddressAction({address: resp[0]});  
                  gotoWallet('', resp, false) 
                });
              } else {
                onOpenModal();
              }
            });  
          }
        },3000);
    }

    useEffect(() => {
      metamaskInit();
      walletConnectInit();
    }, []);
    
        return (
            <div className="sign-in-wrapper wallet-wrapper">
                <Header
                    question=""
                    buttonText={t('logOut')}
                    logined={true}
                    onButtonClick={() => onLogout(history)}
                />
                <Modal open={openModal} onClose={onCloseModal} center>
                  <div className="outh-modal-wrapper header-modal">
                      <div className="popup">
                          <h3>{t('walletPopTitle')}</h3>
                          <p>{t('walletPopPara')}</p>
                          <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank">{t('walletPopLink')}</a>
                      </div>
                  </div>
                </Modal>
                <div className="form-wrapper contents">
                    <img src={img} alt="img here" />
                    <div className="title mb20">{t('walletConnectTitle1')}<br />{t('walletConnectTitle2')}</div>
                      <p className="mb100">{t('walletConnectPara1')} <br />{t('walletConnectPara2')}<br />{t('walletConnectPara3')}</p>
                        <div className="contain">
                            <div className="sign-in-btn wallet-button gradient enableEthereumButton">{t('metamaskConnectButton')}</div>
                            <div className="sign-in-btn wallet-button gradient" style={{marginTop: 20}} onClick={onWalletConnect}>{t('walletConnectButton')}</div>
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
    onLogout: (history) => dispatch(logoutUser(history)),
    onAddMetamaskAddressAction: (payload) => dispatch(addMetamaskAddressAction(payload)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Wallet)
