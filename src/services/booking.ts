import api from './api';

export const bookingService = {
  createBooking: async (data: {
    categories: { category: string; subCategory: string }[];
    pickupDate: string;
    timeSlot: string;
    address: {
      fullAddress: string;
      location: {
        type: 'Point';
        coordinates: [number, number];
      };
    };
    specialInstruction?: string;
  }) => {
    try {
      const response = await api.post('/api/v1/bookings', data);
      return response.data;
    } catch (error) {
      console.error('Create Booking Error:', error);
      throw error;
    }
  },

  getBookingById: async (id: string) => {
    try {
      const response = await api.get(`/api/v1/bookings/${id}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Get Booking Error:', error);
      throw error;
    }
  },

  getMyBookings: async () => {
    try {
      const response = await api.get('/api/v1/bookings/my-bookings');
      return response.data.data || response.data;
    } catch (error) {
      console.error('Get Bookings Error:', error);
      throw error;
    }
  },

  cancelBooking: async (id: string) => {
    try {
      const response = await api.patch(`/api/v1/bookings/${id}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Cancel Booking Error:', error);
      throw error;
    }
  },

  submitRating: async (bookingId: string, rating: number, comment: string) => {
    try {
      const response = await api.post(`/api/v1/bookings/${bookingId}/rating`, { rating, comment });
      return response.data;
    } catch (error) {
      console.error('Submit Rating Error:', error);
      throw error;
    }
  },
};
