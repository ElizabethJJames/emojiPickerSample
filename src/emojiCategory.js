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
import Emoji from "./emoji.js";

/*
  end if imports from subcomponents of this componet
*/


class EmojiCategory extends React.Component {
  constructor(props){
      super(props);
      this.displayName = 'EmojiPicker';
      this.state = {};

      this.prefetchStyles();
      this.updateStyles = this.updateStyles.bind(this);
        this.getDefaultStyle = this.getDefaultStyle.bind(this);

      this.renderEmojiList = this.renderEmojiList.bind(this);
  }

  static propTypes = {
    categoryRef: PropTypes.func,
    cbEmojiSelection: PropTypes.func,
    className: PropTypes.string,
    compStyle: PropTypes.object,
    filteredList: PropTypes.array,
    title: PropTypes.string
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
    static filename = 'emojiCategory'

    static displayName = 'EmojiCategory'
  /*
    this is the end of the static variables for the component's Kragle configuration
  */


  // componentWillReceiveProps(){}


  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

/*
  In Component Will update we are currently checking for the following:
    ~ if the component style has updated from the parent, recalculate the styles and override the previous compstyle.
*/
  componentWillUpdate(nextProps){
    if (nextProps.compStyle && !fromJS(nextProps.compStyle).equals(fromJS(this.props.compStyle))){
      this.updateStyles(nextProps.compStyle);
    }
  }

  prefetchStyles () {
    this.categoryItemStyle = this.getDefaultStyle('categoryItemStyle');
    this.emptyCategoryItemStyle = this.getDefaultStyle('emptyCategoryItemStyle');
    this.categoryTitleStyle = this.getDefaultStyle('categoryTitleStyle');
    this.categoryItemULStyle = this.getDefaultStyle('categoryItemULStyle');
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
    This function renders the emojis from our emoji list object
*/
  renderEmojiList(){
    return (
      <ul className={this.props.className} style = {this.categoryItemULStyle}>
        {
          this.props.filteredList.map((emojiObject)=>{
            return (
              <Emoji
                  cbEmojiSelection = {this.props.cbEmojiSelection}
                  emojiObject = {emojiObject}
                  key = {emojiObject.no}
                  compStyle = {this.categoryItemStyle}
              />
            );
          })
        }
      </ul>
    );
  }

  render(){

    const categoryItemStyle = this.props.filteredList.length > 0 ? this.categoryItemStyle : this.emptyCategoryItemStyle;
    /*
      the ref is passed in as a property so the parent can access the element for scroll and navigation
    */
    return (
      <div className="categoryItem" style = {categoryItemStyle} ref={this.props.categoryRef}>
        <p className="categoryTitle" style = {this.categoryTitleStyle} >
          {this.props.title}
        </p>
        {this.renderEmojiList()}
      </div>
    );
  }
}

export default EmojiCategory;
