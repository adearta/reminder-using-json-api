import React from 'react'
import PropTypes from 'prop-types'


const Button = ({text, color, onAdd}) => {
    return <button 
    style={{backgroundColor:color}}
    onClick = {onAdd} 
    className="btn">
        {text}
    </button>
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string
}


export default Button
