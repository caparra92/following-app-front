import { defineStore } from 'pinia';
import { apiReq } from '../../config/config';

let token = localStorage.getItem('access_token') || null;

export const useItems = defineStore('items', {
    state: () => {
      return {
        apiReq,
        items: <any[]>[]
      }
    },
    getters: {
      loggedIn() {
        return token !== null
      },
      getItems(state): object[] {
        return state.items;
      }
    },
    actions: {
      setToken(payload: string | null) {
        token = payload
      },
        async getItemsByActivityId(id : string) {
          try {
            const { data } = await this.apiReq.get(`/activities/${id}/items`);
            this.items = data.items;
            this.setToken(localStorage.getItem('access_token'));
            return data;
          } catch (error) {
            throw `The api call failed with ${error}`;
          }
        },
        async getItem(id: string) {
          try {
            const { data } = await this.apiReq.get(`/items/${id}`);
            this.items = data.item;
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
        },
        async removeItem(id : string) {
          try {
            const { data } = await this.apiReq.delete(`/items/${id}`);
            const index = this.items.findIndex(item => item.id == id);
            this.items.splice(index,1);
            return data;
          } catch (error) {
            return error;
          }
        }     
    }
  });