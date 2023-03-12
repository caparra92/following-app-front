import { mount, VueWrapper } from "@vue/test-utils";
import BaseTextArea from "@/components/BaseTextArea.vue";

describe('BaseTextArea tests', () => {

    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = mount(BaseTextArea, {
            props: {
                label: 'Category',
                modelValue: 1500,
                col: '10',
                row: '5'
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

    test('Should have <textarea/> tag with props label, modelValue, col and row', () => {
        expect(wrapper.props().label).toBe('Category');
        expect(wrapper.props().modelValue).toBe(1500);
        expect(wrapper.props().col).toBe('10');
        expect(wrapper.props().row).toBe('5');
    });
});