const defaultComponentStyle = (styleName, objectPropState) => {
     const styles = {
       // Styles the container around input
       searchFilterAreaStyle: {
         display: 'flex',
         position: 'relative',
         zIndex: 1
       },

       // Styles for default input state
       searchFilterInputStyle: {
         backgroundColor: '#f8f9fa',
         borderBottom: '1px solid #dee2e6',
         borderLeft: '1px solid #dee2e6',
         borderRadius: '20px',
         borderRight: '1px solid #dee2e6',
         borderTop: '1px solid #dee2e6',
         boxSizing: 'border-box',
         color: '#212529',
         cursor: 'text',
         fontSize: '12px',
         height: '40px',
         outline: 'none',
         padding: '0 50px 0 40px',
         width: '100%'
       },

       // Styles for disabled input state
       searchFilterInputDisabledStyle: {
         backgroundColor: '#f1f3f5',
         borderBottom:  '1px solid #ced4da',
         borderLeft:  '1px solid #ced4da',
         borderRight:  '1px solid #ced4da',
         borderTop: '1px solid #ced4da',
         cursor: 'not-allowed'
       },

       // Styles for error input state
       searchFilterInputErrorStyle: {
         borderBottom:  '2px solid #e03131',
         borderLeft:  '2px solid #e03131',
         borderRight:  '2px solid #e03131',
         borderTop: '2px solid #e03131'
       },

       // Styles for focus input state
       searchFilterInputFocusStyle: {
         borderBottom:  '2px solid #228ae6',
         borderLeft:  '2px solid #228ae6',
         borderRight:  '2px solid #228ae6',
         borderTop: '2px solid #228ae6'
       },

       // Styles for hover input state
       searchFilterInputHoverStyle: {
         backgroundColor: '#e9ecef',
         borderBottom:  '1px solid #adb5bd',
         borderLeft:  '1px solid #adb5bd',
         borderRight:  '1px solid #adb5bd',
         borderTop: '1px solid #adb5bd'
       },

       // Styles the container around SearchSVG
       searchSvgContainerStyle: {
         borderRadius: '50%',
         color:  '#212529',
         height: '24px',
         left: '8px',
         padding: '2px',
         position: 'absolute',
         textAlign: 'center',
         top: '6px',
         width: '24px',
         zIndex: 3
       },

       // Styles SearchSVG default state
       searchSvgStyle : {
         fill: '#212529',
         height: '24px',
         width: '24px'
       },

       // Styles SearchSVG disabled state
       searchSvgDisabledStyle: {
         fill: '#DEE2E6'
       },
       // Styles SearchSVG error state
       searchSvgErrorStyle: {
         fill: '#e03131'
       },

       // Styles SearchSVG focus state
       searchSvgFocusStyle: {
         fill: '#228ae6'
       },

       // Styles SearchSVG hover state
       searchSvgHoverStyle: {
         fill: '#212529'
       },

       // Styles container around RemoveSVG visible state
       resetInputStyle: {
         background: 'transparent',
         borderRadius: '50%',
         cursor: 'pointer',
         display: 'block',
         height: '30px',
         padding: '2px',
         position: 'absolute',
         right: '5px',
         textAlign: 'center',
         top: '6px',
         width: '40px'
       },

       // Styles container around RemoveSVG hidden state
       resetInputHiddenStyle : {
         display: 'none'
       },

       // Styles RemoveSVG
       removeSvgStyle: {
         backgroundColor: 'inherit',
         fill: '#212529',
         height: '24px',
         width: '24px'
       },

       // Styles the div that contains input and errorArea
       errorWrapperStyle : {
         display: 'flex',
         position: 'relative',
         width: '100%'
       },

       // Styles the div that contains the AlertSVG and AlertText visible state.
       errorAreaStyle : {
         alignItems: 'center',
         backgroundColor: '#e03131',
         borderRadius: '2px',
         color: '#f8f9fa',
         display: 'flex',
         flex: '1',
         paddingBottom: '10px',
         paddingTop: '30px',
         position: 'absolute',
         top: '50%',
         width: '100%',
         zIndex: -1
       },

       // Styles the div that contains the AlertSVG and AlertText hidden state.
       errorAreaHiddenStyle : {
         display: 'none'
       },

       // Styles the AlertSVG
       alertSVGStyle : {
         fill: '#f8f9fa',
         height: '20px',
         paddingLeft: '10px',
         width: '20px'
       },

       // Styles the error text
       errorTextStyle : {
         fontSize: '12px',
         paddingLeft: '10px',
         paddingRight: '10px'
       },

     };
     return (styles[styleName]);

};

export default defaultComponentStyle;
