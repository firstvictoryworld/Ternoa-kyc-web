var arrLang = {
  'en': {
    'signUpTitle': "Private sales",
    'kyc': "KYC",
    'signUpPara': "In order to participate in Ternoa's private sale, we need to identify users for security and legal reasons. You will then be asked for a KYC during the validation process.",
    'signUpHead1': "Any questions?",
    'signUpPara1': "Contact us at support@ternoa.com",
    'signUpHead2': "Already have an account?",
    'signUpLogin': "Log in",
    'signUpHead3': "Create an account",
    'signUpEmail': "Email",
    'signUpPass': "Password",
    'signUpConfirmPass': "Password Confirmation",
    'signUpPhone': "Phone",
    'signUpCheck1': "I have read the CGU",
    'signUpCheck2': "I have read the Saft", 
    'signUpButton': "Create my account",
    'loginSubPara': "Not have an account?",   
    'loginSignin': "Sign in",
    'loginForgetPass': "Forgot your password?",
    'loginPopTitle': "Recover Account",
    'loginPopDes': "Please enter email to recover your account",
    'loginButton': "Submit",
    "countProStep1": "Soft Cap",
    "countProStep2": "Hard Cap",
    'countProStep3': "STEP 3/4",
    'countProStep4': "STEP 4/4",
    'logOut': "Log out",
    'thankYou': "Thank you!",
    'thanksButton': "Start my kyc",
    'kycFinishTitle': "WELL DONE",
    'kycFinishPara': "Your profile is now being reviewed. You can expect it to finish in the next 24 hours. Sometimes it takes a few minutes...",
    'kycFinishButton': "Continue",
    'walletConnectTitle': "To acces our PRESALE, please connect your wallet",
    'walletConnectPara': "We recommand you to connect your Wallet using Metamask. Ledger, Trezor or Trustwallet. They are all compatible with Metamask.",
    'walletConnectButton': "Connect  wallet",
    'walletNftTitle': "Ternoa Presales Round 2",
    'walletNftSubTitle': "Buy CAPS and earn NFT",
    'walletNftPara': "Welcome to our seond round presales. The amount of the NFT is equal of the amount of CAPS you will get in return.",
    'walletNftBuy': "Buy 200€",
    'walletNftCondition': "Conditions :",
    'walletNftPoint1': "NFTs can be exchanged",
    'walletNftPoint2': "It will be possible to exchange them for CAPS after one year of lock",
    'walletNftRightText1': "Your balance",
    'walletNftRightText2': "Next lock period",
    'walletNftRightButton': "Claim"
  },
  'fr': {
    'signUpTitle': "ventes privées",
    'kyc': "KYC",
    'signUpPara': "Afin de participer à la vente privée de Ternoa, nous avons besoin d'identifier les utilisateurs pour des raisons de sécurité et de législation. Un KYC vous sera alors demandé lors du processus de validation.",
    'signUpHead1': "Des questions?",
    'signUpPara1': "Contactez-nous à support@ternoa.com",
    'signUpHead2': "Vous avez déjà un compte?",
    'signUpLogin': "Connexion",
    'signUpHead3': "Créer un compte",
    'signUpEmail': "E-mail",
    'signUpPass': "Mot de passe",
    'signUpConfirmPass': "Confirmation mot de passe",
    'signUpPhone': "Téléphone",
    'signUpCheck1': "J'ai lu le CGU",
    'signUpCheck2': "I have read the Saft", 
    'signUpButton': "Créer mon compte",
    'loginSubPara': "Vous n'avez pas de compte ?",
    'loginSignin': "S'identifier",
    'loginForgetPass': "Mot de passe oublié?",
    'loginPopTitle': "Récupérer le compte",
    'loginPopDes': "Veuillez saisir une adresse e-mail pour récupérer votre compte",
    'loginButton': "Nous faire parvenirs",
    'loginButton': "Nous faire parvenir",
    'countProStep1': "ÉTAPE 1/4",
    'countProStep2': "ÉTAPE 2/4",
    'countProStep3': "ÉTAPE 3/4",
    'countProStep4': "ÉTAPE 4/4",
    'logOut': "Se déconnecter",
    'thankYou': "Merci!",
    'thanksButton': "Démarrer mon kyc",
    'kycFinishTitle': "BIEN JOUÉ",
    'kycFinishPara': "Votre profil est en cours d'examen. Vous pouvez vous attendre à ce qu'il se termine dans les prochaines 24 heures. Parfois, cela prend quelques minutes ...",
    'kycFinishButton': "Continuez",
    'walletConnectTitle': "Pour accéder à notre PRÉVENTE, veuillez connecter votre portefeuille",
    'walletConnectPara': "Nous vous recommandons de connecter votre portefeuille à l'aide de Metamask. Ledger, Trezor ou Trustwallet. Ils sont tous compatibles avec Metamask.",
    'walletConnectButton': "Connecter le portefeuille",
    'walletNftTitle': "Préventes Ternoa Round 2",
    'walletNftSubTitle': "Achetez CAPS et gagnez du NFT",
    'walletNftPara': "Bienvenue à notre deuxième ronde de préventes. Le montant du NFT est égal au montant de CAPS que vous obtiendrez en retour.",
    'walletNftBuy': "Acheter 200€",
    'walletNftCondition': "Conditions :",
    'walletNftPoint1': "Les NFT peuvent être échangés",
    'walletNftPoint2': "Il sera possible de les échanger contre des CAPS après un an de verrouillage",
    'walletNftRightText1': "Votre solde",
    'walletNftRightText2': "Prochaine période de verrouillage",
    'walletNftRightButton': "Réclamer"
  }
};

// Process translation
$(function() {
  var set_lang = function (arrLang) {
        $("[data-translate]").each(function(){
           if($(this).is( "input" )){
              $(this).attr('placeholder',arrLang[$(this).data("translate")] )
           } else{
               $(this).text(arrLang[$(this).data("translate")])
           }
        })
    };

  var language = localStorage.getItem('m-spyin-language');
  var selectedCountry = '';
  // console.log(language);

  if(language) {
    $('#mLanguageSelect').val(language);
    selectedCountry = language;

    set_lang(arrLang[selectedCountry]);

    $('.m-lang').each(function(index, item) {
      $(this).text(arrLang[selectedCountry][$(this).attr('key')]);
    });
  }

  $("select.country").change(function() {
      selectedCountry = $(this).children("option:selected").val();
      set_lang(arrLang[selectedCountry]);
      localStorage.setItem('m-spyin-language', selectedCountry);
      $('.m-lang').each(function(index, item) {
        $(this).text(arrLang[selectedCountry][$(this).attr('key')]);
      });
  });
});