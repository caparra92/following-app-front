import { mount, shallowMount } from '@vue/test-utils';
import CategoryBadge from '@/components/CategoryBadge.vue';

describe('Category Badge tests', () => {
    test('Verify HTML structure', () => {
        const wrapper = mount(CategoryBadge);
        expect(wrapper.element).toMatchSnapshot();
    });

    test('Verify if activityType has a default value', () => {
        const wrapper = mount(CategoryBadge);
        const p = wrapper.find('p');
        expect(p.text()).toBe('Activity type');
    });
})