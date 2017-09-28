import React, { Component, PropTypes } from 'react';

export default class ShowBudget extends Component{
  
    render(){
        return(
                <div>
                        <h1>R${this.props.value}</h1>
                </div>
                
        );
    }
}

ShowBudget.propTypes = {
  budgetValue: PropTypes.object.isRequired,
};