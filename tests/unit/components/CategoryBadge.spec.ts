import { mount, shallowMount, VueWrapper } from '@vue/test-utils';
import CategoryBadge from '@/components/CategoryBadge.vue';

describe('Category Badge tests', () => {

    let wrapper: VueWrapper;
    beforeEach(() => {
        wrapper = mount(CategoryBadge);
    });

    test('Verify HTML structure', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    test('Should verify that component exists', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    test('Verify if activityType has a default value', () => {
        const p = wrapper.find('p');
        expect(p.text()).toBe('Activity type');
    });
})