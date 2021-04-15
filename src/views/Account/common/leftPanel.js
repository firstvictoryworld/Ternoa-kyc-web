import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';
import Color44 from '../../../assets/images/Color44.png'

class LeftPanel extends Component {

    render() {
        const { t } = this.props;
        return (
            <div className="common-left-panel-wrapper">
                <img src={Color44} alt="img" />
                <div className="title"> {t("privateSale")} </div>
                <div className="content-wrapper">
                    {/* <div className="sub-title"> KYC </div> */}
                    <div className="content">
                        {t("signUpPara")}
                    </div>
                </div>
                <div className="customer-support">
                    <div className="sub-title">
                        {t("signUpHead1")}
                    </div>
                    <div className="content">
                        {t("signUpPara1")} <a href="mailto:support@ternoa.com">support@ternoa.com</a>
                    </div>
                   {/* <div className="sub-title mt-3 mb-2">
                        {t("howTo")}
                    </div>
                    <div className="content">
                        <a href="https://youtu.be/1X0AiJifHcA" target="_blank" className="btn btn-light mr-3">{t("privateSaleAccessTuto")}</a>
                        <a href="https://youtu.be/hmj_g5oZsio" target="_blank" className="btn btn-light">{t("metamaskInstallTuto")} </a>
        </div>*/}
                </div>
            </div>
        );
    }
}

export default withTranslation('common')(LeftPanel);
