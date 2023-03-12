import { mount, VueWrapper } from "@vue/test-utils";
import BaseSelect from "@/components/BaseSelect.vue";

describe('BaseSelect tests', () => {

    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = mount(BaseSelect, {
            props: {
                label: 'Category',
                modelValue: ['Capoeira', 'Running', 'Jumping']
            }   
        });
    });

    test('Should match with snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Should verify that component exists', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    test('Should have <ion-item/> tag with class = "icon"', () => {
        const ionItem = wrapper.findComponent('ion-item');
        expect(ionItem.attributes().class).toBe("container");
    });

    test('Should have <select/> tag with classes = ["field", "field-select"]', () => {
        const select = wrapper.find('select');
        expect(select.classes()).toEqual(['field','field-select']);
    });

    test('Should have <select/> tag with props label and modelValue', () => {
        expect(wrapper.props().label).toBe('Category');
        expect(wrapper.props().modelValue).toEqual(['Capoeira', 'Running', 'Jumping']);
    });
});