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

export default {
    renderComponent
};
