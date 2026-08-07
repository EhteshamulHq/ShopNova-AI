import { createSlice } from "@reduxjs/toolkit";

import {
  getAddresses,
  getAddressById,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "./addressThunks";

const initialState = {
  addresses: [],

  selectedAddress: null,

  loading: false,

  error: null,

  success: null,
};

const addressSlice = createSlice({
  name: "address",

  initialState,

  reducers: {
    clearAddressError(state) {
      state.error = null;
    },

    clearAddressSuccess(state) {
      state.success = null;
    },

    setSelectedAddress(state, action) {
      state.selectedAddress = action.payload;
    },

    resetAddressState(state) {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder;

    /*
    |--------------------------------------------------------------------------
    | GET ADDRESSES
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getAddresses.fulfilled,
        (state, action) => {
          state.loading = false;

         state.addresses =
  action.payload.data || [];
        }
      )

      .addCase(
        getAddresses.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      );

    /*
    |--------------------------------------------------------------------------
    | ADD ADDRESS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        addAddress.fulfilled,
        (state, action) => {
          state.loading = false;

          const address =
  action.payload.data;

         if (address.isDefault) {
  state.addresses.forEach((item) => {
    item.isDefault = false;
  });
}

state.addresses.unshift(address);

          state.success =
            action.payload.message ||
            "Address added successfully.";
        }
      )

      .addCase(
        addAddress.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      );

      /*
|--------------------------------------------------------------------------
| GET ADDRESS BY ID
|--------------------------------------------------------------------------
*/

builder
  .addCase(
    getAddressById.pending,
    (state) => {
      state.loading = true;
      state.error = null;
    }
  )

  .addCase(
    getAddressById.fulfilled,
    (state, action) => {
      state.loading = false;

      state.selectedAddress =
        action.payload.data;
    }
  )

  .addCase(
    getAddressById.rejected,
    (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  );

    /*
    |--------------------------------------------------------------------------
    | UPDATE ADDRESS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        updateAddress.fulfilled,
        (state, action) => {
          state.loading = false;

         const updated =
  action.payload.data;

        state.addresses =
  state.addresses.map((item) =>
    item._id === updated._id
      ? updated
      : item
  );

state.selectedAddress =
  updated;

          state.success =
            action.payload.message ||
            "Address updated successfully.";
        }
      )

      .addCase(
        updateAddress.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      );

    /*
    |--------------------------------------------------------------------------
    | DELETE ADDRESS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        deleteAddress.fulfilled,
        (state, action) => {
          state.loading = false;

          state.addresses =
            state.addresses.filter(
              (item) =>
                item._id !== action.payload
            );

          state.success =
            "Address deleted successfully.";
        }
      )

      .addCase(
        deleteAddress.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      );

    /*
    |--------------------------------------------------------------------------
    | SET DEFAULT ADDRESS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(
        setDefaultAddress.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        setDefaultAddress.fulfilled,
        (state, action) => {
          state.loading = false;

          const updated =
            action.payload.address ||
            action.payload;

          state.addresses =
  state.addresses.map((item) => ({
    ...item,
    isDefault:
      item._id === updated._id,
  }));

state.selectedAddress =
  updated;

          state.success =
            action.payload.message ||
            "Default address updated.";
        }
      )

      .addCase(
        setDefaultAddress.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      );
  },
});

export const {
  clearAddressError,
  clearAddressSuccess,
  setSelectedAddress,
  resetAddressState,
} = addressSlice.actions;

export default addressSlice.reducer;