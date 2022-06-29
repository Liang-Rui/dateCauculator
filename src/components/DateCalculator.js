import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import DateInputGroup from './DateInputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


export default class DateCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            startDay: '',
            startMonth: '',
            startYear: '',
            endDay: '',
            endMonth: '',
            endYear: '',
            elapse: '',
            history: [],
            invalidDateStatus: {
                startDate: {
                    'isInvalidDay': false,
                    'isInvalidMonth': false,
                    'isInvalidYear': false,
                    'alertDay': '',
                    'alertMonth': '',
                    'alertYear': '',
                },
                endDate: {
                    'isInvalidDay': false,
                    'isInvalidMonth': false,
                    'isInvalidYear': false,
                    'alertDay': '',
                    'alertMonth': '',
                    'alertYear': '',
                },
            },
            invalidDate: false,
            minDate: new Date('1901-01-01'),
            maxDate: new Date('2999-12-31'),
        };
        this.onInputDate = this.onInputDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onInputDate(event, field) {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [field]: value
        });
        this.resetAlertState();
    }

    onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        try {
            const startDate = new Date([this.state.startYear, this.state.startMonth, this.state.startDay].join('-'))
            this.validateDate('start', startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear(), startDate)

            const endDate = new Date([this.state.endYear, this.state.endMonth, this.state.endDay].join('-'))
            this.validateDate('end', endDate.getDate(), endDate.getMonth() + 1, endDate.getFullYear(), endDate)

            setTimeout(() => {
                if (!this.state.invalidDate) {

                    let elapse = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))
                    elapse = elapse === 0 ? 0 : elapse < 0 ? (elapse + 1) * -1 : elapse - 1

                    let history = [...this.state.history]
                    history.push(startDate.toLocaleDateString() + ' - ' + endDate.toLocaleDateString() + ': ' + elapse + ' days')

                    this.setState({
                        elapse: elapse,
                        history: history
                    })
                }
            }, 100);

        } catch(e) {
            console.log(e)
        }
    }

    validateDate(prefix, day, month, year, date) {
        if (Number(this.state[prefix + 'Day']) !== day) {
            this.setAlertState(prefix, 'Day', 'Please check the day filed')
        } 
        if (Number(this.state[prefix + 'Month']) !== month) {
            this.setAlertState(prefix, 'Month', 'Please check the month field')
        } 
        if (Number(this.state[prefix + 'Year']) !== year) {
            this.setAlertState(prefix, 'Year', 'Please check the year field')
        }

        if (!this.state.invalidDate && (date < this.state.minDate || date > this.state.maxDate)) {
            this.setAlertState(prefix, 'Year', 'Please make sure the date range is within 1901-01-01 to 2999-12-31')
        }
    }

    setAlertState(prefix, field, message) {
        let fieldStatus = {...this.state.invalidDateStatus};
        fieldStatus[prefix + 'Date']['isInvalid' + field] = true;
        fieldStatus[prefix + 'Date']['alert' + field] = message;
        this.setState({fieldStatus});
        this.setState({
            invalidDate: true
        })
    }

    resetAlertState() {
        this.setState({
            invalidDateStatus: {
                startDate: {
                    'isInvalidDay': false,
                    'isInvalidMonth': false,
                    'isInvalidYear': false,
                    'alertDay': '',
                    'alertMonth': '',
                    'alertYear': '',
                },
                endDate: {
                    'isInvalidDay': false,
                    'isInvalidMonth': false,
                    'isInvalidYear': false,
                    'alertDay': '',
                    'alertMonth': '',
                    'alertYear': '',
                },
            },
            invalidDate: false
        })
    }


    render() {
        return (
            <div className='row justify-content-center'>
                <div className='col-12 mb-5'>
                    <Form onSubmit={this.onSubmit}>
                        <Row className='mb-3'>
                            {
                                ['start', 'end'].map((prefix, prefixIndex) => {
                                    return (
                                        <Row className='mb-3' key={'date-input-row-' + prefixIndex}>
                                            {
                                                ['Day', 'Month', 'Year'].map((item, index) => {
                                                    return (
                                                        <DateInputGroup 
                                                            key={ 'date-input-group-' + index}
                                                            label={prefix[0].toUpperCase() + prefix.slice(1) + " " + item}
                                                            id={prefix + item}
                                                            value={this.state[prefix + item]} 
                                                            field={prefix + item}
                                                            handleOnChange={this.onInputDate}
                                                            invalidStatus={this.state.invalidDateStatus[prefix + "Date"]["isInvalid" + item]}
                                                            invalidMessage={ this.state.invalidDateStatus[prefix + "Date"]["alert" + item]} />
                                                    );
                                                })
                                            }
                                        </Row>
                                    );
                                })
                            }
                        </Row>
                        <Button type="submit">Calculate!</Button>
                    </Form>
                </div>
                <div className='col-12 mb-5'>
                    <h1>Elapse: {this.state.elapse}</h1>
                </div>
                <div className='col-12'>
                    <h3>History Records</h3>
                    <FloatingLabel controlId="floatingTextarea2">
                        <Form.Control
                        as="textarea"
                        value={this.state.history.map((x, i) => i + 1 + '. ' + x).join('\n')}
                        readOnly
                        style={{ height: '200px' }}
                        />
                    </FloatingLabel>
                </div>
            </div>
        );
    }
}