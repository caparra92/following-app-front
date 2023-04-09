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

export const useActivities = defineStore('activities', {
    state: () => {
      return {
        apiReq,
        activities: <any[]>[]
      }
    },
    getters: {
      loggedIn() {
        return token !== null
      },
      getAllActivities(state): object[] {
        return state.activities;
      }
    },
    actions: {
      async getItemsById(id : string) {
        try {
          const { data } = await this.apiReq.get(`activities/${id}/items`);
          return data;
        } catch (error) {
          throw `The api call failed with ${error}`;
        }
      },
        async getActivities() {
            try {
              const { data } = await this.apiReq.get(`/activities`);
              return data;
            } catch (error) {
              throw `The api call failed with ${error}`;
            }
          },
          async getActivitiesByTypeId(id: string) {
            try {
              const { data } = await this.apiReq.get(`/activityTypes/${id}/activities`);
              this.activities = data.activities;
              return data;
            } catch (error) {
              throw `The api call failed with ${error}`;
            }
      },
        async addActivity(name: string, description: string, activityTypeId: string) {
          try {
            const { data } = await this.apiReq.post(`/activities`, {
              name,
              description,
              activityTypeId
            });
            return data;
          } catch (error) {
            return error;
          }
        },
        async removeActivity(id : string) {
          try {
            const { data } = await this.apiReq.delete(`/activities/${id}`);
            const index = this.activities.findIndex(item => item.id == id);
            this.activities.splice(index,1);
            return data;
          } catch (error) {
            return error;
          }
        }     
    }
  });