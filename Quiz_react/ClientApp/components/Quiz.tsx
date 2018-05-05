import * as React from 'react';
import { FetchData } from 'ClientApp/components/FetchData';
import { render } from 'react-dom';
import { ChangeEvent } from 'react';

let counter: number;
counter = 0;
let points: number;
points = 0;
interface IQuestionsProps { }
interface IQuestionsState {
    questions: Question[];
    hasFetchedData: boolean;
    counterstate: number;
    selectedOption: string;
}

export class Quiz extends React.Component<IQuestionsProps, IQuestionsState> {
    public constructor(props: IQuestionsProps) {
        super(props);
        this.state = {
            questions: [],
            hasFetchedData: false,
            counterstate: 0,
            selectedOption: ''
        };
        this.submitAnswer = this.submitAnswer.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);

        fetch('api/Questions')
            .then(response => response.json() as Promise<Question[]>)
            .then(data => {
                this.setState({ questions: data, hasFetchedData: true })
            });
    }

    public render() {
        let contents = this.state.hasFetchedData
            ? this.renderQuestionTable(this.state.questions, this.state.counterstate)
            : <p><em>Loading...</em></p>;

        return <div>
            <h1>Questions</h1>
            {contents}
        </div>
    }

    public renderQuestionTable(questions: Question[], counter1: number) {
        console.log('counter1: ' + counter1);

        return <div>
            <h1>{counter}</h1>
            <form>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Text</th>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                            <th>D</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{questions[counter].text}</td>
                            <td><input onChange={this.handleAnswer}
                                type="radio"
                                name="answer"
                                checked={this.state.selectedOption === 'A'}
                                value="A" />{questions[counter].answerA}</td>
                            <td><input onChange={this.handleAnswer}
                                type="radio"
                                name="answer"
                                checked={this.state.selectedOption === 'B'}
                                value="B" />{questions[counter].answerB}</td>
                            <td><input onChange={this.handleAnswer}
                                type="radio"
                                name="answer"
                                checked={this.state.selectedOption === 'C'}
                                value="C" />{questions[counter].answerC}</td>
                            <td><input onChange={this.handleAnswer}
                                type="radio"
                                name="answer"
                                checked={this.state.selectedOption === 'D'}
                                value="D" />{questions[counter].answerD}</td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <button className="btn btn-default" onClick={this.submitAnswer}>Submit</button>
        </div>;
    }

    handleAnswer(e: any) {
        this.setState({ selectedOption: e.target.value })
        //console.log(this.state.selectedOption)
    }

    public submitAnswer(event: any) {
        fetch('/api/Submit/' + this.state.selectedOption)
            .then(Response => {
                counter++;
                console.log(counter);
                console.log(this.state.selectedOption);
                console.log(Response);
                this.setState({counterstate : counter});
            })
        //this.setState({ hasFetchedData: false });
    }
}

interface Question {
    text: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    correctAnswer: string;
}