
const phonePattern = /^(\d)*(-(\d)*)?(-(\d)*)?$/;

const phoneInputRestrictor = (event) => {
  let phone = event.target.value;
  // Making sure it is either all digits or
  // digits with dashes in the correct positions.
  if (!phonePattern.test(phone)) {
    event.preventDefault();
    return null;
  }

  // Inserting dashes at appropriate locations.
  const phoneNoDashes = phone.replaceAll("-", "");
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
