# HubSpot React/JSX Style Guide

> Forked from [Airbnb's React/JSX Style Guide](https://github.com/airbnb/javascript/blob/master/react/README.md)

*HubSpot's version of a mostly reasonable approach to React and JSX*


## Table of Contents

  1. [Basic Rules](#basic-rules)
  1. [Naming](#naming)
  1. [Declaration](#declaration)
  1. [Alignment](#alignment)
  1. [Quotes](#quotes)
  1. [Spacing](#spacing)
  1. [Props](#props)
  1. [Set State](#set-state)
  1. [Parentheses](#parentheses)
  1. [Tags](#tags)
  1. [Methods](#methods)
  1. [Guidelines](#guidelines)
  1. [Ordering](#ordering)


## Basic Rules

  - Only include one React component per file.
  - Always use JSX syntax.
  - Do not use `React.createElement` unless you're initializing the app from a file that is not JSX.


## Class vs React.createClass

  - Use class extends React.Component unless you have a very good reason to use mixins.

  ```javascript
  // bad
  const Listing = React.createClass({
    render() {
      return <div />;
    }
  });

  // good
  class Listing extends React.Component {
    render() {
      return <div />;
    }
  }
  ```


## Naming

  - **Extensions**: Use `.jsx` extension for React components.
  - **Filename**: Use PascalCase for filenames. E.g., `ReservationCard.jsx`.
  - **Reference Naming**: Use PascalCase for React components and camelCase for their instances:
    ```javascript
    // bad
    const reservationCard = require('./ReservationCard');

    // good
    const ReservationCard = require('./ReservationCard');

    // bad
    const ReservationItem = <ReservationCard />;

    // good
    const reservationItem = <ReservationCard />;
    ```

    **Component Naming**: Use the filename as the component name. For example, `ReservationCard.jsx` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.jsx` as the filename and use the directory name as the component name:
    ```javascript
    // bad
    const Footer = require('./Footer/Footer.jsx')

    // bad
    const Footer = require('./Footer/index.jsx')

    // good
    const Footer = require('./Footer')
    ```


## Declaration
  - Do not use displayName for naming components. Instead, name the component by reference.

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
  - Follow these alignment styles for JSX syntax

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

    // children get indented normally
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz">
      <Spazz />
    </Foo>
    ```


## Quotes
  - Always use double quotes (`"`) for JSX attributes, but single quotes for all other JS.

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

  - Use explicit values for Boolean props
    ```javascript
    // bad (implicit true)
    <Hello personal />;

    // super-bad (string value)
    <Hello personal="true" />;

    // good (explicit)
    <Hello personal={true} />;
    ```

  - List __props__ in alphabetical order, unless you are spreading props and different ordering is required to maintain behavior.

    ```javascript
    // bad
    <Hello lastName="Smith" firstName="John" />;

    // good
    <Hello firstName="John" lastName="Smith" />;

    // meh (introducing spread changes behavior, so do what you must...)
    <Hello lastName="Smith" {...this.props} firstName="John" />;
    ```


  - List __propTypes__ alphabetically

    ```javascript
    // bad
    var Component = React.createClass({
      propTypes: {
        z: React.PropTypes.number,
        a: React.PropTypes.any,
        b: React.PropTypes.string
      }
    });

    // good
    var Component = React.createClass({
      propTypes: {
        a: React.PropTypes.any,
        b: React.PropTypes.string,
        z: React.PropTypes.number
      }
    });
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
    var Component = React.createClass({
      propTypes: {
        a: React.PropTypes.any.isRequired,
        b: React.PropTypes.string,
        z: React.PropTypes.number
      }
    });

    // good
    var Component = React.createClass({
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


## Set State
  - Don't `setState` in `componentDidMount`

    Updating the state after a component mount will trigger a second render() call and can lead to property/layout thrashing. This **does not apply to `setState` in event handlers** added here.

    If you need to do something to change state here, use a function prop that can change state at the top level and pass new data down accordingly.


  - Don't `setState` in `componentDidUpdate`

    Updating the state after a component update will trigger a second render() call and can lead to property/layout thrashing.

    If you need to do something to change state here, use a function prop that can change state at the top level and pass new data down accordingly.


## Parentheses
  - Wrap JSX tags in parentheses when they span more than one line:
    ```javascript
    /// bad
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
  - Always self-close tags that have no children.
    ```javascript
    // bad
    <Foo className="stuff"></Foo>

    // good
    <Foo className="stuff" />
    ```

  - If your component has multi-line properties, close its tag on a new line.
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
  - Do not use underscore prefix for internal methods of a React component.
    ```javascript
    // bad
    React.createClass({
      _onClickSubmit() {
        // do stuff
      }

      // other stuff
    });

    // good
    class extends React.Component {
      onClickSubmit() {
        // do stuff
      }

      // other stuff
    });
    ```


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

    ```js
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

## Ordering

  - Ordering for class extends React.Component:

  1. constructor
  1. optional static methods
  1. getChildContext
  1. componentWillMount
  1. componentDidMount
  1. componentWillReceiveProps
  1. shouldComponentUpdate
  1. componentWillUpdate
  1. componentDidUpdate
  1. componentWillUnmount
  1. Getters, setters, event handlers, helper methods, etc.
  1. Optional render methods like renderNavigation() or renderProfilePicture()
  1. render


  - How to define propTypes, defaultProps, contextTypes, etc...

  ```javascript
  import React, { Component, PropTypes } from 'react';

  const propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string,
  };

  const defaultProps = {
    text: 'Hello World',
  };

  export default class Link extends Component {
    static methodsAreOk() {
      return true;
    }

    render() {
      return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>
    }
  }

  Link.propTypes = propTypes;
  Link.defaultProps = defaultProps;
  ```


  - Ordering for React.createClass:

  1. displayName
  1. mixins
  1. propTypes
  1. contextTypes
  1. childContextTypes
  1. statics
  1. defaultProps
  1. getDefaultProps
  1. getInitialState
  1. state
  1. getChildContext
  1. componentWillMount
  1. componentDidMount
  1. componentWillReceiveProps
  1. shouldComponentUpdate
  1. componentWillUpdate
  1. componentDidUpdate
  1. componentWillUnmount
  1. Getters, setters, event handlers, helper methods, etc.
  1. Optional render methods like renderNavigation() or renderProfilePicture()
  1. render

**[⬆ back to top](#table-of-contents)**
