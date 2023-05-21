import { defineStore } from 'pinia';
import { apiReq } from '../../config/config';

let token = localStorage.getItem('access_token') || null;
let user = localStorage.getItem('user') || null;

export const useStore = defineStore('store', {
  state: () => {
    return {
      apiReq : apiReq,
      token: token,
      user: user
    }
  },
  getters: {
    loggedIn() {
      return token !== null
    }
  },
  actions: {
    setToken(payload: string | null) {
      token = payload
    },
    setUser(payload: string | null) {
      user = payload
    },
    async getActivities() {
      try {
        const { data } = await this.apiReq.get('/activities');
        return data;
      } catch (error) {
        throw `The api call failed with ${error}`;
      }
    },
    async getItems() {
      try {
        const { data } = await this.apiReq.get('/items');
        return data;
      } catch (error) {
        throw `The api call failed with ${error}`;
      }
    },
    async login(email: string, password: string) {
      try {
        const { data } = await this.apiReq.post('/login', {
          email,
          password
        });
        localStorage.setItem('access_token', data.token);
        localStorage.setItem('user',data.user.id);
        this.setToken(localStorage.getItem('access_token'));
        this.setUser(localStorage.getItem('user'));
        return data;
      } catch (error) {
          return error;
      }
    },
    async logout() {
      try {
        const { data } = await this.apiReq.get('/login');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        return data;
      } catch (error) {
        throw `Logout error with ${error}`;
      }
    }
  },
})