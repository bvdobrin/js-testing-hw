import {shallowMount} from '@vue/test-utils';
import faker from 'faker';
import sinon from 'sinon';
import Book from '@/components/Book.vue';

describe('Book.vue', () => {
    it('should throw error if id is not provided', () => {
        expect(() => shallowMount(Book, {
            propsData: {
                name: 'Amintiri din copilarie',
                author: 'Ion Creanga'
            }
        }).toThrow(`[Vue warn]: Missing required prop: "id"`));
    });

    it('should throw error if name is not provided', () => {
        expect(() => shallowMount(Book, {
            propsData: {
                id: '1',
                author: 'Ion Creanga'
            }
        }).toThrow(`[Vue warn]: Missing required prop: "name"`));
    });

    it('should throw error if author is not provided', () => {
        expect(() => shallowMount(Book, {
            propsData: {
                id: '1',
                name: 'Amintiri din copilarie'
            }
        }).toThrow(`[Vue warn]: Missing required prop: "author"`));
    });

    it('Book component should display the value of name prop', () => {
        const book = {
            id: faker.random.alphaNumeric(10),
            name: faker.name.title(),
            author: faker.lorem.word()
        };
        const wrapper = shallowMount(Book, {
            propsData: {
                id: faker.random.alphaNumeric(10),
                name: book.name,
                author: book.author
            }
        });

        expect(wrapper.find('.name').text()).toEqual(book.name);
        expect(wrapper.find('.author').text()).toEqual(`by ${book.author}`);
    });

    it('should throw error if language is not accepted', () => {
        expect(() => shallowMount(Book, {
            propsData: {
                id: faker.random.alphaNumeric(10),
                name: faker.name.title(),
                author: faker.lorem.word(),
                language: faker.lorem.word()
            }
        }).toThrow());
    });

    it('emit remove event when clicking remove button', () => {
        const handler = sinon.stub();
        const spy = sinon.spy(handler);

        const wrapper = shallowMount(Book, {
            listeners: {
                'remove': spy
            }
        });
        const button = wrapper.find('.remove');

        button.trigger('click');
        
        expect(spy.called).toEqual(true);
    });
})

