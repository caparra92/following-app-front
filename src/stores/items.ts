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
        apiReq : apiReq,
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
        async getItemsByActivityId(id : string) {
          try {
            const { data } = await this.apiReq.get(`/activities/${id}/items`);
            this.items = data.items;
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