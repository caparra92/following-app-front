import { defineStore } from 'pinia';
import axios from 'axios';

const token = localStorage.getItem('access_token') || null;

const apiReq = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    'Authorization': token
  }
});

export const useHistories = defineStore('histories', {
    state: () => {
      return {
        apiReq,
        histories: <any[]>[],
        itemId: '',
        activityId: ''
      }
    },
    getters: {
      loggedIn() {
        return token !== null
      },
      getHistories(state): object[] {
        return state.histories;
      }
    },
    actions: {
        async getHistoriesByItemId(id : string) {
            try {
              const { data } = await this.apiReq.get(`/items/${id}/histories`);
              this.histories = data;
              return data;
            } catch (error) {
              throw `The api call failed with ${error}`;
            }
        },
        async addHistory(date: string, value: number, itemId: string, activityId: string) {
          try {
            const { data } = await this.apiReq.post(`/histories`, {
              date,
              value,
              itemId,
              activityId
            });
            return data;
          } catch (error) {
            return error;
          }
        },
        async removeHistory(id : string) {
          try {
            const { data } = await this.apiReq.delete(`/histories/${id}`);
            const index = this.histories.findIndex(item => item.id == id);
            this.histories.splice(index,1);
            return data;
          } catch (error) {
            return error;
          }
        } 
    }
  });

