import { defineStore } from 'pinia';
import axios from 'axios';
import { uri } from '../../config/config';

const token = localStorage.getItem('access_token') || null;

const apiReq = axios.create({
    baseURL: uri,
    headers: {
      'Authorization': token
    }
  });

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
      async getUsers() {
        try {
          const { data } = await this.apiReq.get('/users');
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