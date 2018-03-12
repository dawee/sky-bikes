export const getLoginFormEmail = state => state.page.form.email.value;

export const getRegisterFormPayload = state => ({
  firstName: state.page.form.firstName.value,
  lastName: state.page.form.lastName.value,
  emergencyPhoneNumber: state.page.form.emergencyPhoneNumber.value,
  email: state.page.form.email.value
});

export const getCurrentMember = state => state.members[state.currentMemberUUID];
