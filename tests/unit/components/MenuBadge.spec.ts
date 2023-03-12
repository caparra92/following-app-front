import { mount, VueWrapper } from "@vue/test-utils";
import { createTestingPinia } from '@pinia/testing';
import router from "@/router";
import MenuBadge from "@/components/MenuBadge.vue";

describe('MenuBadge tests', () => {

    let wrapper: VueWrapper;

    beforeEach(() => {
        const mockRoute = {
            name: "login"
          }

        const mockRouter = {
            push: jest.fn()
        }

        wrapper = mount(MenuBadge, {
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

    test('Should have <ion-menu/> tag with size attribute', () => {
        const ionMenu = wrapper.find('ion-menu');
        expect(ionMenu.attributes().size).toBe("large");
    });

    test('Should have <ion-icon/> tag with class = "icon"', () => {
        const ionIcon = wrapper.findAll('ion-icon');
        expect(ionIcon[0].attributes().class).toBe("icon");
    });

    test('Should have <ion-content/> tag with class = "ion-padding"', () => {
        const ionContent = wrapper.find('ion-content');
        expect(ionContent.attributes().class).toBe("ion-padding");
    });

    test('Should have <go-back-button/> / <div> tag with class = "back-button"', () => {
        const goBackButton = wrapper.findComponent('.back-button');
        expect(goBackButton.attributes().class).toBe("back-button");
    });
});