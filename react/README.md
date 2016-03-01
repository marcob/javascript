# HubSpot React/JSX Style Guide

> Forked from [Airbnb's React/JSX Style Guide](https://github.com/airbnb/javascript/blob/master/react/README.md)

*HubSpot's version of a mostly reasonable approach to React and JSX*


## Table of Contents

  1. [Basic Rules](#basic-rules)
  1. [Class vs `React.createClass` vs stateless](#class-vs-reactcreateclass-vs-stateless)
  1. [Naming](#naming)
  1. [Declaration](#declaration)
  1. [Alignment](#alignment)
  1. [Quotes](#quotes)
  1. [Spacing](#spacing)
  1. [Props](#props)
  1. [Parentheses](#parentheses)
  1. [Tags](#tags)
  1. [Methods](#methods)
  1. [Ordering](#ordering)
  1. [`isMounted`](#ismounted)
  1. [Set State](#set-state)
  1. [Guidelines](#guidelines)

## Basic Rules

  - Only include one React component per file.
    - However, multiple [Stateless, or Pure, Components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) are allowed per file. eslint: [`react/no-multi-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md#ignorestateless).
  - Always use JSX syntax.
  - Do not use `React.createElement` unless you're initializing the app from a file that is not JSX.

## Class vs `React.createClass` vs stateless

  - If you have internal state and/or refs, prefer `class extends React.Component` over `React.createClass` unless you have a very good reason to use mixins. eslint: [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md)

    ```javascript
    // bad
    const Listing = React.createClass({
      // ...
      render() {
        return <div>{this.state.hello}</div>;
      }
    });

    // good
    class Listing extends React.Component {
      // ...
      render() {
        return <div>{this.state.hello}</div>;
      }
    }
    ```

    And if you don't have state or refs, prefer normal functions (not arrow functions) over classes:

    ```javascript

    // bad
    class Listing extends React.Component {
      render() {
        return <div>{this.props.hello}</div>;
      }
    }

    // bad (since arrow functions do not have a "name" property)
    const Listing = ({ hello }) => (
      <div>{hello}</div>
    );

    // good
    function Listing({ hello }) {
      return <div>{hello}</div>;
    }
    ```

## Naming

  - **Extensions**: Use `.js` extension for React components.
  - **Filename**: Use PascalCase for filenames. E.g., `ReservationCard.js`.
  - **Reference Naming**: Use PascalCase for React components and camelCase for their instances. eslint: [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

    ```javascript
    // bad
    import reservationCard from './ReservationCard';

    // good
    import ReservationCard from './ReservationCard';

    // bad
    const ReservationItem = <ReservationCard />;

    // good
    const reservationItem = <ReservationCard />;
    ```

  - **Component Naming**: Use the filename as the component name. For example, `ReservationCard.js` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.js` as the filename and use the directory name as the component name:

    ```javascript
    // bad
    import Footer from './Footer/Footer';

    // bad
    import Footer from './Footer/index';

    // good
    import Footer from './Footer';
    ```

## Declaration

  - Do not use `displayName` for naming components. Instead, name the component by reference.

    ```javascript
    // bad
    export default React.createClass({
      displayName: 'ReservationCard',
      // stuff goes here
    });

    // good
    export default class ReservationCard extends React.Component {
    }
    ```

## Alignment

  - Follow these alignment styles for JSX syntax. eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)

    ```javascript
    // bad
    <Foo superLongParam="bar"
         anotherSuperLongParam="baz" />

    // good
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    />

    // if props fit in one line then keep it on the same line
    <Foo bar="bar" />

    // children get indented normally with closing brackets either `after-props`
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz">
      <Spazz />
    </Foo>

    // or `tag-aligned`

    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    >
      <Quux />
    </Foo>
    ```

## Quotes

  - Always use double quotes (`"`) for JSX attributes, but single quotes for all other JS. eslint: [`jsx-quotes`](http://eslint.org/docs/rules/jsx-quotes)

  > Why? JSX attributes [can't contain escaped quotes](http://eslint.org/docs/rules/jsx-quotes), so double quotes make conjunctions like `"don't"` easier to type.
  > Regular HTML attributes also typically use double quotes instead of single, so JSX attributes mirror this convention.

    ```javascript
    // bad
    <Foo bar='bar' />

    // good
    <Foo bar="bar" />

    // bad
    <Foo style={{ left: "20px" }} />

    // good
    <Foo style={{ left: '20px' }} />

    // good
    <Foo bar='"bar"' />
    ```

## Spacing

  - Always include a single space in your self-closing tag.

    ```javascript
    // bad
    <Foo/>

    // very bad
    <Foo                 />

    // bad
    <Foo
     />

    // good
    <Foo />
    ```

## Props

  - Always use camelCase for prop names.

    ```javascript
    // bad
    <Foo
      UserName="hello"
      phone_number={12345678}
    />

    // good
    <Foo
      userName="hello"
      phoneNumber={12345678}
    />
    ```

  - Use explicit values for Boolean props. eslint: [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)

    ```javascript
    // bad (implicit true)
    <Hello personal />;

    // super-bad (string value)
    <Hello personal="true" />;

    // good (explicit)
    <Hello personal={true} />;
    ```

  - Declare every prop in `propTypes`.  If you use a value on `this.props` anywhere in your component, it should be listed in `propTypes`.

    ```javascript
    // bad (missing propType declaration)
    export default React.createClass({
      render() {
        return <div>Hello {this.props.name}</div>;
      }
    });

    // good (all props declared)
    export default React.createClass({
      propTypes: {
        name: React.PropTypes.string,
        children: React.PropTypes.node
      },

      render() {
        const {children, name} = this.props;
        return (
          <div>
            Hello {name}
            {children}
          </div>
        );
      }
    });
    ```

  - Always provide defaults for non-required `propTypes`

    ```javascript
    // bad (missing default value for `b` and `z` props)
    const Component = React.createClass({
      propTypes: {
        a: React.PropTypes.any.isRequired,
        b: React.PropTypes.string,
        z: React.PropTypes.number
      }
    });

    // good
    const Component = React.createClass({
      propTypes: {
        a: React.PropTypes.any.isRequired,
        b: React.PropTypes.string,
        z: React.PropTypes.number
      },

      getDefaultProps() {
        return {
          b: 'something',
          z: 0
        }
      }
    });
    ```

## Parentheses

  - Wrap JSX tags in parentheses when they span more than one line. eslint: [`react/wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/wrap-multilines.md)

    ```javascript
    // bad
    render() {
      return <MyComponent className="long body" foo="bar">
               <MyChild />
             </MyComponent>;
    }

    // good
    render() {
      return (
        <MyComponent className="long body" foo="bar">
          <MyChild />
        </MyComponent>
      );
    }

    // good, when single line
    render() {
      const body = <div>hello</div>;
      return <MyComponent>{body}</MyComponent>;
    }
    ```

## Tags

  - Always self-close tags that have no children. eslint: [`react/self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)

    ```javascript
    // bad
    <Foo className="stuff"></Foo>

    // good
    <Foo className="stuff" />
    ```

  - If your component has multi-line properties, close its tag on a new line. eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)

    ```javascript
    // bad
    <Foo
      bar="bar"
      baz="baz" />

    // good
    <Foo
      bar="bar"
      baz="baz"
    />
    ```

## Methods

  - Bind event handlers for the render method in the constructor. eslint: [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

  > Why? A bind call in the render path creates a brand new function on every single render.

    ```javascript
    // bad
    class extends React.Component {
      onClickDiv() {
        // do stuff
      }

      render() {
        return <div onClick={this.onClickDiv.bind(this)} />
      }
    }

    // good
    class extends React.Component {
      constructor(props) {
        super(props);

        this.onClickDiv = this.onClickDiv.bind(this);
      }

      onClickDiv() {
        // do stuff
      }

      render() {
        return <div onClick={this.onClickDiv} />
      }
    }
    ```

  - Do not use underscore prefix for internal methods of a React component.

    ```javascript
    // bad
    React.createClass({
      _onClickSubmit() {
        // do stuff
      },

      // other stuff
    });

    // good
    class extends React.Component {
      onClickSubmit() {
        // do stuff
      }

      // other stuff
    }
    ```

## Ordering

  - Ordering for `class extends React.Component`:

  1. `constructor`
  1. optional `static` methods
  1. `getChildContext`
  1. `componentWillMount`
  1. `componentDidMount`
  1. `componentWillReceiveProps`
  1. `shouldComponentUpdate`
  1. `componentWillUpdate`
  1. `componentDidUpdate`
  1. `componentWillUnmount`
  1. Getters, setters, event handlers, helper methods, etc.
  1. Optional render methods like `renderNavigation()` or `renderProfilePicture()`
  1. `render`

  - How to define `propTypes`, `defaultProps`, `contextTypes`, etc...

    ```javascript
    import React, { PropTypes } from 'react';

    const propTypes = {
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      text: PropTypes.string,
    };

    const defaultProps = {
      text: 'Hello World',
    };

    class Link extends React.Component {
      static methodsAreOk() {
        return true;
      }

      render() {
        return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>
      }
    }

    Link.propTypes = propTypes;
    Link.defaultProps = defaultProps;

    export default Link;
    ```

  - Ordering for `React.createClass`: eslint: [`react/sort-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md)

  1. `displayName`
  1. `mixins`
  1. `propTypes`
  1. `contextTypes`
  1. `childContextTypes`
  1. `statics`
  1. `defaultProps`
  1. `getDefaultProps`
  1. `getInitialState`
  1. `getChildContext`
  1. `componentWillMount`
  1. `componentDidMount`
  1. `componentWillReceiveProps`
  1. `shouldComponentUpdate`
  1. `componentWillUpdate`
  1. `componentDidUpdate`
  1. `componentWillUnmount`
  1. Getters, setters, event handlers, helper methods, etc.
  1. Optional render methods like `renderNavigation()` or `renderProfilePicture()`
  1. `render`


## `isMounted`

  - Do not use `isMounted`. eslint: [`react/no-is-mounted`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md)

  > Why? [`isMounted` is an anti-pattern][anti-pattern], is not available when using ES6 classes, and is on its way to being officially deprecated.

  [anti-pattern]: https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html

  eslint rules: [`react/no-is-mounted`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md).

## Set State
  - Don't `setState` in `componentDidMount`

    Updating the state after a component mount will trigger a second render() call and can lead to property/layout thrashing. This **does not apply to `setState` in event handlers** added here.

    If you need to do something to change state here, use a function prop that can change state at the top level and pass new data down accordingly.


  - Don't `setState` in `componentDidUpdate`

    Updating the state after a component update will trigger a second render() call and can lead to property/layout thrashing.

    If you need to do something to change state here, use a function prop that can change state at the top level and pass new data down accordingly.


## GuideLines

These are guidelines more than rules, and they will likely be more controversial than those listed above. This is where we collaborate :)


  - Destructure `props` and `state` variables at the top of `render()`

    Instead of spreading your state access all over the place, destructure everything at the top of `render` to make it obvious which data fields are used.

    ```javascript
    // bad
    export default React.createClass({
      ...
      render() {
        return (
          <div>
            {/* access spread throughout component */}
            Hello {this.props.name}
            {/* stateful helpers... */}
            {this.renderHelper()}
            {/* transfers props that are intended for this component */}
            <CustomComponent {...this.props} />
          </div>
        );
      }
    });

    // good
    export default React.createClass({]
      ...
      render() {
        {/* all data in one place */}
        const {children, name, ...other} = this.props;
        return (
          <div>
            Hello {name}
            {/* stateless helper functions */}
            {this.renderHelper(children)}
            {/* only necessary props transferred */}
            <CustomComponent {...other} />
          </div>
        );
      }
    });
    ```

    This has the additional benefit of:

    * Keeping your helper methods stateless by passing in values (see below)
    * Enabling [props transfer](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx) using `...` for unused values without triggering warnings for unused vars in render

  - Keep your helper methods stateless

    Prefer to pass props/state values into your helper methods instead of access via `this` in the method body. This enables you to extract them to helper objects without refactoring, as well as easily write automated tests without needing to setup a complete stateful component.

    ```javascript
    // discouraged (stateful method, harder to test and extract/refactor)
    export default React.createClass({
      ...
      render() {
        return (
          <div>
            {this.renderHelper()}
          </div>
        );
      },

      renderHelper() {
        return `Custom value: ${someRenderingLogic(this.props.value)}`;
      }
    });


    // preferred (stateless function, easy to test and extract/refactor)
    export default React.createClass({]
      ...
      render() {
        const {value} = this.props;
        return (
          <div>
            {this.renderHelper(value)}
          </div>
        );
      },

      renderHelper(value) {
        return `Custom value: ${someRenderingLogic(value)}`;
      }
    });
    ```

**[⬆ back to top](#table-of-contents)**
