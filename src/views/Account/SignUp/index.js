import React, { useState, useEffect } from 'react'
// import ProgressBar from 'react-customizable-progressbar'
import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input'
// import { isValidPhoneNumber, isPossiblePhoneNumber} from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useLocation } from "react-router-dom";

import 'react-responsive-modal/styles.css';
// import { Modal } from 'react-responsive-modal';
import {
    // Container, 
    Col,
    Row
} from 'reactstrap';
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

import { createUserAccount, resetSignupError } from '../../../redux/actions';

import { SignUpValidator } from '../../../shared/formValidator';

import LeftCommonPanel from '../common/leftPanel'
import CheckRadio from '../../../assets/images/radio1.png'
import UnCheckRadio from '../../../assets/images/radio2.png'
// import TimeIcon from '../../../assets/images/tiime-icon.png'
import Header from '../../header'

// const client = require('twilio')('AC3a72399a3fbd2483bb39e8c17fdfb025', 'de966aeda8839c255669504f41fbc2d2', {
//     lazyLoading: true
// });
// bridge url
const bridge = "https://bridge.walletconnect.org";
// create new connector
const walletConector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

const SignUp = (props) => {
    const { history, onCreateUser, error, user, onResetSignupError } = props;
    const { t } = useTranslation('common');
    const { i18n } = useTranslation('common');
    const search = useLocation().search;
    const affiliate_id = new URLSearchParams(search).get('refId');
    const [values, setValues] = useState({ email: "", password: "", confirmPassword: "", cgu: false, saft: false });
    const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "", cgu: "", saft: "" });
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

    const onSignInClick = () => {
        onResetSignupError();
    }

    useEffect(() => {
        onResetSignupError();
    }, [])

    useEffect(() => {
        if (error && error.length > 0) {
            showToast(error)
        }
    }, [error]);

    useEffect(() => {
        if (user && user.validated) {
            history.push('/merci')
        }
    }, [user]);

    const getRandomNumber = () => {
        let random = Math.floor(Math.random() * 4 + 1) + '' + Math.floor(Math.random() * 1 + 1) + '' + Math.floor(Math.random() * 8 + 1) + '' + Math.floor(Math.random() * 2 + 1) + '' + Math.floor(Math.random() * 7 + 1) + '' + Math.floor(Math.random() * 3 + 1);
        return random;
    }

    const handleSubmit = async () => {
        const validationErrors = SignUpValidator(values, i18n.language);
        setErrors(validationErrors);
        const noErrors = Object.keys(validationErrors).length === 0;
        const payload = values;
        if (noErrors) {
            const headers = {
                'Api-Key': '2tNYsfio11UnpXnHo3U2PTjzDISzRPWD',
            }
            await fetch(`https://workflow-api.synaps.io/v2/session/init?sandbox=false&alias=${payload.email}`, {
                method: 'POST',
                headers: headers,
                body: undefined,
            }).then(
                response => response.json()
            ).then(res => {
                // console.log(res)
                payload.sessionkyc = res.session_id;
                if (affiliate_id && affiliate_id.length > 0) {
                    payload.affiliate = affiliate_id + ''
                }
                // console.log(values)
                onCreateUser(payload, history);
            })
        }
    }

    const onChangeValues = (event) => {
        setErrors({
            ...errors,
            email: event.target.name === 'email' ? "" : errors.email,
            password: event.target.name === 'password' ? "" : errors.password,
            confirmPassword: event.target.name === 'confirmPassword' ? "" : errors.confirmPassword,
        })
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const onChangePhone = (number) => {
        // console.log(number)
        setErrors({
            ...errors,
            phone: number && isValidPhoneNumber(number) ? "" : 'Please enter valid number',
        })
        setValues({ ...values, phone: number });
    }

    const onChangeRadios = (event) => {
        if (event === 'cgu') {
            setValues({ ...values, cgu: !values.cgu });
            setErrors({ ...errors, cgu: '' })
        } else {
            setValues({ ...values, saft: !values.saft });
            setErrors({ ...errors, saft: '' })
        }
    }

    const gotoWallet = (chainId, accounts, isWallet) => {
        history.push({
            pathname: '/nft-wallet',
            state: { accounts: accounts, chainId: chainId, isWallet: isWallet },
            wallConnect: walletConector
        })
    }

    useEffect(() => {
        if (user && !user.validated) {
            // console.log(user)
            // onOpenModal();
        } else if (user && user.validated && user.status == 'CREATED') {
            history.push('/merci')
        } else if (user && user.validated) {
            // console.log(walletConector)
            if (window.ethereum) {
                window.ethereum.request({ method: 'eth_accounts' }).then(resp => {
                    if (resp && resp.length > 0) {
                        // history.push('/nft-wallet')
                        gotoWallet('', resp, false)
                        return;
                    }
                })
            }

            if (walletConector.connected) {
                let chainId = '0x' + walletConector.chainId;
                let accounts = walletConector.accounts;
                // console.log(chainId, accounts)
                gotoWallet(chainId, accounts, true)
                return;
            }

            history.push('/merci')
        }
    }, [user]);

    // console.log(values)

    return (
        <div className="sign-up-wrapper">
            <ToastContainer />
            <Header
                question={t('signUpHead2')}
                buttonText={t('signUpLogin')}
                navLink="/log_in"
                onButtonClick={() => onSignInClick()}
            />
            <Row className="sign-up-row">
                <Col xs={{ order: 2 }} lg={{ size: 5, order: 1 }} className="left-box">
                    <LeftCommonPanel />
                </Col>
                <Col xs={{ order: 1 }} lg={{ size: 7, order: 2 }} className="sign-up-form">
                    <div className="form-wrapper">
                        <div className="title">{t('signUpHead3')}</div>
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
                            <div className="field-item-main">
                                <div className="field-item">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder={t('signUpConfirmPass')}
                                        value={values.confirmPassword}
                                        onChange={onChangeValues}
                                    /></div>
                                <span className="error">{errors && errors.confirmPassword}</span>
    </div>

                            {/*
                    <div className="field-item-main">
                      <div className="field-item-1">
                          <PhoneInput
                            defaultCountry="FR"
                            value={values.phone}
                            placeholder={t('signUpPhone')}
                            onChange={onChangePhone}/></div>
                            <span className="error">{errors && errors.phone}</span>
                      </div>
                    <div className="field-item">
                                <input 
                                    type="text" 
                                    name="address" 
                                    placeholder="Address" 
                                    value={values.address}
                                    onChange={onChangeValues}
                                />
                                <span className="error">{errors && errors.address}</span>
        					</div>*/}
                            <div className="radion-btns">
                                <div className="cgu">
                                    <img
                                        src={!values.cgu ? UnCheckRadio : CheckRadio}
                                        alt="img"
                                        onClick={() => onChangeRadios('cgu')}
                                    />
                                    <div className="label">
                                        <a
                                            href="https://intercom.help/ternoa/fr/articles/4974658-general-conditions-of-use"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {t('signUpCheck1')}
                                        </a>
                                    </div>
                                </div>
                                <div className="saft">
                                    <img
                                        src={!values.saft ? UnCheckRadio : CheckRadio}
                                        alt="img"
                                        onClick={() => onChangeRadios('saft')}
                                    />
                                    <div className="label">
                                        <a
                                            href="https://intercom.help/ternoa/fr/articles/4974659-general-conditions-of-sale"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {t('signUpCheck2')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <span className="error">
                                {errors && errors.cgu ? errors.cgu : errors.saft}
                            </span>
                        </div>
                        <div className="row">
                            <div className="col mb-4">
                                <p className="text-white">
                                    {t('signUpEmailCode')}
                                </p>
                            </div>
                        </div>
                        <div className="sign-up-btn-main">
                            <div className="sign-up-btn-child">
                                <div className="sign-up-btn" onClick={handleSubmit}>{t('signUpButton')}</div>
                        </div>
                        </div>
                        
                         {/*<h3 className="text-white">
                        {t('endPrivateSale')}
                    </h3>*/} 
                    </div>
                </Col>

            </Row>
        </div>


    );
}

const mapStateToProps = ({ auth, userReducer }) => {
    // ...
    const { error } = userReducer;
    const { user } = auth;
    return {
        error,
        user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreateUser: (payload, history) => dispatch(createUserAccount(payload, history)),
        onResetSignupError: () => dispatch(resetSignupError())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp)


