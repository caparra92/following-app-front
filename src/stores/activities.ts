import { defineStore } from 'pinia';
import { apiReq } from '../../config/config';

let token = localStorage.getItem('access_token') || null;
const user = localStorage.getItem('user') || null;

export const useActivities = defineStore('activities', {
    state: () => {
      return {
        apiReq,
        activities: <any[]>[],
        token,
        user
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
      setToken(payload: string | null) {
        token = payload
      },
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
              const { data } = await this.apiReq.get(`/activities/user/${user}`);
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
              activityTypeId,
              user
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