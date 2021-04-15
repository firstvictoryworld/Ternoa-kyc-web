// import { useTranslation } from 'react-i18next';
export const LoginValidator = (inputs, lang) => {
  const errors = {};

  if(lang === 'en') {
    if (!inputs.email) {
        errors.email = 'Email is required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)
    ) {
        errors.email = 'Invalid email address';
    }
    //Password Errors
    if(!inputs.password){
        errors.password = 'Password is required'
    }
  }

  if(lang === 'fr') {
    if (!inputs.email) {
        errors.email = 'Email est requis';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)
    ) {
        errors.email = 'Adresse e-mail invalide';
    }
    //Password Errors
    if(!inputs.password){
        errors.password = 'Mot de passe requis'
    } 
  }
  
  return errors;
}

export const SignUpValidator = (inputs, lang) => {
  const errors = {};
  const passPattern = new RegExp('^(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}');

  if(lang === 'en') {
    if (!inputs.email) {
      errors.email = 'Email is required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)
    ) {
        errors.email = 'Invalid email address';
    }

    // if(!inputs.phone){
    //     errors.phone = 'Phone is required'
    // }
    
    // //Password Errors
    if(!inputs.password){
        errors.password = 'Password is required'
    }
    if(!(passPattern.test(inputs.password))) {
       errors.password = 'Minimum eight characters, at least one number and one special character' 
    }
    if (!inputs.password || !inputs.confirmPassword) {
      // errors.password = "Please enter in both fields";
      errors.confirmPassword = "Please enter same password";
    } else if (inputs.password.length < 3) {
      errors.password = "Password must contain at least 3 letters"
    } else if (inputs.password !== inputs.confirmPassword) {
      errors.confirmPassword = "Both passwords must be same"
    }

    if (!inputs.cgu && !inputs.saft) {
      // console.log(inputs.cgu, inputs.saft)
      errors.cgu = 'Please check the CGU agreement'
      errors.saft = 'Please check the SAFT agreement'
    } else if (!inputs.cgu) {
      errors.cgu = 'Please check the CGU agreement'
    } else if(!inputs.saft) {
      errors.saft = 'Please check the SAFT agreement'
    }
  }

  if(lang === 'fr') {
    if (!inputs.email) {
      errors.email = 'Email est requis';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)
    ) {
        errors.email = 'Adresse e-mail invalide';
    }

    // if(!inputs.phone){
    //     errors.phone = 'Le téléphone est requis'
    // }
    
    // //Password Errors
    if(!inputs.password){
        errors.password = 'Mot de passe requis'
    }
    if(!(passPattern.test(inputs.password))) {
       errors.password = 'Minimum huit caractères, au moins un chiffre et un caractère spécial' 
    }
    if (!inputs.password || !inputs.confirmPassword) {
      // errors.password = "Please enter in both fields";
      errors.confirmPassword = "Veuillez saisir le même mot de passe";
    } else if (inputs.password.length < 3) {
      errors.password = "Le mot de passe doit contenir au moins 3 lettres"
    } else if (inputs.password !== inputs.confirmPassword) {
      errors.confirmPassword = "Les deux mots de passe doivent être identiques"
    }

    if (!inputs.cgu && !inputs.saft) {
      // console.log(inputs.cgu, inputs.saft)
      errors.cgu = "Veuillez vérifier l'accord CGU"
      errors.saft = "Veuillez vérifier l'accord SAFT"
    } else if (!inputs.cgu) {
      errors.cgu = "Veuillez vérifier l'accord CGU"
    } else if(!inputs.saft) {
      errors.saft = "Veuillez vérifier l'accord SAFT"
    }
  }


  return errors;
}