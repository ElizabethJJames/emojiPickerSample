/*
  Imports from basic requirements of this componet
*/
import React from 'react';
import { fromJS } from 'immutable';
import objectMerge from 'object-merge';
import PropTypes from 'prop-types';
/*
  end if imports from basic requirements of this componet
*/

/*
  Imports from subcomponents of this componet
*/
import defaultComponentStyle from "./styles.js";
/*
  end if imports from subcomponents of this componet
*/

class Emoji extends React.Component {
  constructor(props){
      super(props);
      this.displayName = 'Emoji';
      this.state = {
        'hover': false
      };

      this.prefetchStyles();
      this.updateStyles = this.updateStyles.bind(this);
      this.getDefaultStyle = this.getDefaultStyle.bind(this);

      this.emojiOnClick = this.emojiOnClick.bind(this);
      this.toggleHoverTrue = this.toggleHoverTrue.bind(this);
      this.toggleHoverFalse = this.toggleHoverFalse.bind(this);
  }

  static propTypes = {
    cbEmojiSelection: PropTypes.func,
    compStyle: PropTypes.object,
    emojiObject: PropTypes.object
  }

  static defaultProps = {}


  /*
    the two static props below are used primarially for the configuration of the future project Kragle.
    This project will allows us to dynamically build our componets in a user interface and get a preview
    of what our combined component will look like prior to compiling the code.
      ~ The static variable FILENAME is for Kragle to accurately collect the file
        name as when we have multiple hyphens in a file name Kragle does not collect
        the name of the file after the second hyphen.
      ~ the static variable DISPLAYNAME is the Class name for the component. This is provided as a simple
        way to pass in the name to Kragle in the even the component must be wrapped or in some way augmented
        to ensure the accurate name is displayed in the Kragle UI
  */
    static filename = 'emoji'

    static displayName = 'Emoji'
  /*
    this is the end of the static variables for the component's Kragle configuration
  */

  //componentWillReceiveProps(){}

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  /*
    In Component Will update we are currently checking for the following:
      ~ if the component style has updated from the parent, recalculate the styles and override the previous compstyle.
  */
  componentWillUpdate(nextProps){
    if (nextProps.compStyle && !fromJS(nextProps.compStyle).equals(fromJS(this.props.compStyle)) ){
      this.updateStyles(nextProps.compStyle);
    }
  }

  getDefaultStyle(styleName, objectPropState)  {
    //console.log('STYLENAME:::::',styleName)
    return defaultComponentStyle(styleName, objectPropState);
  }

  prefetchStyles () {
    this.emojiLIStyle = this.getDefaultStyle('emojiLIStyle');
    this.emojiLIHoverStyle = this.getDefaultStyle('emojiLIHoverStyle');
  }

  /*
    The purpose of this function is to ensure the user of this component can properly pass in
    compstyles and they will update when needed. this is called in component will update.
    The compStyleProp needs to be passed in with either prevProps or next props depending on usage
  */
    updateStyles (compStyleProp) {
      this.emojiLI = objectMerge(
          this.emojiLIStyle,
          compStyleProp.emojiLIStyle
        );
      this.emojiLIHover = objectMerge(
          this.emojiLIHoverStyle,
          compStyleProp.emojiLIHoverStyle
        );
    }


  getDefaultStyle(styleName, objectPropState)  {
      //console.log('STYLENAME:::::',styleName)
      return defaultComponentStyle(styleName, objectPropState);
    }

/*
    when a user clicks an emoji the emoji object will pass up to the parent of the emoji picker to be processed
*/
  emojiOnClick(){
    this.props.cbEmojiSelection(this.props.emojiObject);
  }


/*
    This function removes the hover style from the emoji
*/
  toggleHoverFalse(){
    if(this.state.hoverName !== false){
      this.setState((prevState)=>{
        return { ...prevState, 'hover': false};
      });
    }
  }

/*
    This function adds the hover style to the emoji
*/
  toggleHoverTrue(){
    if(this.state.hoverName !== true){
      this.setState((prevState)=>{
        return { ...prevState, 'hover': true};
      });
    }
  }

  render(){
    const style = this.state.hover === true ? this.emojiLIHoverStyle : this.emojiLIStyle;

    return (
      <li
          key = {this.props.emojiObject.no}
          style = {style}
          onClick = {this.emojiOnClick}
          className = {`emoji${this.props.emojiObject.no}`}
          tabIndex = '0'
          title = {this.props.emojiObject.name}
          onMouseEnter = {this.toggleHoverTrue}
          onMouseLeave = {this.toggleHoverFalse}
        >
        {this.props.emojiObject.char}
      </li>
    );
  }
}

export default Emoji;
