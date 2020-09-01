import { createElement, Component, render } from './toy-react';

class MyComponent extends Component {
    constructor() {
        super();
        this.state = {
            a: 1,
            b: 2
        }
    }
    render() {
        return <div>
            <h1>my components</h1>
            <span>{this.state.a.toString()}</span>
            {this.children}
        </div>
    }
}

/* 
function createElement (tagName, attributes, ...children) {
    // 当 tagName 不是全小写的标签时，jsx 会认为他是一个 class/function，
    // 那么这里就需要做一个判断。
    let e;
    if (typeof tagName === 'string') {
        e = document.createElement(tagName);
    } else {
        e = new tagName;
    }
    
    // 既然tagName是一个类的话，就不能实现 dom 操作了，需要将其加一个wrapper
    // 那么这个createElement的方法，可以分文件，定义在 toy-react.js里。
    for(let attr in attributes) {
        e.setAttribute(attr, attributes[attr]);
    }
    for(let child of children) {
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        }
        e.appendChild(child);
    }
    return e;
}
*/

render(window.a = <MyComponent id="a" class="c">
<div>123</div>
</MyComponent>, document.body);
