import React from 'react';
import { fromJS } from 'immutable';
import defaultComponentStyle from "./searchFilterStyle.js";
import PropTypes from 'prop-types';


class SearchFilter extends React.Component {
  constructor(props){
      super(props);
      this.displayName = 'SearchFilter';
      this.state = {
        'clearInputIsActive': false,
        'hasError': this.props.hasError,
        'isFocus': false,
        'onHover': false
      };

      this.displayClearInputControl = this.displayClearInputControl.bind(this);
      this.clearInput = this.clearInput.bind(this);
      this.inputTimeout = 0;
      this.handleFocus = this.handleFocus.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.inputKeyUp = this.inputKeyUp.bind(this);

      this.prefetchStyles();

  }

  static propTypes = {
    cbOnFocus: PropTypes.func,
    cbStringToFilter: PropTypes.func,
    compStyle: PropTypes.object,
    errorText : PropTypes.string,
    hasError: PropTypes.bool,
    isDisabled : PropTypes.bool,
    placeholderText: PropTypes.string
  }

  static defaultProps = {
    cbStringToFilter: ()=>{console.log('cbStringToFilter is not defined');},
    cbOnFocus: ()=>{console.log('cbOnFocus is not defined');},
    errorText: undefined,
    hasError: false,
    isDisabled: false,
    placeholderText: ''
  };

  static displayName = 'SearchFilter'

  static filename = 's2s-search-filter'

  static thumbnail = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAA7xJREFUWAm9ljloFVEUhicuUVGjYgpD3BcQtbLQSkEiItipYPu0SCWWlsHCItglCHGJhaAogl1wwbhgI9iIiEaMkqQIShTFFK4x+n/z7g/Xl5l57wnxh/+du5ztnntm5jUk9WOWTCaC2VLJXeJ2cZ3YJP4QR8Wn4n3xuQhmipPibyb/ggYZ4QS0iKfFDyIOi3hX+3tEwz7SOU5rAXqQE5TEbnGhCMbER+IL8ZM4V1wtbhO3iMZlDY6IVCiuovcL5Yyw2ynp0w5r3C42i1kg4R1in2ibZxpzbeCvSpSXsn/JFnSIdnRV4/ksRkCvMZrHw8OafBexJwnrkWQhHJw7dPCeCosDml8TB8XP4kvxlLhCBLPLImmTdBKXwlphFZwd5R8QSeBOMERQyn7RieG8VzwkUvplIsDPnHSUJFTC+hyqED59SVoYfRU3iIDyU0o7O6PxIrESPgTr9uee4OkohBvPpzwXafMIOvixaJ1yU1Zs4+CoOAGqY9vNbGTBwXnex0UMdgfF5dHaybBGYNuEpULh6h3N03Jz7JQCwT+KvlOajrUnIuCkladNNzJ+XIUL2sPH+bys7bA1OHknSRKACgA6HeAUZ/VgKCi35iVgZ36E6PBfXgzydpATFeu1TPEHGqslwHMN+Mj4UXqt8SuRilCpek8vk2QJP8J4XgJ2OlLWS1ZKugd4798L69YL06rC+puC5ps8C/cAH5YhEcOSaKzRwNfjtWrSPhdLcUzE58EiI3fs2aD8MCh7vcg2a88Jtwd/fMp5m+bCj+JWaZAt5DULqEw9sK95MhoW8cXLrCrceBeliRGNRz8A75Vn+b8Ed/n5iuKHl1uLmAsMbIQSmb8XMR4SnQTOuRKaOdZnzJ7LrmHSI2IPSyLIvM74ydgvJXhCxJB/M0gq4evQsBDrtctX1ME7gzYJTkG8eF27Nopl/D+QxiyJa0VfCQdoFttEPmB8RW3foTFAJ65YuhgH79MKRryxfgbJ/Li4QLwi2imSyvBM833gvyEVivcHNPf3v2rwG8GY4HZCEoz3iQZ/OnvFEdF6saTR+sWSSFAw5c5Z4OR+z9/UeK/IiRpFYzIM7IByPw6kQTeKq8QmkWRHxUHxrWhgW/jduCUFThCfPJ7TE8B3R+JOKN3I+OHk6NgmQ6W8VC04PWFUOmPuZAgGmbvsGhajW9uc9FuQjOOT0xNGzU5tUIukQwnI/VQGpycMTjUt6JFXAn8RScKV4FqMaQtOAO7sgejTI/9bcMVKQRJUguvoSlfKP9N6ckL8AWg6/M67+W+UAAAAAElFTkSuQmCC';

  componentWillReceiveProps(nextProps) {
    if(nextProps.hasOwnProperty('hasError')) {
      this.setState((prevState, props)=>{
        return {...prevState, hasError: nextProps.hasError }
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName, objectPropState)  {
     return defaultComponentStyle(styleName, objectPropState);
   }

  displayClearInputControl(input) {
    if(input.length > 0) {
      if(this.state.clearInputIsActive == false){

        this.setState((prevState, props)=>{
          return {...prevState, clearInputIsActive: true }
        });
      }
    } else {

      this.setState((prevState, props)=>{
        return {...prevState, clearInputIsActive: false }
      });
    }
  }

  clearInput() {
    this.refs['searchFilterInput'].value = '';
    this.setState((prevState, props)=>{
      return {...prevState, clearInputIsActive: false }
    });
  }

  handleFocus() {
    if (!this.props.isDisabled) {
      this.setState((prevState, props)=>{
        return {...prevState, 'isFocus': true  }
      });
      this.props.cbOnFocus(true);
    }
  }

  handleBlur() {
    if (!this.props.isDisabled) {
      this.setState((prevState, props)=>{
        return {...prevState, 'isFocus': false }
      });
      this.props.cbOnFocus(false);
    }
  }

  handleChange() {
    this.setState((prevState, props)=>{
      return {...prevState, 'hasError' : false }
    });
  }

  handleMouseEnter() {
    if (!this.props.isDisabled) {
      this.setState((prevState, props)=>{
        return {...prevState, 'onHover': true, 'hasError': false }
      });
    }
  }

  handleMouseLeave() {
    if (!this.props.isDisabled) {
      this.setState((prevState, props)=>{
        return {...prevState, 'onHover': false }
      });
    }
  }

  setInputFieldStyle() {
    let dynamicInputStates;
    if (this.props.isDisabled) {
      dynamicInputStates = {
        ...this.searchFilterInputStyle,
        ...this.searchFilterInputDisabledStyle
      };
    } else if (this.state.hasError) {
      dynamicInputStates = {
        ...this.searchFilterInputStyle,
        ...this.searchFilterInputErrorStyle
      };
    } else if (this.state.isFocus) {
      dynamicInputStates = {
        ...this.searchFilterInputStyle,
        ...this.searchFilterInputFocusStyle
      };
    } else if (this.state.onHover) {
      dynamicInputStates = {
        ...this.searchFilterInputStyle,
        ...this.searchFilterInputHoverStyle
      };
    } else {
      dynamicInputStates = this.searchFilterInputStyle;
    }
      return dynamicInputStates;
  }

  setSearchSvgStyle() {
    let dynamicInputStates;
    if (this.state.hasError) {
      dynamicInputStates = {
        ...this.searchSvgStyle,
        ...this.searchSvgErrorStyle
      };
    } else if (this.state.isFocus) {
      dynamicInputStates = {
        ...this.searchSvgStyle,
        ...this.searchSvgFocusStyle
      };
    } else if (this.state.onHover) {
      dynamicInputStates = {
        ...this.searchSvgStyle,
        ...this.searchSvgHoverStyle
      };
    } else if (this.props.isDisabled) {
      dynamicInputStates = {
        ...this.searchSvgStyle,
        ...this.searchSvgDisabledStyle
      };
    } else {
      dynamicInputStates = this.searchSvgStyle;
    }
      return dynamicInputStates;
  }

  encodeInput(){
    let targetValue;
    // wrap in try catch so it will continue
    try{
      targetValue = decodeURI(encodeURI(this.refs.searchFilterInput.value));
    } catch(e){
      targetValue = this.refs.searchFilterInput.value;
    }

    return targetValue;
  }

  inputKeyUp(){
    if(this.inputTimeout != 0){
      clearTimeout(this.inputTimeout);
    }
    this.inputTimeout = setTimeout(()=>{
      this.props.cbStringToFilter(this.encodeInput(), this.refs.searchFilterInput);
    }, 500); // NOTE: This setTimeout is here to prevent this function from firing for EVERY keyUp event which can cause slowness in the app. Please do not remove. - KCN
    this.displayClearInputControl(this.encodeInput());
  }

  prefetchStyles(){
    this.removeSvgStyle = this.getDefaultStyle('removeSvgStyle');
    this.searchFilterAreaStyle = this.getDefaultStyle('searchFilterAreaStyle');
    this.searchSvgContainerStyle = this.getDefaultStyle('searchSvgContainerStyle');
    this.searchSvgStyle = this.getDefaultStyle('searchSvgStyle');
    this.searchFilterInputStyle = this.getDefaultStyle('searchFilterInputStyle');
    this.resetInputStyle = this.getDefaultStyle('resetInputStyle');
    this.resetInputHiddenStyle = this.getDefaultStyle('resetInputHiddenStyle')
    this.errorWrapperStyle = this.getDefaultStyle('errorWrapperStyle');
    this.errorAreaStyle = this.getDefaultStyle('errorAreaStyle');
    this.errorAreaHiddenStyle = this.getDefaultStyle('errorAreaHiddenStyle');
    this.alertSVGStyle = this.getDefaultStyle('alertSVGStyle');
    this.errorTextStyle = this.getDefaultStyle('errorTextStyle');
    this.searchFilterInputDisabledStyle = this.getDefaultStyle('searchFilterInputDisabledStyle');
    this.searchFilterInputErrorStyle = this.getDefaultStyle('searchFilterInputErrorStyle');
    this.searchFilterInputFocusStyle = this.getDefaultStyle('searchFilterInputFocusStyle');
    this.searchFilterInputHoverStyle = this.getDefaultStyle('searchFilterInputHoverStyle');
    this.searchSvgErrorStyle = this.getDefaultStyle('searchSvgErrorStyle');
    this.searchSvgFocusStyle = this.getDefaultStyle('searchSvgFocusStyle');
    this.searchSvgHoverStyle = this.getDefaultStyle('searchSvgHoverStyle');
    this.searchSvgDisabledStyle = this.getDefaultStyle('searchSvgDisabledStyle');
  }

  render() {

    const errorArea = this.state.hasError && !this.state.isFocus ? this.errorAreaStyle : {...this.errorAreaStyle, ...this.errorAreaHiddenStyle};
    const resetInputStyles = this.state.clearInputIsActive == true ? this.resetInputStyle : {...this.resetInputStyle, ...this.resetInputHiddenStyle};

    return (
      <div
          className = "searchFilterArea"
          style = {this.searchFilterAreaStyle}
      >
          <div
              style = {this.searchSvgContainerStyle}
              className = 'searchContainer'
          >
            🔍
          </div>
          <div style={this.errorWrapperStyle} >
              <input
                  aria-label = 'Input'
                  className = 'input'
                  disabled = {this.props.isDisabled}
                  onBlur = {this.handleBlur}
                  onChange = {this.handleChange}
                  onFocus = {this.handleFocus}
                  onKeyUp = {this.inputKeyUp}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  placeholder = {!this.props.isDisabled == true ? this.props.placeholderText : 'DISABLED'}
                  ref = 'searchFilterInput'
                  style = {this.setInputFieldStyle()}
                  type = "text"
              />
          </div>
          <div
              aria-label = {'Reset input'}
              className = 'resetInput'
              onClick = {() => {this.clearInput(); this.props.cbStringToFilter('');}}
              onKeyDown = {() => {this.clearInput(); this.props.cbStringToFilter('');}}
              role = "button"
              style = {resetInputStyles}
              tabIndex = {0}
          >
          ❌
          </div>
      </div>
    );
  }
}


export default SearchFilter;
