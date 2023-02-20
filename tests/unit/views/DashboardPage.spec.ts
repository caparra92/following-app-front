import { shallowMount, mount } from '@vue/test-utils';
import DashboardPage from '@/views/DashboardPage.vue';


describe('Dashboard tests', () => {
    test('Verify HTML content', () => {
        const wrapper = mount(DashboardPage);
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Verify if HTML contains a text', () => {
        const wrapper = mount(DashboardPage);
        const p = wrapper.find('p');
        expect(p.text()).toBe('Camilo');
    });
});