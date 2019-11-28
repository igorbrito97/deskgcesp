import React from 'react';
import Typography from '@material-ui/core/Typography';

class MultilineText extends React.Component {
  state = {
      text: "",
      variant: "",
      align: "",
  }

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.setState({
      text: this.props.text
    })
  }
  
  componentDidUpdate(prevProps) {
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
    console.log("text",text,'varia',variant);
    return (
        String(text).split("\n").map(line => {
            return <Typography variant={variant} align={align}>{line}</Typography>
        })
    );
  }
  
}

export default MultilineText;