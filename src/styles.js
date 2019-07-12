const defaultComponentStyle = (styleName, objectPropState) => {
     const styles = {
       categoryListULStyle: {
         display: 'flex',
         flexDirection: 'column',
         height: '130px', //this height was set by design so that some conversation activity can be viewed behind the component
         listStyle: 'none',
         margin: '0px',
         overflow: 'auto',
         padding: '0px'
       },
       emojiCategoryListStyle: {
         background: '#f8f9fa'
       },
       emojiMenuStyle: {
         border: 'solid 1px #dee2e6',
         borderRadius: '4px',
         boxShadow: '0 2px 8px 0 rgba(33, 37, 41, 0.16)',
         height: '218px', //this height was set by design so that some conversation activity can be viewed behind the component
         position: 'absolute',
         top: '0px' //this is set by design so that some conversation activity can be viewed behind the component
       },
       emojiMenuClosedStyle: {
         display: 'none'
       },
       emojiNavigationStyle: {
         borderBottom: 'solid 1px #ced4da',
         borderTop: 'solid 1px #ced4da',
         display: 'flex',
         flexDirection: 'row',
         listStyle: 'none',
         margin: '0px',
         padding: '0px'
       },
       emojiNavigationAnchorStyle: {
         alignItems: 'center',
         borderBottom: 'solid 2px #f1f3f5',
         cursor: 'pointer',
         display: 'flex',
         flex: 1,
         height: '38px', //this height was set by design so that some conversation activity can be viewed behind the component
         justifyContent: 'center',
         minWidth: '59px',
         textDecoration: 'none'
       },
       emojiNavigationAnchorActiveStyle: {
         alignItems: 'center',
         borderBottom: 'solid 2px #329af0',
         cursor: 'pointer',
         display: 'flex',
         flex: 1,
         height: '38px',
         justifyContent: 'center',
         minWidth: '60px',
         textDecoration: 'none'
       },
       emojiNavigationAnchorActiveHoverStyle: {
         alignItems: 'center',
         backgroundColor: '#ced4da',
         borderBottom: 'solid 2px #329af0',
         cursor: 'pointer',
         display: 'flex',
         flex: 1,
         height: '38px', //this height was set by design so that some conversation activity can be viewed behind the component
         justifyContent: 'center',
         minWidth: '60px',
         textDecoration: 'none'
       },
       emojiNavigationAnchorHoverStyle: {
         alignItems: 'center',
         backgroundColor: '#ced4da',
         borderBottom: 'solid 2px #ced4da',
         cursor: 'pointer',
         display: 'flex',
         flex: 1,
         height: '38px', //this height was set by design so that some conversation activity can be viewed behind the component
         justifyContent: 'center',
         minWidth: '60px',
         textDecoration: 'none'
       },
       emojiNavigationLiStyle: {
         background: '#f1f3f5',
         display: 'flex'
       },
       emojiPickerContainerStyle: {
         height: '24px', //this height was set by design so that some conversation activity can be viewed behind the component
         margin: '0px',
         position: 'relative',
         padding: '0px',
         width: '24px' // this width is set so it will not accidently over take the input area in any way
       },
       emoticonSvgActiveStyle: {
         fill: '#329af0',
         height: '24px',
         padding: '0px',
         width: '24px'
       },
       emoticonSvgActiveHoverStyle: {
         fill: '#ced4da',
         height: '24px',
         padding: '0px',
         width: '24px'
       },
       emoticonSvgHoverStyle: {
         fill: '#ced4da',
         height: '24px',
         padding: '0px',
         width: '24px'
       },
       emoticonSvgStyle: {
         fill: '#adb5bd',
         height: '24px',
         padding: '0px',
         width: '24px'
       },
       searchContainerStyle: {
         alignItems: 'center',
         background: '#e9ecef',
         display: 'flex',
         height: '48px', //this height was set by design so that some conversation activity can be viewed behind the component
         justifyContent: 'center'
       },
       searchStyleComp:{
         searchFilterArea: {
           margin: '0px 8px', //this is to maintain a consistant spacing from the edge of the emoji picker no matter how large it is
           width: '100%'
         },
         searchFilterInput: {
           backgroundColor: '#f8f9fa',
         },
         searchSvgStyle : {
           fill: '#adb5bd'
         }
       },
       toggleMenuBtnStyle: {
         height: "40px",
         width: "40px"
       },
       toggleMenuBtnStyleMenuOpen: {
         buttonStyles: {
           alignItems: 'center',
           backgroundColor: '#f8f9fa',
           border: 'none',
           borderRadius: 'none',
           display: 'flex',
           cursor: 'pointer',
           justifyContent: 'center',
           outline: 'none',
           paddingBottom: '0px',
           paddingLeft: '0px',
           paddingRight: '0px',
           paddingTop: '0px'
         },
         labelStyles: {
           display: 'none'
         },
         svgStyles: {
           height:'20px',
           width: '20px',
           paddingLeft:  '6px',
           paddingRight:  '6px',
           paddingTop:  '6px',
           paddingBottom:  '6px',
           fill: '#329af0'
         },
         hoverButtonStyles: {
           alignItems: 'center',
           borderRadius: 'none',
           cursor: 'pointer',
           display: 'flex',
         },
         hoverLabelStyles: {
           display: 'none'
         },
         hoverSvgStyles: {
           height:'20px',
           width: '20px',
           paddingLeft:  '6px',
           paddingRight:  '6px',
           paddingTop:  '6px',
           paddingBottom:  '6px',
           fill: '#329af0'
         },
         focusButtonStyles: {},
         focusLabelStyles: {},
         focusSvgStyles: {}
       },
       emojiCategoryStyle: {
         categoryItemStyle: {
           emojiLIStyle: {},
           emojiLIHoverStyle: {}
         },
         categoryItemULStyle: {},
         categoryTitleStyle: {},
         emptyCategoryItemStyle: {},
         emojiCategoryLIStyle: {}
       },

       /* --------- emojiCategory.js --------*/

       categoryItemStyle: {
         borderBottom: '1px solid #dee2e6',
         padding: '8px' //this is set by design for consistancy to maintain a consistant spacing and look
       },
       categoryItemULStyle: {
         display: 'flex',
         flexDirection: 'row',
         flexWrap: 'wrap',
         listStyle: 'none',
         margin: '0px',
         padding: '0px'
       },
       categoryTitleStyle: {
         color: '#adb5bd',
         fontSize: '12px',
         fontWeight: '600'
       },
       emptyCategoryItemStyle: {
        display: 'none'
       },
       emojiCategoryLIStyle: {},

       /* --------- emoji.js --------*/

       emojiLIStyle: {
         cursor: 'pointer',
         display: 'flex',
         padding: '10px' //this is set by design for consistancy so the hover and non-hover maintain a consistant spacing and look
       },
       emojiLIHoverStyle: {
         backgroundColor: '#e9ecef',
         cursor: 'pointer',
         display: 'flex',
         padding: '10px' //this is set by design for consistancy so the hover and non-hover maintain a consistant spacing and look
       }
     };
     return (styles[styleName]);

};

export default defaultComponentStyle;
