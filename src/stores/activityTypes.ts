import { defineStore } from 'pinia';
import axios from 'axios';

const token = localStorage.getItem('access_token') || null;

const apiReq = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    'Authorization': token
  }
});

export const useActivityTypes = defineStore('activityTypes', {
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
        async getCategories() {
            try {
              const { data } = await this.apiReq.get(`/activityTypes`);
              return data;
            } catch (error) {
              throw `The api call failed with ${error}`;
            }
        },
        async getActivitiesById(id: string) {
            try {
                const { data } = await this.apiReq.get(`/activityTypes/${id}/activities`);
                return data;
              } catch (error) {
                throw `The api call failed with ${error}`;
              }
        },
        async addCategory(name: string, description: string) {
          try {
            const { data } = await this.apiReq.post(`/activityTypes`, {
              name,
              description
            });
            return data;
          } catch (error) {
            return error;
          }
        }  
    }
  });

