import { mount, VueWrapper } from "@vue/test-utils";
import BaseInput from "@/components/BaseInput.vue";


describe('Base Input component', () => {
    let wrapper: VueWrapper;
    beforeEach(() => {
        wrapper = mount(BaseInput, {
            props: {
                label: 'Email',
                modelValue: 'caparra@mail.com'
            }   
        });
    });

    test('Should match with snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Should verify that component exists', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    test('Should define props in the component', () => {
        expect(wrapper.props().label).toBe('Email');
        expect(wrapper.props().modelValue).toBe('caparra@mail.com');
    });

    test('Should verify emmited event', () => {
        const input = wrapper.find('input');
        input.trigger('input');
        expect(wrapper.emitted('update:modelValue')?.length).toBe(1);
    });
});