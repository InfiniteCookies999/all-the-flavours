
const phoneDashPattern = /^(\d)*(-(\d)*)?(-(\d)*)?$/;
const phoneParanPattern = /^\((\d)*\)((\d)*)?$/;
const paranDashPhonePattern = /^\((\d)*\)(-(\d)*)?(-(\d)*)?$/;


const phoneInputRestrictor = (event) => {
  let phone = event.target.value;
  // Making sure it is either all digits or
  // digits with dashes or dashes + parenthesis.
  const isParanPattern = paranDashPhonePattern.test(phone) ||
                         phoneParanPattern.test(phone);

  if (!phoneDashPattern.test(phone) && !isParanPattern) {
    event.preventDefault();
    return null;
  }
  if (isParanPattern) {
    phone = phone.substring(1).replace(")", "");
  }

  const dashCount = (phone.match(/-/g) || []).length;
  if (dashCount >= 1 && phone.indexOf("-") !== 3) {
    event.preventDefault();
    return null;
  }
  if (dashCount >= 2 && phone.indexOf("-", 4) !== 7) {
    event.preventDefault();
    return null;
  }

  // Inserting dashes at appropriate locations.
  const phoneNoDashes = phone.replaceAll("-", "");
  if (phoneNoDashes.length > 10) {
    event.preventDefault();
    return null;
  }
  if (phoneNoDashes.length > 6) {
    phone = phoneNoDashes.substring(0, 3) + '-' +
            phoneNoDashes.substring(3, 6) + '-' +
            phoneNoDashes.substring(6);
  } else if (phoneNoDashes.length > 3) {
    phone = phoneNoDashes.substring(0, 3) + '-' +
            phoneNoDashes.substring(3);
  }

  if (phone.endsWith('-')) {
    phone = phone.substring(0, phone.length - 1);
  }

  return phone;
};

export default phoneInputRestrictor;
