import { defineStore } from 'pinia';
import { apiReq } from '../../config/config';

let token = localStorage.getItem('access_token') || null;
export const useStore = defineStore('store', {
  state: () => {
    return {
      apiReq : apiReq,
      token: token
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
        this.setToken(localStorage.getItem('access_token'));
        console.log(`is logged: ${this.loggedIn}`)
        console.log(`Token: ${token}`)
        console.log(`This Token: ${this.token}`)
        return data;
      } catch (error) {
          return error;
      }
    },
    async logout() {
      try {
        const { data } = await this.apiReq.get('/login');
        localStorage.removeItem('access_token');
        return data;
      } catch (error) {
        throw `Logout error with ${error}`;
      }
    }
  },
})