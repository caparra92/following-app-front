import { defineStore } from 'pinia';
import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoiR2FsbyIsInBob25lIjoiMTIzNDUiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGV6VktxWHRjQTRGcEJPZ1hFNXUub2UvZHhzR0duVjVpQTRkaTJ3eGVOWTYzMTBpS1I0RVEuIiwiY3JlYXRlZEF0IjoiMjAyMy0wMi0xNFQwMjoyNzoyOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wMi0xNFQwMjoyNzoyOS4wMDBaIn0sImlhdCI6MTY3Njg1MjQ0NywiZXhwIjoxNjc2ODU3NjMxfQ.XH_6087WqdwKKgyrv-qTJX03x5_JPU9EDIwC6RYHvrg'

const apiReq = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    'Authorization': token
  }
});

export const useStore = defineStore('store', {
  state: () => {
    return {
      toggle: false,
      apiReq : apiReq
    }
  },
  actions: {
    async getCategories() {
      try {
        const { data } = await this.apiReq.get('/activityTypes');
        return data;
      } catch (error) {
        throw `The api call failed with ${error}`;
      }
    },
    async login(email: string, password: string) {
      try {
        const { data } = await this.apiReq.post('/login', {
          email,
          password
        });
        return data;
      } catch (error) {
        throw `The login failed with ${error}`;
      }
    }
  },
})