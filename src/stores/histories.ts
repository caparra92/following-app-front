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

export const useHistories = defineStore('histories', {
    state: () => {
      return {
        apiReq,
        histories: <any[]>[],
        historiesById: <any[]>[],
        itemId: '',
        activityId: ''
      }
    },
    getters: {
      loggedIn: () => token !== null,
      getHistories: (state) => state.histories.sort((a,b) => b.date - a.date),
      getHistoriesById: (state) => state.historiesById.sort((a,b) => b.date - a.date),
      getItemId: (state) => state.itemId
    },
    actions: {
        async getHistoriesByItemId(id : string, offset?: number) {
            try {
              if(offset) {
                const { data } = await this.apiReq.get(`/items/${id}/${offset}/histories`);
                if(data.histories.length){
                  this.histories = this.historiesById;
                  console.log(this.histories)
                } else {
                  this.histories = data.histories;
                }
                return data;
              } else {
                const { data } = await this.apiReq.get(`/items/${id}/histories`);
                this.historiesById = data.histories;
                console.log(this.historiesById)
                return data;
              }
            } catch (error) {
              throw `The api call failed with ${error}`;
            }
        },
        async getHistoriesByMonth(id: string, month: number) {
          try {
            const { data } = await this.apiReq.get(`/items/${id}/histories/${month}`);
            this.histories = data.histories;
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
            this.historiesById.splice(index,1);
            return data;
          } catch (error) {
            return error;
          }
        } 
    }
  });

