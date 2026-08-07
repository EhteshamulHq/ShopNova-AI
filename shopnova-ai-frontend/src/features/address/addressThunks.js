import { createAsyncThunk } from "@reduxjs/toolkit";

import { addressApi } from "../../api/address.api";

/*
|--------------------------------------------------------------------------
| GET ADDRESSES
|--------------------------------------------------------------------------
*/

export const getAddresses =
  createAsyncThunk(
    "address/getAddresses",
    async (_, { rejectWithValue }) => {
      try {
        const { data } =
          await addressApi.getAddresses();

        return data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Unable to fetch addresses."
        );
      }
    }
  );

  /*
|--------------------------------------------------------------------------
| GET ADDRESS BY ID
|--------------------------------------------------------------------------
*/

export const getAddressById =
  createAsyncThunk(
    "address/getAddressById",
    async (id, { rejectWithValue }) => {
      try {
        const { data } =
          await addressApi.getAddress(id);

        return data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Unable to fetch address."
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| ADD ADDRESS
|--------------------------------------------------------------------------
*/

export const addAddress =
  createAsyncThunk(
    "address/addAddress",
    async (payload, { rejectWithValue }) => {
      try {
        const { data } =
          await addressApi.addAddress(
            payload
          );

        return data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Unable to add address."
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| UPDATE ADDRESS
|--------------------------------------------------------------------------
*/

export const updateAddress =
  createAsyncThunk(
    "address/updateAddress",
    async (
      { id, payload },
      { rejectWithValue }
    ) => {
      try {
        const { data } =
          await addressApi.updateAddress(
            id,
            payload
          );

        return data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Unable to update address."
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| DELETE ADDRESS
|--------------------------------------------------------------------------
*/

export const deleteAddress =
  createAsyncThunk(
    "address/deleteAddress",
    async (id, { rejectWithValue }) => {
      try {
        await addressApi.deleteAddress(id);

        return id;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Unable to delete address."
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| SET DEFAULT ADDRESS
|--------------------------------------------------------------------------
*/

export const setDefaultAddress =
  createAsyncThunk(
    "address/setDefaultAddress",
    async (id, { rejectWithValue }) => {
      try {
        const { data } =
          await addressApi.setDefaultAddress(
            id
          );

        return data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Unable to update default address."
        );
      }
    }
  );