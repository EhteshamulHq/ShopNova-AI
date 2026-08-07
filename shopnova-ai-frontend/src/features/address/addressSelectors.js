export const selectAddresses = (state) =>
  state.address.addresses;

export const selectSelectedAddress = (state) =>
  state.address.selectedAddress;

export const selectAddressLoading = (state) =>
  state.address.loading;

export const selectAddressError = (state) =>
  state.address.error;

export const selectAddressSuccess = (state) =>
  state.address.success;

export const selectDefaultAddress = (state) =>
  state.address.addresses.find(
    (address) => address.isDefault
  );