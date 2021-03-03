import React from 'react'
import Button from './Button'
import PropTypes from 'prop-types'


const Header = ({title, onShowAdd, switchColor}) => {
    return (
        <div className="header">
            <h1>{title}</h1>
            <Button 
            color={switchColor ? 'red' : 'green'} 
            text={switchColor ? 'Hide' : 'Add'} 
            onAdd={onShowAdd}
             />
        </div>
    )
}
Header.defaultProps={
    title: 'Task Tracker'
}
Header.propTypes={
    title: PropTypes.string
}

export default Header
