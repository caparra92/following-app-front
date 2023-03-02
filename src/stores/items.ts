import { defineStore } from 'pinia';
import axios from 'axios';

const token = localStorage.getItem('access_token') || null;

const apiReq = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    'Authorization': token
  }
});

export const useItems = defineStore('items', {
    state: () => {
      return {
        apiReq : apiReq
      }
    },
    getters: {
      loggedIn() {
        return token !== null
      }
    },
    actions: {
        async getItems() {
            try {
              const { data } = await this.apiReq.get(`/items`);
              return data;
            } catch (error) {
              throw `The api call failed with ${error}`;
            }
        },
        async addItem(name: string, description: string, activityId: string) {
          try {
            const { data } = await this.apiReq.post(`/items`, {
              name,
              description,
              activityId
            });
            return data;
          } catch (error) {
            return error;
          }
        }     
    }
  });