import { defineStore } from 'pinia';
import axios from 'axios';

const token = localStorage.getItem('access_token') || null;

const apiReq = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    'Authorization': token
  }
});

export const useActivities = defineStore('activities', {
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
        async getActivities() {
            try {
              const { data } = await this.apiReq.get(`/activities`);
              return data;
            } catch (error) {
              throw `The api call failed with ${error}`;
            }
        },
        async getItemsById(id: string) {
            try {
                const { data } = await this.apiReq.get(`activities/${id}/items`);
                return data;
              } catch (error) {
                throw `The api call failed with ${error}`;
              }
        }   
    }
  });