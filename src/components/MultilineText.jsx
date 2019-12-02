import React from 'react';
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';

class MultilineText extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: props.text,
      variant: props.variant ? props.variant : "b1",
      align: props.align ? props.align : "inherit"
    }
  }
  
  componentDidUpdate(prevProps) {
    console.log('update-prevProps',prevProps,this.props)
    if(prevProps.text !== this.props.text) {
      if(this.props.text){
        this.setState({
          text: this.props.text,
          variant: this.props.variant ? this.props.variant : "b1",
          align: this.props.align ? this.props.align : "inherit"
        })
      }
    }
  }

  render() {
    const {text,variant,align} = this.state;
    console.log('state',this.state);
    return (
        String(text).split("\n").map(line => {
            return <Typography variant={variant} align={align}>{line}</Typography>
        })
    );
  }
  
}

const mapStateToProps = (state) => ({
  ...state
});
export default connect(mapStateToProps)(MultilineText);