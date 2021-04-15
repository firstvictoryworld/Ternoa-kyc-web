import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { connect } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom'
import moment from "moment";
import ProgressBar from 'react-customizable-progressbar'
import { useTranslation } from 'react-i18next';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { logoutUser, addMetamaskAddressAction } from '../../../redux/actions';
import Logo from '../../../assets/images/ternoa_logo.png'
import ProductImg from '../../../assets/images/product_screen.png'
import BinanaceIcon from '../../../assets/images/binance-coin.png'
import EthereumIcon from '../../../assets/images/etherium.png'
import FileIcon from '../../../assets/images/clipboard.png'
import FileIconCopied from '../../../assets/images/copied.png'
import CopiedIcon from '../../../assets/images/clipboard-copied.png'
import FileIconWhite from '../../../assets/images/clipboard-white.png'
import Ethereum from '../../../assets/images/ETHEREUM.png'
import Bnb from '../../../assets/images/BNB.png'
import Counticon1 from '../../../assets/images/count-icon-1.png'
import Counticon2 from '../../../assets/images/count-icon-2.png'
import Counticon3 from '../../../assets/images/count-icon-3.png'
import Counticon4 from '../../../assets/images/count-icon-4.png'
import TimeIcon from '../../../assets/images/tiime-icon.png'
import CloseIcon from '../../../assets/images/close.png'
import RectangleIcon from '../../../assets/images/rectangle.png'
import Caps8 from '../../../assets/gif/caps01.gif'
import Caps7 from '../../../assets/gif/caps02.gif'
import Caps6 from '../../../assets/gif/caps03.gif'
import Caps5 from '../../../assets/gif/caps04.gif'
import Caps4 from '../../../assets/gif/caps05.gif'
import Caps3 from '../../../assets/gif/caps06.gif'
import Caps2 from '../../../assets/gif/caps7.gif'
import Caps1 from '../../../assets/gif/caps8.gif'
import Header from '../../header'

const bridge = "https://bridge.walletconnect.org";
const walletConector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
const pricePattern = new RegExp(/([0-9]{1,3}\s?)+/g);
let myEuros = 0;
let myCaps = 0;
const ethAddress = '0xE885434dF1D31B27681b3e9A4071B55282AB347C';
const bscAddress = '0xE885434dF1D31B27681b3e9A4071B55282AB347C';
const bankReceiver = 'CAPSULE CORP.';
const iBan = 'FR76 1695 8000 0178 5841 6116 817';
const bIc = 'QNTOFRP1XXX';
const bankName = 'QONTO';
const additionalInfo = '1 RUE LOEB, 64200 BIARRITZ';
// const bankSwift =  'BNPAFRPP';

const NFTWallet = (props) => {
    const myRef = React.useRef(null);
    const { t } = useTranslation('common');
    const { onUpdateAccountConnected } = props;
    const [chainType, setChainType] = useState('');
    const [connectedAccountAddress, setConnectedAccoutAddress] = useState('');
    const [vesting1, setVesting1] = useState(null);
    const [vesting2, setVesting2] = useState(null);
    const [vesting3, setVesting3] = useState(null);
    const [vesting4, setVesting4] = useState(null);
    const [vesting5, setVesting5] = useState(null);
    const [vesting6, setVesting6] = useState(null);
    const [connector, setConnector] = useState(null);
    const [isWallet, setIsWallet] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openClaimModal, setOpenClaimModal] = useState(false);
    const [selectedNft, setSelectedNft] = useState(null);
    const [myPocket, setMyPocket] = useState(0);
    const [myPocketCaps, setMyPocketCaps] = useState(0);
    const [investorsNfts, setInvestorsNfts] = useState([]);
    const [progressStats, setProgressStats] = useState(null);
    const [copied, setCopied] = useState(false);
    const [ethCopied, setEthCopied] = useState(false);
    const [bscCopied, setBscCopied] = useState(false);
    const [bankRecCopied, setBankReceiverCopied] = useState(false);
    const [ibanCopied, setIbanCopied] = useState(false);
    const [bicCopied, setBicCopied] = useState(false);
    const [bankNameCopied, setBankNameCopied] = useState(false);
    const [addInfoCopied, setAddInfoCopied] = useState(false);
    const [swiftCopied, setSwiftCopied] = useState(false);

    const onOpenModal = () => {
        setOpenModal(true)
        setSelectedNft(null);
        setCopied(false);
        setEthCopied(false);
        setBscCopied(false);
        setBankReceiverCopied(false);
        setIbanCopied(false);
        setBicCopied(false);
        setBankNameCopied(false);
        setAddInfoCopied(false);
        setSwiftCopied(false);
    };
    const onCloseModal = () => setOpenModal(false);
    const onOpenClaimModal = () => setOpenClaimModal(true);
    const onCloseClaimModal = () => setOpenClaimModal(false);
    const loadJauge = () => {
        setProgressStats(null);
        fetch(`https://claim-details.ternoa.com/jauge`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(data => {
                setProgressStats(data);
            })
            .catch(err => err);
    }
    const loadInvestorsDeal = () => {
        setInvestorsNfts([]);
        fetch(`https://claim-details.ternoa.com/nft`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(data => {
                setInvestorsNfts(data);
            })
            .catch(err => err);
    }
    const loadVestingBlock = (address) => {
        setVesting1(null);
        fetch(`https://claim-details.ternoa.com/invest/?address=${address}`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(data => {
                setVesting1(data);
                myEuros = myEuros + data.valueEur;
                setMyPocket(myEuros);
                let tokens = parseFloat(data.tokens)
                myCaps = myCaps + tokens
                setMyPocketCaps(myCaps);
            })
            .catch(err => err);
    }
    const loadVestingBlock2 = (address) => {
        setVesting2(null);
        fetch(`https://claim-details.ternoa.com/airdrop/?address=${address}`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(data => {
                setVesting2(data);
                myEuros = myEuros + data.valueEur;
                setMyPocket(myEuros);
                let tokens = parseFloat(data.tokens)
                myCaps = myCaps + tokens
                setMyPocketCaps(myCaps);
            })
            .catch(err => err);
    }
    const loadVestingBlock3 = (address) => {
        setVesting3(null);
        fetch(`https://claim-details.ternoa.com/investors2eth/?address=${address}`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(data => {
                setVesting3(data);
                myEuros = myEuros + data.valueEur;
                setMyPocket(myEuros);
                let tokens = parseFloat(data.tokens)
                myCaps = myCaps + tokens
                setMyPocketCaps(myCaps);
            })
            .catch(err => err);
    }
    const loadVestingBlock4 = (address) => {
        setVesting4(null);
        fetch(`https://claim-details.ternoa.com/investors2bsc/?address=${address}`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(data => {
                setVesting4(data);
                myEuros = myEuros + data.valueEur;
                setMyPocket(myEuros);
                let tokens = parseFloat(data.tokens)
                myCaps = myCaps + tokens
                setMyPocketCaps(myCaps);
            })
            .catch(err => err);
    }
    const loadVestingBlock5 = (address) => {
        setVesting5(null);
        fetch(`https://claim-details.ternoa.com/investors2wire/?address=${address}`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(data => {
                setVesting5(data);
                myEuros = myEuros + data.valueEur;
                setMyPocket(myEuros);
                let tokens = parseFloat(data.tokens)
                myCaps = myCaps + tokens
                setMyPocketCaps(myCaps);
            })
            .catch(err => err);
    }
    const loadVestingBlock6 = (address) => {
        setVesting6(null);
        fetch(`https://investors-ternoa.s3.eu-west-3.amazonaws.com/error.json`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(data => {
                setVesting6(data);
                myEuros = myEuros + data.valueEur;
                setMyPocket(myEuros);
                let tokens = parseFloat(data.tokens)
                myCaps = myCaps + tokens
                setMyPocketCaps(myCaps);
            })
            .catch(err => err);
    }
    const subscribeToEvents = (walletConector) => {
        if (!walletConector) {
            return;
        }

        walletConector.on("session_update", async (error, payload) => {
            if (error) {
                throw error;
            }
            const { chainId, accounts } = payload.params[0];
            let chainSeries = '0x' + chainId;
            console.log(chainSeries)
            setChainType(chainSeries);
            setConnectedAccoutAddress(accounts[0].toLowerCase())
        });

        walletConector.on("connect", (error, payload) => {
            if (error) {
                throw error;
            }
        });
    };

    const loadNftWalletDatas = () => {
        if (props.location.state.isWallet) {
            if (props && props.location && props.location.state && props.location.state.isWallet && props.location.state.accounts[0]) {
                setConnectedAccoutAddress(props.location.state.accounts[0].toLowerCase())
                setChainType(props.location.state.chainId)
                setIsWallet(props.location.state.isWallet);
                if (props.location.wallConnect) {
                    setConnector(props.location.wallConnect);
                    subscribeToEvents(props.location.wallConnect)
                }
            }
        } else {
            if (window.ethereum) {
                // get connected chanin id from metamask extension
                window.ethereum.request({ method: 'eth_chainId' }).then(resp => {
                    // console.log(resp)
                    if (resp && resp == '0x1') {
                        setChainType('0x1')
                    } else if (resp && resp == '0x38') {
                        setChainType('0x38')
                    }
                });

                // get coonected metamask accounts form extention
                window.ethereum.request({ method: 'eth_accounts' }).then(resp => {
                    if (resp && resp.length > 0) {
                        setConnectedAccoutAddress(resp[0].toLowerCase());
                    }
                })
            }
        }
    }

    const initEventsMetamask = () => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', function (accounts) {
                if (accounts && accounts.length > 0) {
                    if (connectedAccountAddress != accounts[0]) {
                        setConnectedAccoutAddress(accounts[0].toLowerCase())
                    }
                } else {
                    history.push('/wallet')
                }

            })
            window.ethereum.on('chainChanged', function (chain) {
                setChainType(chain.toString());
            })
        }
    }

    const resetMyPockets = () => {
        myEuros = 0;
        myCaps = 0;
        setMyPocket(0);
        setMyPocketCaps(0);
    }
    const onAccountAddressUpdated = async () => {
        if (connectedAccountAddress) {
            resetMyPockets();
            onUpdateAccountConnected({ address: connectedAccountAddress })
            await loadVestingBlock(connectedAccountAddress)
            await loadVestingBlock2(connectedAccountAddress)
            await loadVestingBlock3(connectedAccountAddress)
            await loadVestingBlock4(connectedAccountAddress)
            await loadVestingBlock5(connectedAccountAddress)
            await loadVestingBlock6(connectedAccountAddress)
        }
    }

    const onGetNftClick = (item) => {
        onOpenModal();
        setSelectedNft(item);
    }

    useEffect(() => {
        loadJauge();
        loadInvestorsDeal();
        loadNftWalletDatas();
        initEventsMetamask();
    }, []);

    useEffect(() => {
        onAccountAddressUpdated();
    }, [connectedAccountAddress]);

    const onAddressClick = (type, address) => {
        if (type && address) {
            if (type == '0x1') {
                window.open('https://etherscan.io/address/' + address, '_blank');
            } else if (type == '0x38') {
                window.open('https://bscscan.com/address/' + address, '_blank')
            }
        }
    }

    const onMyAccountLogout = () => {
        if (isWallet && connector && connector.connected) {
            connector.killSession();
        }
        onLogout(history);
    }

    const closeIconTemp = (
        <div>
            <img src={CloseIcon} style={{ height: 26 }} />
        </div>
    );

    const { history, user, onLogout } = props;
    return (
        <div className="nft_wallet_wrapper">
            <Modal open={openClaimModal} onClose={onCloseClaimModal} center>
                <div className="outh-modal-wrapper claim-modal-wrapper">
                    <div className="popup">
                        <h3>{t('claimPopupTitle')}</h3>
                    </div>
                    <button className="pop-ok-btn" type="button" onClick={onCloseClaimModal}>{t('depositPopbtn')}</button>
                </div>
            </Modal>
            <div ref={myRef} className="nft-container ">
                <Modal
                    container={myRef.current}
                    open={openModal}
                    onClose={onCloseModal}
                    center
                >
                    <div className="outh-modal-wrapper nft-modal">
                        <div className="popup">
                            <h3>{t('depositPopBuy')} CAPS</h3>
                            <h4>{t('depositPopText1')}</h4>
                            <p>{t('depositPopText2')} : on ETH, BSC or IBAN.</p>
                            <div className="pop-section-1">
                                <h5>{t('depositPopText3')} : <span>USDT, USDC and Euro, Dollar.</span></h5>
                                <p>{t('depositPopText4')}</p>
                            </div>
                            <div className="pop-section-2">
                                <p>{t('depositPopText5')}</p>
                                <div className="pop-section-sub-2">
                                    <img src={Ethereum} className="img-icon-1" alt="product_img" />
                                    <p>{ethAddress}</p>
                                    <CopyToClipboard text={ethAddress} onCopy={() => setEthCopied(true)}>
                                        <img src={ethCopied ? FileIconCopied : FileIcon} className="img-icon-2" alt="product_img" />
                                    </CopyToClipboard>
                                </div>
                            </div>
                            <div className="pop-section-2">
                                <p>{t('depositPopText6')}</p>
                                <div className="pop-section-sub-2">
                                    <img src={Bnb} className="img-icon-3" alt="product_img" />
                                    <p>{bscAddress}</p>
                                    <CopyToClipboard text={bscAddress} onCopy={() => setBscCopied(true)}>
                                        <img src={bscCopied ? FileIconCopied : FileIcon} className="img-icon-2" alt="product_img" />
                                    </CopyToClipboard>
                                </div>
                            </div>

                            <div className="pop-section-3">
                                <p>{t('depositPopText7')}</p>
                                <div className="pop-section-sub-3 new-sec">
                                    <div className="pop-sub-section-sub-3">
                                        <p>{t('depositPopText10')}<br />
                                            <span>{t('depositPopText11')} <strong>{t('depositPopText11-1')}</strong> {t('depositPopText11-2')}</span>
                                        </p>
                                        <span className="user-ref-number">{user && user.user_id}</span>
                                        <CopyToClipboard text={user.user_id} onCopy={() => setCopied(true)}>
                                            <img src={copied ? CopiedIcon : FileIconWhite} className="img-icon-2" alt="product_img" />
                                        </CopyToClipboard>
                                    </div>

                                </div>
                            </div>

                            <div className="pop-section-3">
                                <div className="pop-section-sub-3">
                                    <h2>{t('depositPopText8')}</h2>
                                    <div className="pop-sub-section-sub-3">
                                        <p>{t('depositPopText9')}</p>
                                        <span>{bankReceiver}</span>
                                        <CopyToClipboard text={bankReceiver} onCopy={() => setBankReceiverCopied(true)}>
                                            <img src={bankRecCopied ? FileIconCopied : FileIcon} className="img-icon-2" alt="product_img" />
                                        </CopyToClipboard>
                                    </div>
                                    <div className="pop-sub-section-sub-3">
                                        <p>IBAN</p>
                                        <span>{iBan}</span>
                                        <CopyToClipboard text={iBan} onCopy={() => setIbanCopied(true)}>
                                            <img src={ibanCopied ? FileIconCopied : FileIcon} className="img-icon-2" alt="product_img" />
                                        </CopyToClipboard>
                                    </div>

                                    <h3>{t('depositPopText12')}</h3>
                                    <div className="pop-sub-section-sub-3">
                                        <p>BIC</p>
                                        <span>{bIc}</span>
                                        <CopyToClipboard text={bIc} onCopy={() => setBicCopied(true)}>
                                            <img src={bicCopied ? FileIconCopied : FileIcon} className="img-icon-2" alt="product_img" />
                                        </CopyToClipboard>
                                    </div>
                                    <div className="pop-sub-section-sub-3">
                                        <p>{t('depositPopText13')}</p>
                                        <span>{bankName}</span>
                                        <CopyToClipboard text={bankName} onCopy={() => setBankNameCopied(true)}>
                                            <img src={bankNameCopied ? FileIconCopied : FileIcon} className="img-icon-2" alt="product_img" />
                                        </CopyToClipboard>
                                    </div>
                                    <div className="pop-sub-section-sub-3">
                                        <p>{t('depositPopText12')}</p>
                                        <span>{additionalInfo}</span>
                                        <CopyToClipboard text={additionalInfo} onCopy={() => setAddInfoCopied(true)}>
                                            <img src={addInfoCopied ? FileIconCopied : FileIcon} className="img-icon-2" alt="product_img" />
                                        </CopyToClipboard>
                                    </div>
                                    {/* <div className="pop-sub-section-sub-3">
                              <p>{'SWIFT'}</p>
                              <span>{bankSwift}</span>
                              <CopyToClipboard text={bankSwift} onCopy={() => setSwiftCopied(true)}>
                                <img src={swiftCopied ? FileIconCopied : FileIcon} className="img-icon-2" alt="product_img" />
                              </CopyToClipboard>
                            </div> */}
                                </div>
                            </div>
                            <button className="pop-ok-btn" type="button" onClick={onCloseModal}>{t('depositPopbtn')}</button>
                        </div>
                    </div>
                </Modal>
            </div>
            <Row className="nft_row_wrapper">
                <Col lg={9} className="left_content_wrapper">
                    <Header
                        question=""
                        buttonText={t('logOut')}
                        logined={true}
                        onButtonClick={() => onMyAccountLogout()}
                    />
                    <div className="left_content_details_wrapper">
                        <div className="title_wrapper">
                            <div className="title pr-3">
                                {t('walletNftTitle')}
                            </div>
                            <div className="condition_wrapper">
                                <div className="text">
                                    {t('walletNftPara1')}<br />
                                    {t('walletNftPara2')}<br /><br />
                                    <span className="font-weight-bold">{t('hardCapDone')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="count-progress-wrapper">
                            <Row>
                                {
                                    progressStats && progressStats.step && progressStats.step === 1 &&
                                    <Col lg={{ size: 3 }} className="count-progress-circle-1">
                                        <div className="count-progress-1">
                                            <Row>
                                                <Col lg={{ size: 6 }} xs={{ size: 6 }} className="count-step">
                                                    <img src={Counticon1} />
                                                </Col>
                                                <Col lg={{ size: 6 }} xs={{ size: 6 }} className="count-step">
                                                    <p>{t('countProStep1')}</p>
                                                </Col>
                                            </Row>
                                            <ProgressBar
                                                radius={80}
                                                progress={progressStats && progressStats.max ? (progressStats.current / progressStats.max * 100).toFixed(1) : 0}
                                                cut={90}
                                                initialAnimation
                                                initialAnimationDelay={1000}
                                                strokeColor="rgba(242, 159, 255, 1)"
                                                transition="1s ease"
                                                rotate={-224}
                                                trackStrokeColor="rgba(255, 255, 255, 0.2)"
                                            />
                                            <div className="progress-text">
                                                <p>{progressStats && progressStats.current || 0}k €</p>
                                                <span>{progressStats && progressStats.max ? (progressStats.current / progressStats.max * 100).toFixed(1) : 0}%</span>
                                            </div>
                                            <Row>
                                                <Col lg={{ size: 6 }}>
                                                    <span className="first-text">{progressStats && progressStats.min || 0}k €</span>
                                                </Col>
                                                <Col lg={{ size: 6 }} className="count-step">
                                                    <span className="second-text">{progressStats && progressStats.max || 0}k €</span>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                }
                                {
                                    progressStats && progressStats.step && progressStats.step === 2 &&
                                    <Col lg={{ size: 3 }} className="count-progress-circle-2">
                                        <div className="count-progress-2">
                                            <Row>
                                                <Col lg={{ size: 6 }} xs={{ size: 6 }} className="count-step">
                                                    <img src={Counticon1} />
                                                </Col>
                                                <Col lg={{ size: 6 }} xs={{ size: 6 }} className="count-step">
                                                    <p>{t('countProStep2')}</p>
                                                </Col>
                                            </Row>
                                            <ProgressBar
                                                radius={80}
                                                progress={progressStats && progressStats.max ? (progressStats.current / progressStats.max * 100).toFixed(1) : 0}
                                                cut={90}
                                                initialAnimation
                                                initialAnimationDelay={1000}
                                                strokeColor="rgba(160,255,102,1)"
                                                transition="1s ease"
                                                rotate={-224}
                                                trackStrokeColor="rgba(255, 255, 255, 0.2)"
                                            />
                                            <div className="progress-text">
                                                <p>{progressStats && progressStats.current || 0}k €</p>
                                                <span>{progressStats && progressStats.max ? (progressStats.current / progressStats.max * 100).toFixed(1) : 0}%</span>
                                            </div>
                                            <Row>
                                                <Col lg={{ size: 6 }}>
                                                    <span className="first-text">{progressStats && progressStats.min || 0}k €</span>
                                                </Col>
                                                <Col lg={{ size: 6 }} className="count-step">
                                                    <span className="second-text">{progressStats && progressStats.max || 0}k €</span>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                }
                                {
                                    progressStats && progressStats.step && progressStats.step === 3 &&
                                    <Col lg={{ size: 3 }} className="count-progress-circle-3">
                                        <div className="count-progress-3">
                                            <Row>
                                                <Col lg={{ size: 6 }} xs={{ size: 6 }} className="count-step">
                                                    <img src={Counticon1} />
                                                </Col>
                                                <Col lg={{ size: 6 }} xs={{ size: 6 }} className="count-step">
                                                    <p>{t('countProStep3')}</p>
                                                </Col>
                                            </Row>
                                            <ProgressBar
                                                radius={80}
                                                progress={progressStats && progressStats.max ? (progressStats.current / progressStats.max * 100).toFixed(1) : 0}
                                                cut={90}
                                                initialAnimation
                                                initialAnimationDelay={1000}
                                                strokeColor="rgba(232,70,128,1)"
                                                transition="1s ease"
                                                rotate={-224}
                                                trackStrokeColor="rgba(255, 255, 255, 0.2)"
                                            />
                                            <div className="progress-text">
                                                <p>{progressStats && progressStats.current || 0}k €</p>
                                                <span>{progressStats && progressStats.max ? (progressStats.current / progressStats.max * 100).toFixed(1) : 0}%</span>
                                            </div>
                                            <Row>
                                                <Col lg={{ size: 6 }}>
                                                    <span className="first-text">{progressStats && progressStats.min || 0}k €</span>
                                                </Col>
                                                <Col lg={{ size: 6 }} className="count-step">
                                                    <span className="second-text">{progressStats && progressStats.max || 0}k €</span>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                }
                                {
                                    progressStats && progressStats.step && progressStats.step === 4 &&
                                    <Col lg={{ size: 3 }} className="count-progress-circle-4">
                                        <div className="count-progress-4">
                                            <Row>
                                                <Col lg={{ size: 6 }} xs={{ size: 6 }} className="count-step">
                                                    <img src={Counticon1} />
                                                </Col>
                                                <Col lg={{ size: 6 }} xs={{ size: 6 }} className="count-step">
                                                    <p>{t('countProStep4')}</p>
                                                </Col>
                                            </Row>
                                            <ProgressBar
                                                radius={80}
                                                progress={progressStats && progressStats.max ? (progressStats.current / progressStats.max * 100).toFixed(1) : 0}
                                                cut={90}
                                                initialAnimation
                                                initialAnimationDelay={1000}
                                                strokeColor="rgba(255,184,0,1)"
                                                transition="1s ease"
                                                rotate={-224}
                                                trackStrokeColor="rgba(255, 255, 255, 0.2)"
                                            />
                                            <div className="progress-text">
                                                <p>{progressStats && progressStats.current || 0}k €</p>
                                                <span>{progressStats && progressStats.max ? (progressStats.current / progressStats.max * 100).toFixed(1) : 0}%</span>
                                            </div>
                                            <Row>
                                                <Col lg={{ size: 6 }}>
                                                    <span className="first-text">{progressStats && progressStats.min || 0}k €</span>
                                                </Col>
                                                <Col lg={{ size: 6 }} className="count-step">
                                                    <span className="second-text">{progressStats && progressStats.max || 0}k €</span>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                }
                            </Row>
                        </div>
                    </div>
                    <Container className="product-container">
                        {/* NFTS LISTINGS*/}
                        <Row className="product-row">
                            {
                                investorsNfts
                                    .map((item, index) => (
                                        <Col key={'nft-lis-' + index} md="3" className="product-item">
                                            <div className="box">
                                                {/*<div className="num">{item.qty}</div>
                                                <div className="text">{t('nftQuantity')}</div>*/}
                                                {
                                                    index === 0 &&
                                                    <div className="product-wrapper">
                                                        <img src={Caps1} alt="product_img" />
                                                    </div>
                                                }
                                                {
                                                    index === 1 &&
                                                    <div className="product-wrapper">
                                                        <img src={Caps2} alt="product_img" />
                                                    </div>
                                                }
                                                {
                                                    index === 2 &&
                                                    <div className="product-wrapper">
                                                        <img src={Caps3} alt="product_img" />
                                                    </div>
                                                }
                                                {
                                                    index === 3 &&
                                                    <div className="product-wrapper">
                                                        <img src={Caps4} alt="product_img" />
                                                    </div>
                                                }
                                                {
                                                    index === 4 &&
                                                    <div className="product-wrapper">
                                                        <img src={Caps5} alt="product_img" />
                                                    </div>
                                                }
                                                {
                                                    index === 5 &&
                                                    <div className="product-wrapper">
                                                        <img src={Caps6} alt="product_img" />
                                                    </div>
                                                }
                                                {
                                                    index === 6 &&
                                                    <div className="product-wrapper">
                                                        <img src={Caps7} alt="product_img" />
                                                    </div>
                                                }
                                                {
                                                    index === 7 &&
                                                    <div className="product-wrapper">
                                                        <img src={Caps8} alt="product_img" />
                                                    </div>
                                                }
                                                <div className="description-box">
                                                    <div className="caps">#{index + 1}</div>
                                                    {
                                                        index === 0 &&
                                                        <div>
                                                            <div className="caps">{t('nftFrom')} 1€ <span style={{ color: 'yellow' }}>Bonus 10%</span></div>
                                                            <div className="caps">Token price : 0,0072€</div>
                                                            <div className="quantity">&nbsp;<br />&nbsp;</div>
                                                        </div>
                                                    }
                                                    {
                                                        index === 1 &&
                                                        <div>
                                                            <div className="caps">{t('nftFrom')} 250€ <span style={{ color: 'yellow' }}>Bonus 15%</span></div>
                                                            <div className="caps">Token price : 0,0068€</div>
                                                            <div className="quantity">{t('nftQuantityText')}</div>
                                                        </div>
                                                    }
                                                    {
                                                        index === 2 &&
                                                        <div>
                                                            <div className="caps">{t('nftFrom')} 750€ <span style={{ color: 'yellow' }}>Bonus 20%</span></div>
                                                            <div className="caps">Token price : 0,0064€</div>
                                                            <div className="quantity">{t('nftQuantityText')}</div>
                                                        </div>
                                                    }
                                                    {
                                                        index === 3 &&
                                                        <div>
                                                            <div className="caps">{t('nftFrom')} 1500€ <span style={{ color: 'yellow' }}>Bonus 25%</span></div>
                                                            <div className="caps">Token price : 0,0060€</div>
                                                            <div className="quantity">{t('nftQuantityText')}</div>
                                                        </div>
                                                    }
                                                    {
                                                        index === 4 &&
                                                        <div>
                                                            <div className="caps">{t('nftFrom')} 2000€ <span style={{ color: 'yellow' }}>Bonus 30%</span></div>
                                                            <div className="caps">Token price : 0,0056€</div>
                                                            <div className="quantity">{t('nftQuantityText')}</div>
                                                        </div>
                                                    }
                                                    {
                                                        index === 5 &&
                                                        <div>
                                                            <div className="caps">{t('nftFrom')} 5000€ <span style={{ color: 'yellow' }}>Bonus 35%</span></div>
                                                            <div className="caps">Token price : 0,0052€</div>
                                                            <div className="quantity">{t('nftQuantityText')}</div>
                                                        </div>
                                                    }
                                                    {
                                                        index === 6 &&
                                                        <div>
                                                            <div className="caps">{t('nftFrom')} 10000€ <span style={{ color: 'yellow' }}>Bonus 40%</span></div>
                                                            <div className="caps">Token price : 0,0048€</div>
                                                            <div className="quantity">{t('nftQuantityText')}</div>
                                                        </div>
                                                    }
                                                    {
                                                        index === 7 &&
                                                        <div>
                                                            <div className="caps">{t('nftFrom')} 15000€ <span style={{ color: 'yellow' }}>Bonus 50%</span></div>
                                                            <div className="caps">Token price : 0,0040€</div>
                                                            <div className="quantity">{t('nftQuantityText')}</div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                    ))
                            }
                        </Row>
                    </Container>
                </Col>
                <Col lg={3} className="right_content_wrapper">
                    <Container className="right_wrapper">
                        {
                            connectedAccountAddress && connectedAccountAddress.length > 0 &&
                            <div className="number" onClick={() => onAddressClick(chainType, connectedAccountAddress)}>
                                {connectedAccountAddress || 'No account connected'}
                                {
                                    chainType && chainType == '0x38' &&
                                    <div className="crypto-icon"><img src={BinanaceIcon} alt="product_img" /></div>
                                }
                                {
                                    chainType && chainType == '0x1' &&
                                    <div className="crypto-icon"><img src={EthereumIcon} alt="product_img" /></div>
                                }
                            </div>
                        }
                        {
                            myPocketCaps > 0 &&
                            <div className="balance_wrapper">
                                <div className="balance">{t('walletNftRightText1')}</div>
                                <div className="num_caps">{myPocketCaps.toFixed(1)} CAPS</div>
                            </div>
                        }
                        {
                            vesting2 &&
                            <div className="balance_wrapper">
                                <div className="left-heading-card">Airdrop : <span className="num_caps">{vesting2.tokens} CAPS</span></div>
                                <div className="lock_period_wrapper">
                                    <div className="lock_period">{t('walletNftRightText2')}</div>
                                    <div className="date_lock_wrapper">
                                        <div className="date_wrapper">
                                            <div className="date">{moment(vesting2.vesting1).format('DD/MM/YYYY')}</div>
                                            <div className="date">{moment(vesting2.vesting2).format('DD/MM/YYYY')}</div>
                                            <div className="date">{moment(vesting2.vesting3).format('DD/MM/YYYY')}</div>
                                            {
                                                (vesting2 && vesting2.vesting4) &&
                                                <div className="date">{moment(vesting2.vesting4).format('DD/MM/YYYY')}</div>
                                            }
                                        </div>
                                        <div className="num_caps_wrapper">
                                            <div className="caps_num">{vesting2.vesting1price.toFixed(1)} CAPS</div>
                                            <div className="caps_num">{vesting2.vesting2price.toFixed(1)} CAPS</div>
                                            <div className="caps_num">{vesting2.vesting3price.toFixed(1)} CAPS</div>
                                            {
                                                (vesting2 && vesting2.vesting4) &&
                                                <div className="caps_num">{vesting2.vesting4price.toFixed(1)} CAPS</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="button_wrapper">
                                    <div className="btn_claim" onClick={onOpenClaimModal}>{t('walletNftRightButton')}</div>
                                </div>
                            </div>
                        }
                        {
                            vesting1 &&
                            <div className="balance_wrapper">
                                <div className="left-heading-card">Presale 1 : <span className="num_caps">{vesting1.tokens} CAPS</span></div>
                                <div className="lock_period_wrapper">
                                    <div className="lock_period">{t('walletNftRightText2')}</div>
                                    <div className="date_lock_wrapper">
                                        <div className="date_wrapper">
                                            <div className="date">{moment(vesting1.vesting1).format('DD/MM/YYYY')}</div>
                                            <div className="date">{moment(vesting1.vesting2).format('DD/MM/YYYY')}</div>
                                            <div className="date">{moment(vesting1.vesting3).format('DD/MM/YYYY')}</div>
                                            {
                                                (vesting1 && vesting1.vesting4) &&
                                                <div className="date">{moment(vesting1.vesting4).format('DD/MM/YYYY')}</div>
                                            }
                                        </div>
                                        <div className="num_caps_wrapper">
                                            <div className="caps_num">{vesting1.vesting1price.toFixed(1)} CAPS</div>
                                            <div className="caps_num">{vesting1.vesting2price.toFixed(1)} CAPS</div>
                                            <div className="caps_num">{vesting1.vesting3price.toFixed(1)} CAPS</div>
                                            {
                                                (vesting1 && vesting1.vesting4) &&
                                                <div className="caps_num">{vesting1.vesting4price.toFixed(1)} CAPS</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="button_wrapper">
                                    <div className="btn_claim" onClick={onOpenClaimModal}>{t('walletNftRightButton')}</div>
                                </div>
                            </div>
                        }
                        {
                            vesting3 &&
                            <div className="balance_wrapper">
                                <div className="left-heading-card">Presale 2 ETH : <span className="num_caps">{vesting3.tokens} CAPS</span></div>
                                <div className="lock_period_wrapper">
                                    <div className="lock_period">{t('walletNftRightText2')}</div>
                                    <div className="date_lock_wrapper">
                                        <div className="date_wrapper">
                                            <div className="date">{moment(vesting3.vesting1).format('DD/MM/YYYY')}</div>
                                            <div className="date">{moment(vesting3.vesting2).format('DD/MM/YYYY')}</div>
                                            <div className="date">{moment(vesting3.vesting3).format('DD/MM/YYYY')}</div>
                                            {
                                                (vesting3 && vesting3.vesting4) &&
                                                <div className="date">{moment(vesting3.vesting4).format('DD/MM/YYYY')}</div>
                                            }
                                        </div>
                                        <div className="num_caps_wrapper">
                                            <div className="caps_num">{vesting3.vesting1price.toFixed(1)} CAPS</div>
                                            <div className="caps_num">{vesting3.vesting2price.toFixed(1)} CAPS</div>
                                            <div className="caps_num">{vesting3.vesting3price.toFixed(1)} CAPS</div>
                                            {
                                                (vesting3 && vesting3.vesting4) &&
                                                <div className="caps_num">{vesting3.vesting4price.toFixed(1)} CAPS</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="button_wrapper">
                                    <div className="btn_claim" onClick={onOpenClaimModal}>{t('walletNftRightButton')}</div>
                                </div>
                            </div>
                        }
                        {
                            vesting4 &&
                            <div className="balance_wrapper">
                                <div className="left-heading-card">Presale 2 BSC : <span className="num_caps">{vesting4.tokens} CAPS</span></div>
                                <div className="lock_period_wrapper">
                                    <div className="lock_period">{t('walletNftRightText2')}</div>
                                    <div className="date_lock_wrapper">
                                        <div className="date_wrapper">
                                            <div className="date">{moment(vesting4.vesting1).format('DD/MM/YYYY')}</div>
                                            <div className="date">{moment(vesting4.vesting2).format('DD/MM/YYYY')}</div>
                                            <div className="date">{moment(vesting4.vesting3).format('DD/MM/YYYY')}</div>
                                            {
                                                (vesting4 && vesting4.vesting4) &&
                                                <div className="date">{moment(vesting4.vesting4).format('DD/MM/YYYY')}</div>
                                            }
                                        </div>
                                        <div className="num_caps_wrapper">
                                            <div className="caps_num">{vesting4.vesting1price.toFixed(1)} CAPS</div>
                                            <div className="caps_num">{vesting4.vesting2price.toFixed(1)} CAPS</div>
                                            <div className="caps_num">{vesting4.vesting3price.toFixed(1)} CAPS</div>
                                            {
                                                (vesting4 && vesting4.vesting4) &&
                                                <div className="caps_num">{vesting4.vesting4price.toFixed(1)} CAPS</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="button_wrapper">
                                    <div className="btn_claim" onClick={onOpenClaimModal}>{t('walletNftRightButton')}</div>
                                </div>
                            </div>
                        }
                        {
                            vesting5 &&
                            <div className="balance_wrapper">
                                <div className="left-heading-card">Presale 2 Wire Transfer : <span className="num_caps">{vesting5.tokens} CAPS</span></div>
                                <div className="lock_period_wrapper">
                                    <div className="lock_period">{t('walletNftRightText2')}</div>
                                    <div className="date_lock_wrapper">
                                        <div className="date_wrapper">
                                            <div className="date">{moment(vesting5.vesting1).format('DD/MM/YYYY')}</div>
                                            <div className="date">{moment(vesting5.vesting2).format('DD/MM/YYYY')}</div>
                                            <div className="date">{moment(vesting5.vesting3).format('DD/MM/YYYY')}</div>
                                            {
                                                (vesting5 && vesting5.vesting4) &&
                                                <div className="date">{moment(vesting5.vesting4).format('DD/MM/YYYY')}</div>
                                            }
                                        </div>
                                        <div className="num_caps_wrapper">
                                            <div className="caps_num">{vesting5.vesting1price.toFixed(1)} CAPS</div>
                                            <div className="caps_num">{vesting5.vesting2price.toFixed(1)} CAPS</div>
                                            <div className="caps_num">{vesting5.vesting3price.toFixed(1)} CAPS</div>
                                            {
                                                (vesting5 && vesting5.vesting4) &&
                                                <div className="caps_num">{vesting5.vesting4price.toFixed(1)} CAPS</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="button_wrapper">
                                    <div className="btn_claim" onClick={onOpenClaimModal}>{t('walletNftRightButton')}</div>
                                </div>
                            </div>
                        }

                        {
                            vesting6 &&
                            <div className="balance_wrapper">
                                <div className="left-heading-card">Others : <span className="num_caps">{vesting6.tokens} CAPS</span></div>
                                <div className="lock_period_wrapper">
                                    <div className="lock_period">{t('walletNftRightText2')}</div>
                                    <div className="date_lock_wrapper">
                                        <div className="date_wrapper">
                                            <div className="date">{moment(vesting6.vesting1).format('DD/MM/YYYY')}</div>
                                            <div className="date">{moment(vesting6.vesting2).format('DD/MM/YYYY')}</div>
                                            <div className="date">{moment(vesting6.vesting3).format('DD/MM/YYYY')}</div>
                                            {
                                                (vesting6 && vesting6.vesting4) &&
                                                <div className="date">{moment(vesting6.vesting4).format('DD/MM/YYYY')}</div>
                                            }
                                        </div>
                                        <div className="num_caps_wrapper">
                                            <div className="caps_num">{vesting6.vesting1price.toFixed(1)} CAPS</div>
                                            <div className="caps_num">{vesting6.vesting2price.toFixed(1)} CAPS</div>
                                            <div className="caps_num">{vesting6.vesting3price.toFixed(1)} CAPS</div>
                                            {
                                                (vesting6 && vesting6.vesting4) &&
                                                <div className="caps_num">{vesting6.vesting4price.toFixed(1)} CAPS</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="button_wrapper">
                                    <div className="btn_claim" onClick={onOpenClaimModal}>{t('walletNftRightButton')}</div>
                                </div>
                            </div>
                        }

                        {
                            /* YOUR NFTS */
                            <div className="balance_wrapper your-ternoarts-wrapper">
                                <div className="left-card-heading">{t('yourTernoart')}</div>
                                <Row style={{ marginTop: 10 }}>
                                    {
                                      myPocket >= 1 &&
                                      <Col xs={{size: 4}}>
                                          <img src={Caps1} />
                                      </Col>    
                                    }
                                    {
                                      myPocket >= 250 &&
                                      <Col xs={{size: 4}}>
                                          <img src={Caps2} />
                                      </Col>    
                                    }
                                    {
                                      myPocket >= 750 &&
                                      <Col xs={{size: 4}}>
                                          <img src={Caps3} />
                                      </Col>    
                                    }
                                </Row>
                                <Row style={{ marginTop: 10 }}>
                                    {
                                      myPocket >= 1500 &&
                                      <Col xs={{size: 4}}>
                                          <img src={Caps4} />
                                      </Col>    
                                    }
                                    {
                                      myPocket >= 2000 &&
                                      <Col xs={{size: 4}}>
                                          <img src={Caps5} />
                                      </Col>    
                                    }
                                    {
                                      myPocket >= 5000 &&
                                      <Col xs={{size: 4}}>
                                          <img src={Caps6} />
                                      </Col>    
                                    }
                                </Row>
                                <Row style={{ marginTop: 10 }}>
                                    {
                                      myPocket >= 10000 &&
                                      <Col xs={{size: 4}}>
                                          <img src={Caps7} />
                                      </Col>    
                                    }
                                    {
                                      myPocket >= 15000 &&
                                      <Col xs={{size: 4}}>
                                          <img src={Caps8} />
                                      </Col>    
                                    }
                                </Row>
                                <div className="button_wrapper">
                                    <div className="btn_claim" onClick={onOpenClaimModal}>{t('walletNftRightButton')}</div>
                                </div>
                            </div>
                        }

                        {/*
                          <div className="balance_time_wrapper">
                            <h3>{t('cardTime')}</h3>
                            <img src={TimeIcon} alt="img" />
                            <div className="time">0.0000</div>
                            <div className="time-text">{t('cardTimeEarn')}</div>
                            <Row className="title-num">
                                <div className="left-sub-title col-lg-6">
                                    APY:
                                </div>
                                <div className="right-num col-lg-6">
                                    137.59%
                                </div>
                                <div className="left-sub-title col-lg-6">
                                    {t('cardYourStake')}:
                                </div>
                                <div className="right-num col-lg-6">
                                    0.0000
                                </div>
                            </Row>
                            <div className="harvest-btn">{t('harvest')}</div>
                          </div>
                      */}
                        <div className="balance_condition_wrapper">
                            <h3>{t('nftCardTitle')}</h3>
                            <div className="text-1">
                                {t('nftCardPara1')}
                            </div>
                            <div className="text-1">
                                {t('nftCardPara2')}
                            </div>
                            <div className="text-1">
                                <a className="text-white" href="https://intercom.help/ternoa/fr/articles/4974659-general-conditions-of-sale" target="_blank">General Conditions of Sale</a>
                            </div>
                        </div>

                    </Container>
                </Col>
            </Row>
        </div >
    );
}

const mapStateToProps = ({ auth }) => {
    const { user } = auth;
    return {
        user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLogout: (history) => dispatch(logoutUser(history)),
        onUpdateAccountConnected: (payload) => dispatch(addMetamaskAddressAction(payload))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NFTWallet)