import React from 'react';
import PropTypes from 'prop-types';
import './Docs.css';

/**
 * A component to display the information about a single component
 */
class Doc extends React.Component {

    render() {
        function keys(obj) {
            const keys = [];
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            return keys;
        }

        const sortedProps = keys(this.props.obj.props).sort();

        const props = [];
        for (const content in sortedProps) {
            const propName = sortedProps[content], propObj = this.props.obj.props[propName];
            const requiredText = propObj.required ? <span className="Doc--required">REQUIRED</span> : null;
            props.push(
                <div key={content}>
                    <h3>{propName}</h3>
                    <p>Type: <strong>{propObj.type.name}</strong> {requiredText}</p>
                    {propObj.description ? <p className="Doc--description">{propObj.description}</p> : null}
                </div>
            );
        }

        return (
            <div className="Doc">
                <h2>{this.props.component}</h2>
                <p className="Doc--description">{this.props.obj.description}</p>
                {props.length ? null : <p className="Doc--noProperties">This component has no properties</p>}
                {props}
            </div>
        )
    }
}

Doc.propTypes = {
    /**
     * The object containing information about the Doc
     */
    obj: PropTypes.object.isRequired,
    /**
     * The name of the component
     */
    component: PropTypes.string.isRequired,
}

export default Doc
