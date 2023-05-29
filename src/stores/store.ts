import { defineStore } from 'pinia';
import { apiReq } from '../../config/config';

// let token = localStorage.getItem('access_token') || null;
// let user = localStorage.getItem('user') || null;
// let email = localStorage.getItem('email') || null;

export const useStore = defineStore('store', {
  state: () => {
    return {
      apiReq,
      token: localStorage.getItem('access_token') || null,
      user: localStorage.getItem('user') || null,
      email: localStorage.getItem('email') || null
    }
  },
  getters: {
    loggedIn(): boolean {
      return this.token !== null
    }
  },
  actions: {
    setToken(payload: string | null) {
      this.token = payload
    },
    setUser(payload: string | null) {
      this.user = payload
    },
    setEmail(payload: string | null) {
      this.email = payload
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
        localStorage.setItem('email',data.user.email);
        this.setToken(localStorage.getItem('access_token'));
        this.setUser(localStorage.getItem('user'));
        this.setEmail(localStorage.getItem('email'));
        return data;
      } catch (error) {
          return error;
      }
    },
    async refresh(email: string) {
      try {
        const { data } = await this.apiReq.post('/login/refresh', {
          email
        });
        localStorage.setItem('access_token', data.token);
        this.setToken(localStorage.getItem('access_token'));
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