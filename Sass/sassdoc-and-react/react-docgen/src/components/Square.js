import React from 'react';
import PropTypes from 'prop-types';
import './Square.css';

/**
 * A square involving some stuff
 */
class Square extends React.Component {

    render() {
        const squareClass = this.props.isSpinning ? 'Square spinning' : 'Square';
        return (
            <div className={squareClass} onClick={this.props.handleClick}>
                <h2>Square</h2>
                <p>{this.props.text}</p>
            </div>
        )
    }
}

Square.propTypes =  {
	/**
	 * The text for the square
	 */
    text: PropTypes.string.isRequired,
    /**
     * Determines whether the square is spinning or not
     */
    isSpinning: PropTypes.bool.isRequired,
    /**
     * The function that is triggered when the square is clicked
     */
    handleClick: PropTypes.func,
    /**
     * An optional object of styles for the square
     */
    styles: PropTypes.object
}

export default Square
