import {
    EMAILPATTERN,
    PHONEPATTERN
}               from "../../constants/data-validation-patterns";
import Input    from '../atoms/Input';
import Textarea from '../atoms/Textarea';
import React    from 'react';

function encode(data) {
    return Object.keys(data)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
}

const ProjectForm = class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeQuestion:  1,
            totalQuestions:  6,
            formData:        {},
        }

        this._onNextClick       = this._onNextClick.bind(this);
        this._onBackClick       = this._onBackClick.bind(this);
        this._onSubmitClick     = this._onSubmitClick.bind(this);
        this._calculateProgress = this._calculateProgress.bind(this);
        this._setInputValue     = this._setInputValue.bind(this);
        this._onKeydownPress    = this._onKeydownPress.bind(this);
    }

    _onNextClick(e) {
        // prevent processing with keyboard when form input is invalid
        if (this._isFormDataInvalid()) {
            e.preventDefault();
            return;
        }

        if (this.state.activeQuestion === this.state.totalQuestions) {
            this._calculateProgress(1);
            return;
        }

        this.setState({
            activeQuestion:  this.state.activeQuestion + 1,
        }, this._calculateProgress(1));
    }

    _onBackClick(){
        if (this.state.activeQuestion === 1) {
            this._calculateProgress(0);
            return;
        }

        this.setState({
            activeQuestion:  this.state.activeQuestion  - 1,
        }, this._calculateProgress(0));
    }

    _onSubmitClick(e) {
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact-project", ...this.state.formData })
        })
            .then(() =>
                this._calculateProgress(1)
            )
            .catch(error => alert(error));

        e.preventDefault();
    }

    _isFormDataInvalid() {
        if (this.state.activeQuestion === 1 && this.state.formData.name && this.state.formData.name !== "") {
            return false;
        }

        if (this.state.activeQuestion === 2 && this.state.formData.email && this.state.formData.email !== "" && EMAILPATTERN.test(this.state.formData.email)) {
            return false;
        }

        if (this.state.activeQuestion === 3 && this.state.formData.phone && this.state.formData.phone !== "" && PHONEPATTERN.test(this.state.formData.phone)) {
            return false;
        }

        if ([4, 5, 6].indexOf(this.state.activeQuestion) != -1) {
            return false;
        }

        return true;
    }

    _calculateProgress(direction) {
        let percentComplete = (this.state.activeQuestion / this.state.totalQuestions) * 100;
        if (this.state.activeQuestion === this.state.totalQuestions && direction === 1) {
            this.props.isSubmittedCallback(true);
        }

        if (this.state.activeQuestion === 1 && direction === 0) {
            this.props.isSubmittedCallback(false);
        }

        if (direction === 0) {
            percentComplete = ((this.state.activeQuestion - 2) / this.state.totalQuestions) * 100;
        }

        this._sendData(percentComplete);
    }

    _sendData(percentComplete) {
        this.props.progressCallback(percentComplete);
    }

    _setInputValue(name, value) {
        this.setState({ formData: {...this.state.formData, [name]: value }});
    }

    _onKeydownPress(e) {
        if (e.keyCode === 13) {
            this._onNextClick(e);
        }
    }

    render() {
        let formClass   = 'o-contact-form';
        formClass += this.props.isActive ? ' -active' : '';

        let buttonClass = 'a-button';
        buttonClass += this.props.lightTheme ? ' -light ' : '';

        let nextButtonClass = 'a-button';

        if (this._isFormDataInvalid()) {
            nextButtonClass += ' -disabled'
        }

        nextButtonClass += this.props.lightTheme ? ' -light ' : '';

        return (
            <form className = { formClass }  name="contact-project" method="POST" data-netlify="true">
                <div className = "o-rhythm__container">
                    <div className = "o-contact-form__wrapper">
                        <header aria-label="Project form header">start a project together</header>
                        <input type = "hidden" data-netlify="true" />
                        <input type="hidden" name="form-name" value="contact-project" />
                        <Input
                            className          = { this.state.activeQuestion === 1 ? '-active': '' }
                            description        = "Enter your name for the project form submission"
                            id                 = "project-name"
                            inputValueCallback = { this._setInputValue }
                            isRequired         = { true }
                            lightTheme         = { this.props.lightTheme }
                            name               = "name"
                            onKeydownPress     = { this._onKeydownPress }
                            type               = "text"
                            value              = { this.state.formData.name }/>
                        <Input
                            className          = { this.state.activeQuestion === 2 ? '-active': '' }
                            description        = "Enter your email for the project form submission"
                            id                 = "project-email"
                            inputValueCallback = { this._setInputValue }
                            isRequired         = { true }
                            lightTheme         = { this.props.lightTheme }
                            name               = "email"
                            onKeydownPress     = { this._onKeydownPress }
                            type               = "email"
                            value              = { this.state.formData.email } />
                        <Input
                            className          = { this.state.activeQuestion === 3 ? '-active': '' }
                            description        = "Enter your phone number for the project form submission"
                            id                 = "project-phone"
                            inputValueCallback = { this._setInputValue }
                            isRequired         = { true }
                            isRequiredCallback = { this._setIsRequired }
                            lightTheme         = { this.props.lightTheme }
                            name               = "phone"
                            onKeydownPress     = { this._onKeydownPress }
                            type               = "text"
                            value              = { this.state.formData.phone } />
                        <Input
                            className          = { this.state.activeQuestion === 4 ? '-active': '' }
                            description        = "Enter your industry for the project form submission"
                            id                 = "project-industry"
                            inputValueCallback = { this._setInputValue }
                            lightTheme         = { this.props.lightTheme }
                            name               = "industry"
                            onKeydownPress     = { this._onKeydownPress }
                            type               = "text"
                            value              = { this.state.formData.industry } />
                        <Input
                            className          = { this.state.activeQuestion === 5 ? '-active': '' }
                            description        = "Enter your job title for the project form submission"
                            id                 = "project-job-title"
                            inputValueCallback = { this._setInputValue }
                            lightTheme         = { this.props.lightTheme }
                            name               = "job title"
                            onKeydownPress     = { this._onKeydownPress }
                            type               = "text"
                            value              = { this.state.formData.job_title } />
                        <Textarea
                            className          = { `-form-message ${this.state.activeQuestion === 6 ? '-active' : ''}` }
                            description        = "Enter the message that you would like sent to andculture for the project form submission"
                            id                 = "project-message"
                            inputValueCallback = { this._setInputValue }
                            lightTheme         = { this.props.lightTheme }
                            name               = "message"
                            value              = { this.state.formData.message } />
                        <div className = "o-contact-form__buttons">
                            <button
                                className = { buttonClass }
                                onClick   = { this._onBackClick }
                                type      = "button">
                                Go Back
                            </button>
                            {  // if
                                this.state.activeQuestion !== this.state.totalQuestions &&
                                <button
                                    className = { nextButtonClass }
                                    onClick   = { this._onNextClick }
                                    type      = "button">
                                    Next
                                </button>
                            }
                            { // if
                                this.state.activeQuestion === this.state.totalQuestions &&
                                <button
                                    className = { buttonClass }
                                    onClick   = { this._onSubmitClick }
                                    type      = "submit">
                                    Submit
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default ProjectForm;