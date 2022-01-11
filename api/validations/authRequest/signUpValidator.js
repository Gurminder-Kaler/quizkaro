const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = "";

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.dob = !isEmpty(data.dob) ? data.dob : "";
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.accountType = !isEmpty(data.accountType) ? data.accountType : "";
  data.mobileNo = !isEmpty(data.mobileNo) ? data.mobileNo : "";

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors = "First name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.firstName)) {
    errors = "First name field is required";
  }

  if (Validator.isEmpty(data.role)) {
    errors = "Role field is required";
  }

  if (!Validator.isIn(data.role, ["CUSTOMER", "ADMIN"])) {
    errors = "Role can either be ADMIN or CUSTOMER only!";
  }
  // if (Validator.isEmpty(data.email)) {
  //     errors = 'Email field is required';
  // } else {
  //     if (!Validator.isEmail(data.email)) {
  //         errors = 'Email is invalid';
  //     }
  // }

  if (Validator.isEmpty(data.accountType)) {
    errors = "Account Type field is required";
  }

  if (!Validator.isIn(data.accountType, ["general", "business"])) {
    errors = "Account Type can either be business or general only!";
  }

  if (Validator.isEmpty(data.mobileNo)) {
    errors = "Mobile No. field is required";
  } else {
    if (!Validator.isLength(data.mobileNo, { max: 10 })) {
      errors = "Mobile No. must be at least 10 characters";
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors = "Password field is required";
  } else {
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors = "Password must be at least 6 characters";
    }
  }

  // if (Validator.isEmpty(data.password2)) {
  //     errors = 'Confirm Password field is required';
  // }

  // if (!Validator.equals(data.password, data.password2)) {
  //     errors = 'Passwords do not match';
  // }

  if (Validator.isEmpty(data.userName)) {
    errors = "User name field is required";
  } else {
    if (!Validator.isLength(data.userName, { min: 6, max: 30 })) {
      errors =
        "User name must be at least 6 characters and maximum 30 characters";
    }
  }

  if (Validator.isEmpty(data.dob)) {
    errors = "Date of birth is required";
  } else {
    var enteredAge = getAge(data.dob);
    console.log("enteredAge", enteredAge);
    if (enteredAge < 13) {
      errors = "You must be above or equal to 13 years of age to sign up";
    }

    function getAge(dob) {
      var today = new Date();
      var birthDate = new Date(dob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
