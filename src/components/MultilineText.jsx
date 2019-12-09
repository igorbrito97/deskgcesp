import React from 'react';
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';

class MultilineText extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: props.text,
      variant: props.variant ? props.variant : null,
      align: props.align ? props.align : null
    }
  }
  
  componentDidUpdate(prevProps) {
    console.log('update-prevProps',prevProps,this.props)
    if(prevProps.text !== this.props.text) {
      if(this.props.text){
        this.setState({
          text: this.props.text,
          variant: this.props.variant ? this.props.variant : null,
          align: this.props.align ? this.props.align : null
        })
      }
    }
  }

  render() {
    const {text,variant,align} = this.state;
    console.log('stateMultiline',this.state);
    return (
        String(text).split("\n").map(line => {
            if(variant === null && align === null)
              return <Typography>{line}</Typography>
            else if(variant !== null && align !== null)
              return <Typography variant={variant} align={align}>{line}</Typography>
            else if(variant!== null)
              return <Typography variant={variant}>{line}</Typography>
            else return <Typography align={align}>{line}</Typography>
        })
    );
  }
  
}

const mapStateToProps = (state) => ({
  ...state
});
export default connect(mapStateToProps)(MultilineText);