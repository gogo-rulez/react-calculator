import { Component } from 'react';
import axios from 'axios';
import './Calculator.scss';

class Calculator extends Component {

    state = {
        expression: ['|'],
        result: undefined
    }

    updateExpression = (value) => {

        const { expression } = this.state;
        const cursorIndexInArray = expression.findIndex(x => x === '|');
        const newExpression = [...expression];

        newExpression.splice(cursorIndexInArray, 1);
        newExpression.splice(cursorIndexInArray, 0, ...[value, '|']);

        this.setState(state => {
            return {
                ...state,
                expression: newExpression
            }
        });
    }

    moveCursor = (direction) => {

        const { expression } = this.state;
        const cursorIndexInArray = expression.findIndex(x => x === '|');

        this.setState(state => {
            const newCursorIndexInArray = direction === 'left' ? cursorIndexInArray - 1 : cursorIndexInArray + 1;
            const newExpression = [...expression];

            newExpression.splice(cursorIndexInArray, 1);
            newExpression.splice(newCursorIndexInArray, 0, '|');

            return {
                ...state,
                expression: newExpression
            }

        });

    }

    calculateResult = () => {

        let cleanExpression = [...this.state.expression];
        const cursorIndex = cleanExpression.findIndex(x => x === '|');
        const _this = this;

        cleanExpression.splice(cursorIndex, 1);
        cleanExpression = cleanExpression.join('');

        axios.post('http://api.mathjs.org/v4/', {
            expr: cleanExpression,
            precision: 2
        })
        .then(function (response) {
            _this.setState((state) => {
                return {
                    ...state,
                    result: response.data.result
                }
            })
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    resetExpression = () => {

        this.setState({
            expression: ['|'],
            result: undefined
        });

    }

    render () {

        const resultMarkup = () => {
            let result = this.state.result;

            if (result) {
                return (
                    <span> ={ result } </span>
                );
            }
        };


        return (
            <div className="App">

                <div className="calculator">

                    <div className="calculator__screen">
                        <span className="calculator__expression">
                            { this.state.expression.map((char, index) => {
                                return  <span key={index}>{ char }</span>
                            }) }
                        </span>
                        <span className="calculator__result">
                            { resultMarkup() }
                        </span>
                    </div>

                    <div className="calculator__field calculator__field--add" onClick={() => this.updateExpression('+')}>+</div>
                    <div className="calculator__field calculator__field--subtract" onClick={() => this.updateExpression('-')}>-</div>
                    <div className="calculator__field calculator__field--multiply" onClick={() => this.updateExpression('*')}>*</div>
                    <div className="calculator__field calculator__field--divide" onClick={() => this.updateExpression('/')}>/</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(1)}>1</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(2)}>2</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(3)}>3</div>
                    <div className="calculator__field calculator__field--open_bracket" onClick={() => this.updateExpression('(')}>(</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(4)}>4</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(5)}>5</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(6)}>6</div>
                    <div className="calculator__field calculator__field--close_bracket" onClick={() => this.updateExpression(')')}>)</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(7)}>7</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(8)}>8</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(9)}>9</div>
                    <div className="calculator__field calculator__field--equals" onClick={this.calculateResult}> = </div>
                    <div className="calculator__field calculator__field--move_left" onClick={() => this.moveCursor('left')}> &lt; </div>
                    <div className="calculator__field" onClick={() => this.updateExpression(0)}>0</div>
                    <div className="calculator__field calculator__field--move_right" onClick={() => this.moveCursor('right')}> &gt; </div>
                    <div className="calculator__field calculator__field--clear" onClick={() => this.resetExpression()}> C </div>

                </div>

            </div>
        );

    }
}

export default Calculator;