import { defineStore } from 'pinia';
import { apiReq } from '../../config/config';

let token = localStorage.getItem('access_token') || null;

export const useUsers = defineStore('users', {
    state: () => {
      return {
        apiReq
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
      async getUsers() {
        try {
          const { data } = await this.apiReq.get('/users');
          this.setToken(localStorage.getItem('access_token'));
          return data;
        } catch (error) {
          throw `The api call failed with ${error}`;
        }
      },
      async createUser(name: string, email: string, password: string) {
        try {
            const { data } = await this.apiReq.post('/users', {
                name,
                email,
                password
            });
            return data;
        } catch (error) {
            return error;
        }
      }
    },
  })