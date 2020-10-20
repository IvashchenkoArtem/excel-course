// $ - обозначаем DOM переменние (что бы не путаться)

import {$} from '@core/dom'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        // this.$el = document.querySelector(selector)
        this.components = options.components || []
    }

    // 3 вариант
    getRoot() {
        // новая запись (оптимизирвана dom.js)
        const $root = $.create('div', 'excel')
        // старая запись
        // const $root = document.createElement('div')
        // добавили класс 'excel'
        // $root.classList.add('excel')

        // пример
        // $root.textContent = 'test'
        // $root.style.fontSize = '5rem'

        this.components = this.components.map(Component => {
            // новая запись (оптимизирвана dom.js)
            const $el = $.create('div', Component.className)
            // старая запись
            // const $el = document.createElement('div')
            // $el.classList.add(Component.className)
            const component = new Component($el)
            // DEBUG
            // if (component.name) {
            //     window['c' + component.name] = component
            // }
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })

        return $root
    }

    render() {
        // 1 вариант
        // afterbegin, afterend, beforeend, beforebegin
        //   this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`)


        // 2 вариант
        //  const node = (document.createElement('h1'))
        //  node.textContent = 'TEST'
        //  this.$el.append(node)

        // 3 вариант
        this.$el.append(this.getRoot())

        this.components.forEach(component => component.init())
    }
}