import { mount, shallowMount } from '@vue/test-utils';
import LoginPage from '@/views/LoginPage.vue';

describe('Login tests', () => {
    test('Verify HTML structure', () => {
        const wrapper = mount(LoginPage);
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Verify if a button contains a text', () => {
        const wrapper = mount(LoginPage);
        const button = wrapper.findComponent('ion-button');
        expect(button.text()).toBe('Enter');
    });
})