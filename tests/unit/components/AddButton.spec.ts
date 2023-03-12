import { mount, VueWrapper } from "@vue/test-utils";
import AddButton from "@/components/AddButton.vue";

describe('AddButton tests', () => {

    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = mount(AddButton);
    });

    test('Should match with snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Should verify that component exists', () => {
        expect(wrapper.exists()).toBeTruthy();
    });
});