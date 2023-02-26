import { createTestingPinia } from '@pinia/testing'
import { mount, shallowMount } from '@vue/test-utils';
import RegisterUserPage from '@/views/RegisterUserPage.vue';
import { useUsers } from '@/stores/users';

const wrapper = mount(RegisterUserPage, {
    global: {
      plugins: [createTestingPinia()],
    },
});

const usersApi = useUsers();

const newUser = {
    ok: true,
    user: {
        id: '22',
        name: 'testUnit',
        email: 'unit@test.com'
    }
}

describe('Register Page tests', () => {

    jest.spyOn(usersApi.apiReq, 'post').mockResolvedValue(newUser);

    test('Verify HTML structure', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Verify if a button contains a text', () => {
        const button = wrapper.findComponent('ion-button');
        expect(button.text()).toBe('Enter');
    });

    test('Verify if axios instance baseURL were configured propperly', () => {
        expect(usersApi.apiReq.defaults.baseURL).toBe('http://localhost:3000/api');
    });

    test('Verify if button click is triggered', async() => {
        const button  = wrapper.findComponent('ion-button');
        expect( await button.trigger('click')).toBe(undefined);
    });
});