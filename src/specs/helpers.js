import { EventEmitter } from "events";
import React from "react/addons";

function renderComponent(Component, props) {
    var { TestUtils } = React.addons;
    var renderer = TestUtils.createRenderer();
    var output, instance;
    
    renderer.render(<Component {...props} />);
    
    return {
        renderer,
        output: renderer.getRenderOutput(),
        instance: renderer._instance._instance
    };
}

function getMockBlacklist(store = {}) {
    var blacklist = new EventEmitter();

    blacklist._blacklist = store;
    blacklist.validate = () => {};
    blacklist.get = () => {
        return store;
    };
    
    return blacklist;
}

function arrayToObject(arr, val = null) {
    return arr.reduce((obj, item) => {
        obj[item] = val;

        return obj;
    }, {});
}

function getNestedElements(Component, baseProps = {}, func) {
    return function(props = {}) {
        var combinedProps = Object.assign({}, baseProps, props);
        var component = renderComponent(Component, combinedProps);

        if (func)
            return func(component);

        return component;
    };
}

export default {
    renderComponent,
    getMockBlacklist,
    arrayToObject,
    getNestedElements
};
