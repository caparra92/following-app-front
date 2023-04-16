import { defineStore } from 'pinia';
import axios from 'axios';
import { uri } from '../../config/config';

const token = localStorage.getItem('access_token') || null;
console.log(uri);

const apiReq = axios.create({
  baseURL: uri,
  headers: {
    'Authorization': token
  }
});

export const useStore = defineStore('store', {
  state: () => {
    return {
      toggle: false,
      apiReq : apiReq
    }
  },
  getters: {
    loggedIn() {
      return token !== null
    }
  },
  actions: {
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
        console.log(`is logged: ${this.loggedIn}`)
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