import { defineStore } from 'pinia';
import { apiReq } from '../../config/config';
import { useStore } from './store';

export const useActivityTypes = defineStore('activityTypes', {
  
    state: () => {
      const store = useStore();
      return {
        apiReq,
        activityTypes: <any[]>[],
        token: store.token,
        user: store.user
      }
    },
    getters: {
      loggedIn(): boolean {
        const store = useStore();
        const token = store.token;
        return token !== null;
      },
      getActivityTypes(state): object[] {
        return state.activityTypes;
      },
      getState() {
        const store = useStore();
        return {
          token : store.token,
          user: store
        }
      }
    },
    actions: {
      
      async getCategories() {
        const store = useStore();
        
        try {
          const { data } = await this.apiReq.get(`/activityTypes/user/${store.user}`);
          
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
        const store = useStore();
        try {
          const { data } = await this.apiReq.post(`/activityTypes`, {
            name,
            description,
            user : store.user
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

// const store = useStore();
// const token = store.token;
// const user = store.user;
// console.log('user imported from state')
// console.log(user)

