class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(component) {
        this.root.appendChild(component.root);
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
}

export class Component {
    constructor() {
        this.props = Object.create(null);
        this.children = [];
        this._root = null;
    }
    setAttribute(name, value) {
        this.props[name] = value;
    }
    appendChild(component) {
        this.children.push(component);
    }
    get root() {
        if (!this._root) {
            this._root = this.render().root;
        }
        return this._root;
    }
}

export function createElement (tagName, attributes, ...children) {
    // 当 tagName 不是全小写的标签时，jsx会认为他是一个class/function，
    // 那么这里就需要做一个判断。
    let e;
    if (typeof tagName === 'string') {
        e = new ElementWrapper(tagName);
    } else {
        e = new tagName;
    }
    
    // 既然tagName是一个类的话，就不能实现dom操作了，需要将其加一个wrapper
    // 那么这个createElement的方法，可以分文件，定义在 toy-react.js里。
    for(let attr in attributes) {
        e.setAttribute(attr, attributes[attr]);
    }
    let insertChildren = (children) => {
        for(let child of children) {
            if (typeof child === 'string') {
                child = new TextWrapper(child);
            }
            if ((typeof child === 'object') && (child instanceof Array)) {
                insertChildren(child);
            } else {
                e.appendChild(child);
            }
        }
    }
    insertChildren(children);
    return e;
}

export function render(component, parentElement) {
    parentElement.appendChild(component.root);
}