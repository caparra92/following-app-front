import { defineStore } from 'pinia';
import { apiReq } from '../../config/config';

let token = localStorage.getItem('access_token') || null;
let user = localStorage.getItem('user') || null;
//console.log(user)

export const useActivityTypes = defineStore('activityTypes', {
    state: () => {
      return {
        apiReq,
        activityTypes: <any[]>[],
        token: localStorage.getItem('access_token'),
        user: localStorage.getItem('user')
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
      setToken(payload: string | null) {
        token = payload
      },
      setUser(payload: string | null) {
        user = payload
      },
        async getCategories() {
          //this.activityTypes = [];
          try {
            const { data } = await this.apiReq.get(`/activityTypes/user/${user}`);
            console.log(data)
            this.activityTypes = data;
            this.setToken(localStorage.getItem('access_token'));
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
              description,
              user
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

