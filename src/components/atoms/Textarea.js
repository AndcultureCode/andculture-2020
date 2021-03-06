import React from 'react';

const Textarea = class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            fieldActive: false,
            placeholderValue: this.props.name,
        }

        this._updateInputValue = this._updateInputValue.bind(this);
        this._activateField = this._activateField.bind(this);
        this._disableField = this._disableField.bind(this);
    }

    _activateField() {
        this.setState({
            fieldActive: true,
            placeholderValue: '',
        })
    }

    _disableField(e) {
        if (e.target.value === "") {
            this.setState({
                fieldActive: false,
                placeholderValue: this.props.name,
            })
        }
    }

    _updateInputValue(e) {
        this.setState({ inputValue: e.target.value }, () => this.props.inputValueCallback(this.props.name, this.state.inputValue));
    }

    render() {
        const labelClassName = this.state.fieldActive ? "a-label -field-active" : "a-label";

        let textAreaClass = "a-textarea";
        textAreaClass += this.props.lightTheme ? ' -light ' : '';

        return (
            <fieldset className = { this.props.className }>
                <label
                    className = { labelClassName }
                    htmlFor   = { this.props.id }>
                    { this.props.name }
                </label>
                <textarea
                    aria-label  = { this.props.description }
                    value       = { this.props.value }
                    onFocus     = { this._activateField }
                    onBlur      = { this._disableField }
                    onChange    = { this._updateInputValue }
                    className   = { textAreaClass }
                    name        = { this.props.name }
                    placeholder = { this.state.placeholderValue }
                    id          = { this.props.id } />
            </fieldset>
        )
    }
}

export default Textarea
