import { mount, VueWrapper } from "@vue/test-utils";
import GoBackButton from "@/components/GoBackButton.vue";
import { createTestingPinia } from '@pinia/testing';
import router from "@/router";

describe('GoBackButton tests', () => {

    let wrapper: VueWrapper;

    beforeEach(() => {
        const mockRoute = {
            path: ''
          }

        const mockRouter = {
            go: jest.fn()
        }
        wrapper = mount(GoBackButton, {
            global: {
                plugins: [createTestingPinia(), router],
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                  }
              },
        });
    });

    test('Should match with snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Should verify that component exists', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    test('Should emit event when clicking a button', () => {
        const button = wrapper.find('button');
        button.trigger('click');        
        expect(wrapper.emitted('click')?.length).toBe(1);
    });
});