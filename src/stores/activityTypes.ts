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

export const useActivityTypes = defineStore('activityTypes', {
    state: () => {
      return {
        apiReq,
        activityTypes: <any[]>[]
      }
    },
    getters: {
      loggedIn() {
        return token !== null
      },
      getActivityTypes(state): object[] {
        return state.activityTypes;
      }
    },
    actions: {
        async getCategories() {
            try {
              const { data } = await this.apiReq.get(`/activityTypes`);
              this.activityTypes = data;
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
        },
        async removeActivityType(id : string) {
          try {
            const { data } = await this.apiReq.delete(`/activityTypes/${id}`);
            const index = this.activityTypes.findIndex(item => item.id == id);
            this.activityTypes.splice(index,1);
            return data;
          } catch (error) {
            return error;
          }
        } 
    }
  });

