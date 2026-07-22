import api from './api';

// Multiple saved addresses (Flipkart-style). One address is always the default —
// the backend promotes the first saved address, and re-points the flag on delete.
export type AddressLabel = 'Home' | 'Office' | 'Friend' | 'Other';

export interface SavedAddress {
  _id: string;
  label: AddressLabel;
  fullAddress: string;
  location: { type: 'Point'; coordinates: [number, number] }; // [lng, lat]
  isDefault: boolean;
}

const unwrap = (response: any): SavedAddress[] =>
  response?.data?.data || response?.data || [];

export const addressService = {
  list: async (): Promise<SavedAddress[]> => {
    try {
      const response = await api.get('/api/v1/users/addresses');
      return unwrap(response);
    } catch (error) {
      console.error('List Addresses Error:', error);
      throw error;
    }
  },

  add: async (data: {
    label: AddressLabel;
    fullAddress: string;
    longitude: number;
    latitude: number;
    isDefault?: boolean;
  }): Promise<SavedAddress[]> => {
    try {
      const response = await api.post('/api/v1/users/addresses', data);
      return unwrap(response);
    } catch (error) {
      console.error('Add Address Error:', error);
      throw error;
    }
  },

  update: async (
    addressId: string,
    data: Partial<{ label: AddressLabel; fullAddress: string; longitude: number; latitude: number; isDefault: boolean }>
  ): Promise<SavedAddress[]> => {
    try {
      const response = await api.patch(`/api/v1/users/addresses/${addressId}`, data);
      return unwrap(response);
    } catch (error) {
      console.error('Update Address Error:', error);
      throw error;
    }
  },

  remove: async (addressId: string): Promise<SavedAddress[]> => {
    try {
      const response = await api.delete(`/api/v1/users/addresses/${addressId}`);
      return unwrap(response);
    } catch (error) {
      console.error('Delete Address Error:', error);
      throw error;
    }
  },

  setDefault: async (addressId: string): Promise<SavedAddress[]> => {
    try {
      const response = await api.patch(`/api/v1/users/addresses/${addressId}/default`);
      return unwrap(response);
    } catch (error) {
      console.error('Set Default Address Error:', error);
      throw error;
    }
  },
};
