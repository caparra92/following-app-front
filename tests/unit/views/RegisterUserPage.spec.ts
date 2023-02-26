import { createTestingPinia, TestingPinia } from '@pinia/testing'
import { DOMWrapper, mount, shallowMount, VueWrapper } from '@vue/test-utils';
import RegisterUserPage from '@/views/RegisterUserPage.vue';
import { useUsers } from '@/stores/users';
import { _StoreWithState } from 'pinia';

describe('Register Page tests', () => {
    let usersApi: any;
    let wrapper: VueWrapper<any>;
    let inputEmail: DOMWrapper<Element>;

    beforeEach(async() => {
        
        wrapper = mount(RegisterUserPage, {
            global: {
              plugins: [createTestingPinia()],
            },
        });
        usersApi = useUsers();
        inputEmail = wrapper.find('input[type="email"]');
    });

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

    test('Verify if validate email works properly', () => {
        const email = 'parra@mail.com';
        wrapper.vm.form.email = email;
        expect(wrapper.vm.validateEmail(wrapper.vm.form.email)).toBeTruthy();
    });

    test('Verify if validate email works properly with wrong email', () => {
        const email = 'parra';
        wrapper.vm.form.email = email;
        expect(wrapper.vm.validateEmail(wrapper.vm.form.email)).toBe(null);
    });
});