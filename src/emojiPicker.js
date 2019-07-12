/*
  Imports from basic requirements of this componet
*/
import React from 'react';
import { fromJS } from 'immutable';
import objectMerge from 'object-merge';
import PropTypes from 'prop-types';

/*
  Imports from subcomponents of this componet
*/
import defaultComponentStyle from "./styles.js";
import EmojiList from "./emojiList.js";
import EmojiCategory from "./emojiCategory.js";
import SearchFilter from "./searchFilter.js";

class EmojiPicker extends React.Component {
  constructor(props){
    super(props);
    this.displayName = 'EmojiPicker';
    this.state = {
      'emojiPickerOpen': false,
      'hoverName': 'none',
      'activeName': 'none',
      'emojiList': EmojiList,
      'isSearchFocused': false,
      'emojiSearchInput': '',
      'recentEmojisList': this.filterRecentsList(EmojiList)
    };

    /* Start of References List*/
    this.emojiPickerContainerReference = "";
    this.categoryListULRefForScroll = "";
    this.recentEmojiBookmarkRef = "";
    this.facesEmojiBookmarkRef = "";
    this.foodEmojiBookmarkRef = "";
    this.natureEmojiBookmarkRef = "";
    this.activityEmojiBookmarkRef = "";
    this.symbolsEmojiBookmarkRef = "";
    this.searchFilterInputRef = "";

    // an array of objects with information necessary to render a category
    this.categories = [
      {
        categoryRef: (el)=>{return this.recentEmojiBookmarkRef = el;},
        filteredList: this.state.recentEmojisList,
        title:'Recently Used'
      },
      {
        categoryRef: (el)=>{return this.facesEmojiBookmarkRef = el;},
        filteredList: this.createCategory('faces').concat(this.createCategory('people')),
        title: 'Faces & People'
      },
      {
        categoryRef: (el)=>{return this.foodEmojiBookmarkRef = el;},
        filteredList: this.createCategory('food').concat(this.createCategory('objects')),
        title: 'Food & Objects'
      },
      {
        categoryRef: (el)=>{return this.natureEmojiBookmarkRef = el;},
        filteredList: this.createCategory('nature'),
        title: 'Nature'
      },
      {
        categoryRef: (el)=>{return this.activityEmojiBookmarkRef = el;},
        filteredList: this.createCategory('activity').concat(this.createCategory('travel')),
        title: 'Activity & Travel'
      },
      {
        categoryRef: (el)=>{return this.symbolsEmojiBookmarkRef = el;},
        filteredList: this.createCategory('symbols').concat(this.createCategory('flags')),
        title: 'Symbols & Flags'
      }
    ];

    this.navigationObjectArray = [
        {
          liClassName: "recentsNavLi",
          navClassName: "recentsNav",
          navTitle: "Recently Used",
          navImage: "HistoryIconSVG"
        },
        {
          liClassName: "facesNavLi",
          navClassName: "facesNav",
          navTitle: "Faces & People",
          navImage: "FaceIconSVG"
        },
        {
          liClassName: "foodNavLi",
          navClassName: "foodNav",
          navTitle: "Food & Objects",
          navImage: "BulbIconSVG"
        },
        {
          liClassName: "natureNavLi",
          navClassName: "natureNav",
          navTitle: "Nature",
          navImage: "LeafIconSVG"
        },
        {
          liClassName: "activityNavLi",
          navClassName: "activityNav",
          navTitle: "Activity & Travel",
          navImage: "CarIconSVG"
        },
        {
          liClassName: "symbolsNavLi",
          navClassName: "symbolsNav",
          navTitle: "Symbols & Flags",
          navImage: "FlagIconSVG"
        }
      ];

    this.prefetchStyles();
    this.updateStyles = this.updateStyles.bind(this);
    this.closeEmojiPicker = this.closeEmojiPicker.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.emojiSelected = this.emojiSelected.bind(this);
    this.filterRecentsList = this.filterRecentsList.bind(this);
    this.handleSearchFilterOnFocus = this.handleSearchFilterOnFocus.bind(this);
    this.hasParentWithMatchingSelector = this.hasParentWithMatchingSelector.bind(this);
    this.renderCategoryList = this.renderCategoryList.bind(this);
    this.renderNavigationList = this.renderNavigationList.bind(this);
    this.setEmojiNavigationItemStyle = this.setEmojiNavigationItemStyle.bind(this);
    this.setEmojiNavigationSVGStyles = this.setEmojiNavigationSVGStyles.bind(this);
    this.setNavHoverOnScroll = this.setNavHoverOnScroll.bind(this);
    this.setSearchString = this.setSearchString.bind(this);
    this.toggleEmojiPickerOpen = this.toggleEmojiPickerOpen.bind(this);
    this.toggleHoverName = this.toggleHoverName.bind(this);
    this.toggleHoverNone = this.toggleHoverNone.bind(this);
    this.updateEmojiList = this.updateEmojiList.bind(this);

    this.categoryTitles = {
      recent: 'Recently Used',
      faces: 'Faces & People',
      food: 'Food & Objects',
      nature: 'Nature',
      activity: 'Activity & Travel',
      symbols: 'Symbols & Flags'
    };

    this.placeholderFindEmoji = 'Find emoji...';

    this.openEmojiPickerAriaLabel = 'Open Emoji Menu';

    this.openEmojiPickerButtonLabel = 'Open Emoji Menu';

  }

  static propTypes = {
    cbEmojiSelection: PropTypes.func,
    compStyle: PropTypes.object,
    recentEmojis: PropTypes.array
  }

  static defaultProps = {
    cbEmojiSelection: (()=>{}),
    recentEmojis: []
  }

  /*
    In Component Did Mount we are currently doing the following:
      ~ setting the 'ref' for the search input tag.
      ~ if the scroll container is not undefined we check to see if
        the scroll top of the container is 0 and if the active name
        is none, if it is none, we adjust the scroll down 1 px to
        allow the function set nav on scroll to set the correct
        navigation item indication (either recents or faces if there
        are no recents yet).
      ~ adding an event listener to the document that will allow the
        document to close when the user clicks away from the emoji picker component.
  */
  componentDidMount(){

    if(this.categoryListULRefForScroll.scrollTop === 0 && this.state.activeName === 'none'){
      this.categoryListULRefForScroll.scrollTop = 1;
    }
    this.setNavHoverOnScroll();
    document.addEventListener('click', this.closeEmojiPicker);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  /*
    In Component Will update we are currently checking for the following:
      ~ if the component style has updated from the parent, recalculate the styles and override the previous compstyle.
  */
  componentWillUpdate(nextProps, nextState){
    if (nextProps.compStyle && !fromJS(nextProps.compStyle).equals(fromJS(this.props.compStyle))){
      this.updateStyles(nextProps.compStyle);
    }
  }

  /*
    In Component Did Update we are currently setting the following:
      ~ if the scroll container is not undefined we check to see if
        the scroll top of the container is 0 and if the active name
        is none, if it is none, we adjust the scroll down 1 px to
        allow the function set nav on scroll to set the correct
        navigation item indication (either recents or faces if there
        are no recents yet).
      ~ We also update the EmojiList based on the length of the
        emojiSearchInput to ensure if the input is empty that the
        emoji list shows all emojis and if it is not empty that is
        shows the properly filtered emojis.
  */
  componentDidUpdate(prevProps, prevState){
    if(this.categoryListULRefForScroll !== undefined){
      if(this.categoryListULRefForScroll.scrollTop === 0 && this.state.activeName === 'none'){
        this.categoryListULRefForScroll.scrollTop = 1;
      }
      this.setNavHoverOnScroll();
    }
    this.updateEmojiList(this.state.emojiSearchInput);
  }

  /*
    component will unmount is simply removing the event listener from the document to prevent errors
  */
  componentWillUnmount() {
    document.removeEventListener('click', this.closeEmojiPicker);
  }

  prefetchStyles () {
    this.emojiPickerContainerStyle = this.getDefaultStyle('emojiPickerContainerStyle');
    this.toggleMenuBtnStyle = this.getDefaultStyle('toggleMenuBtnStyle');
    this.toggleMenuBtnStyleMenuOpenStyle = this.getDefaultStyle('toggleMenuBtnStyleMenuOpen');
    this.emojiMenuStyle = this.getDefaultStyle('emojiMenuStyle');
    this.emojiMenuClosedStyle = this.getDefaultStyle('emojiMenuClosedStyle');
    this.searchContainerStyle = this.getDefaultStyle('searchContainerStyle');
    this.emojiNavigationStyle = this.getDefaultStyle('emojiNavigationStyle');
    this.emojiNavigationLiStyle = this.getDefaultStyle('emojiNavigationLiStyle');
    this.emojiNavigationAnchorStyle = this.getDefaultStyle('emojiNavigationAnchorStyle');
    this.emojiNavigationAnchorHoverStyle = this.getDefaultStyle('emojiNavigationAnchorHoverStyle');
    this.emojiNavigationAnchorActiveStyle = this.getDefaultStyle('emojiNavigationAnchorActiveStyle');
    this.emojiNavigationAnchorActiveHoverStyle = this.getDefaultStyle('emojiNavigationAnchorActiveHoverStyle');
    this.emojiCategoryStyle = this.getDefaultStyle('emojiCategoryStyle');
    this.emojiCategoryListStyle = this.getDefaultStyle('emojiCategoryListStyle');
    this.emojiCategoryLIStyle = this.getDefaultStyle('emojiCategoryLIStyle');
    this.emoticonSvgActiveHoverStyle = this.getDefaultStyle('emoticonSvgActiveHoverStyle');
    this.emoticonSvgActiveStyle = this.getDefaultStyle('emoticonSvgActiveStyle');
    this.emoticonSvgHoverStyle = this.getDefaultStyle('emoticonSvgHoverStyle');
    this.emoticonSvgStyle = this.getDefaultStyle('emoticonSvgStyle');
    this.searchStyleComp = this.getDefaultStyle('searchStyleComp');
    this.categoryListULStyle = this.getDefaultStyle('categoryListULStyle');
    this.emojiCategoryStyle = this.getDefaultStyle('emojiCategoryStyle');
  }

  /*
    The purpose of this function is to ensure the user of this component can properly pass in
    compstyles and they will update when needed. this is called in component will update.
    The compStyleProp needs to be passed in with next props
  */
  updateStyles (compStyleProp) {
    this.emojiPickerContainerStyle = objectMerge(
        this.emojiPickerContainerStyle,
        compStyleProp.emojiPickerContainerStyle
    );
    this.toggleMenuBtn = objectMerge(
        this.toggleMenuBtnStyle,
        compStyleProp.toggleMenuBtnStyle
    );
    this.toggleMenuBtnStyleMenuOpenStyle = objectMerge(
        this.toggleMenuBtnStyleMenuOpenStyle,
        compStyleProp.toggleMenuBtnStyleMenuOpen
    );
    this.emojiMenu = objectMerge(
        this.emojiMenuStyle,
        compStyleProp.emojiMenuStyle
    );
    this.emojiMenuClosed = objectMerge(
        this.emojiMenuClosedStyle,
        compStyleProp.emojiMenuClosedStyle
    );
    this.searchContainer = objectMerge(
        this.searchContainerStyle,
        compStyleProp.searchContainerStyle
    );
    this.emojiNavigation = objectMerge(
        this.emojiNavigationStyle,
        compStyleProp.emojiNavigationStyle
    );
    this.emojiNavigationLi = objectMerge(
        this.emojiNavigationLiStyle,
        compStyleProp.emojiNavigationLiStyle
    );
    this.emojiNavigationAnchor = objectMerge(
        this.emojiNavigationAnchorStyle,
        compStyleProp.emojiNavigationAnchorStyle
    );
    this.emojiNavigationAnchorHover = objectMerge(
        this.emojiNavigationAnchorHoverStyle,
        compStyleProp.emojiNavigationAnchorHoverStyle
    );
    this.emojiNavigationAnchorActive = objectMerge(
        this.emojiNavigationAnchorActiveStyle,
        compStyleProp.emojiNavigationAnchorActiveStyle
    );
    this.emojiNavigationAnchorActiveHover = objectMerge(
        this.emojiNavigationAnchorActiveHoverStyle,
        compStyleProp.emojiNavigationAnchorActiveHoverStyle
    );
    this.emojiCategoryList = objectMerge(
        this.emojiCategoryListStyle,
        compStyleProp.emojiCategoryListStyle
    );
    this.emojiCategoryLI = objectMerge(
        this.emojiCategoryLIStyle,
        compStyleProp.emojiCategoryLIStyle
    );
    this.emoticonSvgActiveHoverStyle = objectMerge(
        this.emoticonSvgActiveHoverStyle,
        compStyleProp.emoticonSvgActiveHoverStyle
    );
    this.emoticonSvgActiveStyle = objectMerge(
        this.emoticonSvgActiveStyle,
        compStyleProp.emoticonSvgActiveStyle
    );
    this.emoticonSvgHoverStyle = objectMerge(
        this.emoticonSvgHoverStyle,
        compStyleProp.emoticonSvgHoverStyle
    );
    this.emoticonSvgStyle = objectMerge(
        this.emoticonSvgStyle,
        compStyleProp.emoticonSvgStyle
    );
    this.searchStyleComp = objectMerge(
        this.searchStyleComp,
        compStyleProp.searchStyleComp
    );
    this.categoryListUL = objectMerge(
        this.categoryListULStyle,
        compStyleProp.categoryListULStyle
    );
    this.emojiCategoryStyle = objectMerge(
        this.emojiCategoryStyle,
        compStyleProp.emojiCategoryStyle
    );

  }

  getDefaultStyle(styleName, objectPropState)  {
    //console.log('STYLENAME:::::',styleName)
    return defaultComponentStyle(styleName, objectPropState);
  }

  /*
    This function closes the emoji picker if the user clicks outside of the picker area
  */
  closeEmojiPicker(e){
    //this if statement has the ! because we want if the function is false
    if(!this.hasParentWithMatchingSelector(e.target)) {
      this.setState((prevState) => {
        return { ...prevState, 'emojiPickerOpen': false, 'emojiSearchInput': '' };
      });

      if(this.searchFilterInputRef !== undefined){
        this.searchFilterInputRef = '';
      }
    }

  }

  /*
    this sets the input string to filter the list for the search filter input
  */
  setSearchString(input, inputRef){
    //console.log('inputref', inputRef)
    //console.log('searchComponent ref', this.refs.searchComponent) // I created this.refs.searchComponent in EmojiPicker render

    if(inputRef !== undefined){
      this.searchFilterInputRef = inputRef;
    } else {
      /// NOTE: Due to bug where SearchFilter was not clearning when EmojiPicker is closed, I have assigned SearchFilter a ref called 'searchComponent' so that I may access ref from within that component called "searchFilterInput". If inputRef is undefined we can still set this.searchFilterInputRef and therefore set it's value in closeEmojiPicker.
      this.searchFilterInputRef = this.refs.searchComponent.refs.searchFilterInput;
    }

    this.setState((prevState) => {
      return { ...prevState,'emojiSearchInput': input };
    });
  }

  /*
    This creates the seperate categories for the emojis.
  */
  createCategory(category){
    //console.log('category', category)
    return this.state.emojiList.filter((emoji)=>{
      //console.log('emoji', emoji)
      return emoji.category === category;
    });
  }

  /*
    This passes the selected emoji to the parent and closes the picker
  */
  emojiSelected(emoji){
    this.props.cbEmojiSelection(emoji);
    this.toggleEmojiPickerOpen();
  }

  /*
    This creates the recent list based on the list passed in from the parent
  */
  filterRecentsList(emojiList){
    return emojiList.filter((emoji)=>{
      return this.props.recentEmojis.indexOf(emoji.no) !== -1;
    });
  }

  /*
    this function checks to make sure the user is clicking outside of the component to close the component
  */
  hasParentWithMatchingSelector (target) {
    //console.log('hasParentWithMatchingSelector',this.emojiPickerContainerReference.contains(target))
    return this.emojiPickerContainerReference.contains(target);
  }

/*
  This renders the category list and combines categories according to design
*/
  renderCategoryList(){

    const categories = [
      {
        categoryRef: (el)=>{return this.recentEmojiBookmarkRef = el;},
        filteredList: this.state.recentEmojisList,
        title: this.categoryTitles.recent
      },
      {
        categoryRef: (el)=>{return this.facesEmojiBookmarkRef = el;},
        filteredList: this.createCategory('faces').concat(this.createCategory('people')),
        title: this.categoryTitles.faces
      },
      {
        categoryRef: (el)=>{return this.foodEmojiBookmarkRef = el;},
        filteredList: this.createCategory('food').concat(this.createCategory('objects')),
        title: this.categoryTitles.food
      },
      {
        categoryRef: (el)=>{return this.natureEmojiBookmarkRef = el;},
        filteredList: this.createCategory('nature'),
        title: this.categoryTitles.nature
      },
      {
        categoryRef: (el)=>{return this.activityEmojiBookmarkRef = el;},
        filteredList: this.createCategory('activity').concat(this.createCategory('travel')),
        title: this.categoryTitles.activity
      },
      {
        categoryRef: (el)=>{return this.symbolsEmojiBookmarkRef = el;},
        filteredList: this.createCategory('symbols').concat(this.createCategory('flags')),
        title: this.categoryTitles.symbols
      }
    ];

    // NOTE: Determining if emojiSearchInput has text if so use categoryObjectArray if not use this.categoryObjectArray. This is done to prevent slowness when rendering EmojiCategory.
    const categoryObjectArray = this.state.emojiSearchInput.length > 0 ? categories : this.categories;

      /*
        The ref for the EmojiCategory is passed in to the child component so that the parent component (this component) can access the ref.
      */
      const categoryListItems = categoryObjectArray.map((categoryProperties, index) => {
         return(
           <li className = "emojiCategoryLI" style = {this.emojiCategoryLIStyle} key = {`emojiCategoryLI${index}`}>
              <EmojiCategory
                  categoryRef =  {categoryProperties.categoryRef}
                  cbEmojiSelection = {this.emojiSelected}
                  compStyle={this.emojiCategoryStyle}
                  className = {`emojiCategoryUL${index}`}
                  filteredList = {categoryProperties.filteredList}
                  title = {categoryProperties.title}
              />
          </li>
        );
      });

    return (
      <ul
          className = "categoryListUL"
          style = {this.categoryListULStyle}
          onScroll ={this.setNavHoverOnScroll}
          ref ={(el)=>{ return this.categoryListULRefForScroll = el;}}
        >
          {categoryListItems}
      </ul>
    );
  }

/*
  this renders the navigation List

*/
  renderNavigationList(){

    const navigationObjectArray = [
      {
        liClassName: "recentsNavLi",
        navClassName: "recentsNav",
        navTitle: "Recently Used",
        navImage: "HistoryIconSVG"
      },
      {
        liClassName: "facesNavLi",
        navClassName: "facesNav",
        navTitle: "Faces & People",
        navImage: "FaceIconSVG"
      },
      {
        liClassName: "foodNavLi",
        navClassName: "foodNav",
        navTitle: "Food & Objects",
        navImage: "BulbIconSVG"
      },
      {
        liClassName: "natureNavLi",
        navClassName: "natureNav",
        navTitle: "Nature",
        navImage: "LeafIconSVG"
      },
      {
        liClassName: "activityNavLi",
        navClassName: "activityNav",
        navTitle: "Activity & Travel",
        navImage: "CarIconSVG"
      },
      {
        liClassName: "symbolsNavLi",
        navClassName: "symbolsNav",
        navTitle: "Symbols & Flags",
        navImage: "FlagIconSVG"
      }
    ];

    const navigationListItems = navigationObjectArray.map((navConfiguration) => {
      const NavigationSvg = EmojiList[1].char;
        /*
          Arrow function below is valid to prevent duplicate code, correctly call the function with the correct arguments,
          and because it is only repeated 6 times and shoule only have one emoji picker rendered at a time
        */
        return (
          <li
              className = {navConfiguration.liClassName}
              style = {this.emojiNavigationLiStyle}
              key = {navConfiguration.liClassName}
            >
            <div
                className = {navConfiguration.navClassName}
                style = {this.setEmojiNavigationItemStyle(navConfiguration.navClassName)}
                title={navConfiguration.navTitle}
                onMouseEnter = {this.toggleHoverName}
                onMouseLeave = {this.toggleHoverNone}
                onFocus = {this.toggleHoverName}
                onBlur = {this.toggleHoverNone}
                onClick = {(e)=>{this.setNavHoverOnScroll(e, navConfiguration.navClassName);}}
              >
                <p>
                 {NavigationSvg}
                </p>
            </div>
        </li>
      );
    });

    return (
      <ul className="emojiNavigation"  style = {this.emojiNavigationStyle} >
        {navigationListItems}
      </ul>
    );
  }


/*
  This sets the hover style for each navigation Item to ensure only one is active at any one time.
*/
  setEmojiNavigationItemStyle(category){
    let style;

    if(this.state.hoverName === category && this.state.activeName === category){
      style = this.emojiNavigationAnchorActiveHoverStyle;
    } else if(this.state.hoverName === category && this.state.activeName !== category){
      style = this.emojiNavigationAnchorHoverStyle;
    } else if(this.state.hoverName !== category && this.state.activeName === category){
      style = this.emojiNavigationAnchorActiveStyle;
    } else {
      style = this.emojiNavigationAnchorStyle;
    }

    return style;
  }


  /*
    This sets the hover style for each navigation Item to ensure only one is active at any one time.
  */
  setEmojiNavigationSVGStyles(category){
    let style;

    if(this.state.hoverName === category && this.state.activeName === category){
      style = this.emoticonSvgActiveHoverStyle;
    } else if(this.state.hoverName === category && this.state.activeName !== category){
      style = this.emoticonSvgHoverStyle;
    } else if(this.state.hoverName !== category && this.state.activeName === category){
      style = this.emoticonSvgActiveStyle;
    } else {
      style = this.emoticonSvgStyle;
    }

    return style;
  }


  /*
    This is to try to set the hover on scroll to tell the individual which category they are in.
    if this function is activated on click of a nav Item it will scroll the appropriate category into view
  */
  setNavHoverOnScroll(e, className){
    //console.log('setNavHoverOnScroll', e, className)

    let scrollPosition = this.categoryListULRefForScroll.scrollTop;

    const categoryObject = {
      recentsNav: this.recentEmojiBookmarkRef,
      facesNav: this.facesEmojiBookmarkRef,
      foodNav: this.foodEmojiBookmarkRef,
      natureNav: this.natureEmojiBookmarkRef,
      activityNav: this.activityEmojiBookmarkRef,
      symbolsNav: this.symbolsEmojiBookmarkRef
    };

    const categoryHeights = Object.keys(categoryObject).map(
      (category)=>{
        return categoryObject[category].clientHeight;
      }
    );

    const heightSettings = [ //this allows us to calculate the height of all of our heights
      categoryHeights[0],
      categoryHeights[0] + categoryHeights[1],
      categoryHeights[0] + categoryHeights[1] + categoryHeights[2],
      categoryHeights[0] + categoryHeights[1] + categoryHeights[2] + categoryHeights[3],
      categoryHeights[0] + categoryHeights[1] + categoryHeights[2] + categoryHeights[3] + categoryHeights[4],
      categoryHeights[0] + categoryHeights[1] + categoryHeights[2] + categoryHeights[3] + categoryHeights[4] + categoryHeights[5],
    ];

    //This fires when a user clicks on a navigation Icon
    if(typeof className === 'string'){

      const targetCategory = categoryObject[className];

      if(targetCategory !== undefined){
        return scrollPosition = targetCategory.scrollIntoView();
      }
    }

    this.setNewScrollPosition(scrollPosition, heightSettings);

  }

/*
  The function below is to find the scroll position in a decalative way.
  the reduce will return the most accurate object and the if statement will execute the state change if the
  scrollPosition is outside of the previous scroll area.
*/
  setNewScrollPosition(scrollPosition, heightSettings){
      const setScrollArray = [
        {
          scrollCondition: scrollPosition > 0 && scrollPosition <= heightSettings[0],
          categoryClassName: "recentsNav"
        },
        {
          scrollCondition: this.state.recentEmojisList.length > 0 && scrollPosition === 0 && scrollPosition <= heightSettings[0],
          categoryClassName: "recentsNav"
        },
        {
          scrollCondition: this.state.recentEmojisList.length === 0 && scrollPosition === 0 && scrollPosition <= heightSettings[0],
          categoryClassName: "none"
        },
        {
          scrollCondition: scrollPosition > heightSettings[0] && scrollPosition <= heightSettings[1],
          categoryClassName: "facesNav"
        },
        {
          scrollCondition: scrollPosition > heightSettings[1] && scrollPosition <= heightSettings[2],
          categoryClassName: "foodNav"
        },
        {
          scrollCondition: scrollPosition > heightSettings[2] && scrollPosition <= heightSettings[3],
          categoryClassName: "natureNav"
        },
        {
          scrollCondition: scrollPosition > heightSettings[3] && scrollPosition <= heightSettings[4],
          categoryClassName: "activityNav"
        },
        {
          scrollCondition: scrollPosition > heightSettings[4] && scrollPosition <= heightSettings[5],
          categoryClassName: "symbolsNav"
        }
      ];

      const newPosition = setScrollArray.reduce((currentPosition, setLocation)=>{
        if(!currentPosition && setLocation.scrollCondition === true){
          return setLocation;
        }
        return currentPosition;
      }, undefined);

     if(this.state.activeName !== newPosition.categoryClassName){
       this.setState((prevState) => {
         return { ...prevState,'activeName': newPosition.categoryClassName };
       });
     }
  }

  /*
    This function toggles the emoji picker open and closed and additionally it will clear the emojiSearchInput if it is not clear
  */
  toggleEmojiPickerOpen(){

    this.setState((prevState)=>{
      let newState;
        if(this.state.emojiSearchInput.length > 0 || this.state.emojiSearchInput !== undefined){
          newState = {...prevState, 'emojiSearchInput': '', 'emojiPickerOpen': !this.state.emojiPickerOpen};
          if(this.searchFilterInputRef !== undefined){
            this.searchFilterInputRef = '';
          }
        } else{
          newState = {...prevState, 'emojiPickerOpen': !this.state.emojiPickerOpen};
        }
      return newState;
    });
  }


  /*
    This contorls the toggle name of the emoji navigation. if the name matchess the toggle navigation
    classname while the mouse is over it, it will display hover.
  */
  toggleHoverName(e){
    /*
     e.persist() is a react function designed to make a persistant copy of the event for use in the
     function. if this is removed it produces an error in the console.
    */
    e.persist();
    if(this.state.hoverName !== e.target.className){
      this.setState((prevState) => {
        return { ...prevState, 'hoverName': e.target.className };
      });
    }
  }


  /*
    This function removes the hover name to remove the hover state formm all navigation when not hovered.
  */
  toggleHoverNone(){
    if(this.state.hoverName !== 'none'){
      this.setState((prevState) => {
        return { ...prevState,'hoverName': 'none' };
      });
    }
  }

  /*
    This updates the emoji list based on the length of the search input string. if the string
    is empty you will get the full list, if the string has text it will filter the list
  */
  updateEmojiList(input){
    if(input.length > 0){

      const filteredList = EmojiList.filter((emoji)=>{
        return (
          emoji.category.toLowerCase().includes(input.toLowerCase()) ||
          emoji.name.toLowerCase().includes(input.toLowerCase()) ||
          emoji.keywords.toLowerCase().includes(input.toLowerCase())
        );
      });

      this.setState((prevState) => {
        return { ...prevState, 'emojiSearchInput': input , 'emojiList': filteredList, 'recentEmojisList': this.filterRecentsList(filteredList)};
      });

    } else {

      this.setState((prevState) => {
        return { ...prevState, 'emojiSearchInput': input, 'emojiList': EmojiList, 'recentEmojisList': this.filterRecentsList(EmojiList)};
      });
    }
  }


  /*
    This function is intentionally left blank and is to prevent the default console log from SearchFilter on focus
  */
  handleSearchFilterOnFocus(){}

  render(){

    const menuStyle = this.state.emojiPickerOpen ? this.emojiMenuStyle : this.emojiMenuClosedStyle;
    const toggleMenuBtnStyles = this.state.emojiPickerOpen ? this.toggleMenuBtnStyleMenuOpenStyle : this.toggleMenuBtnStyle;

    return (
      <div className="emojiPickerContainer" style = {this.emojiPickerContainerStyle} ref = {(el)=>{return this.emojiPickerContainerReference = el;}}>
        <div className = "emojiMenu" style = {menuStyle} >
          <div className = "searchContainer" style = {this.searchContainerStyle} >
            <SearchFilter
                ref="searchComponent"
                cbOnFocus = {this.handleSearchFilterOnFocus}
                cbStringToFilter = {this.setSearchString}
                compStyle = {this.searchStyleComp}
                placeholderText = {this.placeholderFindEmoji}
            />
          </div>
          {this.renderNavigationList()}
          <div className="emojiCategoryList" style = {this.emojiCategoryListStyle} >
            {this.renderCategoryList()}
          </div>
        </div>
        <button
            onClick = {this.toggleEmojiPickerOpen}
            style = {toggleMenuBtnStyles}
            className = "toggleMenuBtn"
          >
          😃
        </button>
      </div>
    );
  }
}

export default EmojiPicker;
