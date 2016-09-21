const React = require('react');
const ReactRedux = require('react-redux');
const { List } = require('immutable');

const UnsafeComponent = require('./UnsafeComponent');
const { findMatchingComponents } = require('../actions/components');

/*
    Public: InjectedComponent makes it easy to include a set of dynamically registered
    components inside of your React render method. Rather than explicitly render
    an array of buttons, for example, you can use InjectedComponentSet:

    ```js
    <InjectedComponentSet className="message-actions"
                      matching={{role: 'ThreadActionButton'}}
                      props={{ a: 1 }}>
    ```

    InjectedComponentSet will look up components registered for the location you provide,
    render them inside a {Flexbox} and pass them `exposedProps`. By default, all injected
    children are rendered inside {UnsafeComponent} wrappers to prevent third-party code
    from throwing exceptions that break React renders.

    InjectedComponentSet monitors the ComponentStore for changes. If a new component
    is registered into the location you provide, InjectedComponentSet will re-render.
    If no matching components is found, the InjectedComponent renders an empty span.
 */

const Injection = React.createClass({
    propTypes: {
        component: React.PropTypes.func,
        props:     React.PropTypes.object,
        children:  React.PropTypes.node
    },

    render() {
        const Comp = this.props.component;
        const { props, children } = this.props;

        if (Comp.sandbox === false) {
            return <Comp {...props}>{children}</Comp>;
        } else {
            return <UnsafeComponent Component={Comp} props={props}>{children}</UnsafeComponent>;
        }
    }
});

const InjectedComponentSet = React.createClass({
    propTypes: {
        components:    React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.func),
            React.PropTypes.instanceOf(List)
        ]).isRequired,
        props:         React.PropTypes.object,
        withContainer: React.PropTypes.bool
    },

    render() {
        const { components, props, ...divProps } = this.props;

        const inner = components.map(Comp => <Injection key={Comp.displayName} component={Comp} props={props} />);

        return (
            <div {...divProps}>
                {inner}
            </div>
        );
    }
});

/**
 * Render only the first component matching
 */
const InjectedComponent = React.createClass({
    propTypes: {
        components:    React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.func),
            React.PropTypes.instanceOf(List)
        ]).isRequired,
        props:    React.PropTypes.object,
        children: React.PropTypes.node
    },

    render() {
        const { components, props, children } = this.props;

        return components.reduce((inner, Comp) => {
            return (
                <Injection component={Comp} props={props}>
                    {inner}
                </Injection>
            );
        }, children);
    }
});

/**
 * Map Redux state to InjectedComponentSet's props
 */
function mapStateToProps(state, props) {
    const { components } = state;
    const { matching } = props;

    return {
        components: findMatchingComponents(components, matching)
    };
}

const connect = ReactRedux.connect(mapStateToProps);

module.exports = {
    InjectedComponent:    connect(InjectedComponent),
    InjectedComponentSet: connect(InjectedComponentSet)
};
