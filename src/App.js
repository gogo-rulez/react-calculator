import { Component } from 'react';
import './App.scss';

class App extends Component {

    state = {
        expression: [],
        cursorPosition: 0
    }

    updateExpression = (value) => {
        console.log('click', value);
        this.setState((state) => {

            const newExpression = [...this.state.expression];
            const cursorIndex = newExpression.findIndex(x => x === '|');

            console.log('cursorIndex', cursorIndex);

            if (cursorIndex >= 0) {
                newExpression.splice(cursorIndex, 1);
            }

            const calcPosition = newExpression.length + state.cursorPosition;

            console.log('calcPosition', calcPosition);

            if (calcPosition === 0) {
                newExpression.splice(calcPosition, 0, ...['|', value]);
            } else {
                newExpression.splice(calcPosition, 0, ...[value, '|']);
            }


            return {
                expression: newExpression
            }

        });
    }

    moveCursor = (direction) => {

        const {expression, cursorPosition} = this.state;

        // if the expression is empty, or the cursor is at position 0 when we click 'right', stop here
        if (!expression.length || direction === 'right' && cursorPosition === 0 || (expression.length - 1) + cursorPosition === 0) return;

        console.log('tu sam');

        this.setState((state) => {
            const newCursorPosition = direction === 'left' ? state.cursorPosition - 1 : state.cursorPosition + 1
            const oldCursorIndex = state.expression.findIndex(x => x === '|');
            const newExpression = [...state.expression];
            newExpression.splice(oldCursorIndex, 1);
            const newCursorIndex = newExpression.length + newCursorPosition;
            newExpression.splice(newCursorIndex, 0, '|');


            console.log('oldCursorIndex', oldCursorIndex);
            console.log('newCursorIndex', newCursorIndex);
            console.log('newExpression.length', newExpression.length);

            return {
                expression: newExpression,
                cursorPosition: newCursorPosition,
            }

        });

    }

    render () {
        return (
            <div className="App">

                <div className="calculator">

                    <div className="calculator__screen">
                        { this.state.expression.map((char, index) => {
                            return  <span key={index}>{ char }</span>
                        }) }
                    </div>

                    <div className="calculator__field calculator__field--add">+</div>
                    <div className="calculator__field calculator__field--subtract">-</div>
                    <div className="calculator__field calculator__field--multiply">*</div>
                    <div className="calculator__field calculator__field--divide">/</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(1)}>1</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(2)}>2</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(3)}>3</div>
                    <div className="calculator__field calculator__field--open_bracket">(</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(4)}>4</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(5)}>5</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(6)}>6</div>
                    <div className="calculator__field calculator__field--close_bracket">)</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(7)}>7</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(8)}>8</div>
                    <div className="calculator__field" onClick={() => this.updateExpression(9)}>9</div>
                    <div className="calculator__field calculator__field--equals"> = </div>
                    <div className="calculator__field calculator__field--move_left" onClick={() => this.moveCursor('left')}> &lt; </div>
                    <div className="calculator__field" onClick={() => this.updateExpression(0)}>0</div>
                    <div className="calculator__field calculator__field--move_right" onClick={() => this.moveCursor('right')}> &gt; </div>
                    <div className="calculator__field calculator__field--clear"> C </div>

                </div>

            </div>
        );

    }
}

export default App;