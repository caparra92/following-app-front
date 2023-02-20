import { mount, shallowMount } from '@vue/test-utils';
import RegisterUserPage from '@/views/RegisterUserPage.vue';

describe('Register Page tests', () => {
    test('Verify HTML structure', () => {
        const wrapper = mount(RegisterUserPage);
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Verify if a button contains a text', () => {
        const wrapper = mount(RegisterUserPage);
        const button = wrapper.findComponent('ion-button');
        expect(button.text()).toBe('Enter');
    });
});