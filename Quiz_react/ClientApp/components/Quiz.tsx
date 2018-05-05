import * as React from 'react';
import { FetchData } from 'ClientApp/components/FetchData';
import { render } from 'react-dom';
import { ChangeEvent } from 'react';

let counter: number;
counter = 0;
let points: number;
points = 0;
let id = document.getElementById('react-app')!.textContent;
interface IQuestionsProps { }
interface IQuestionsState {
    questions: Question[];
    hasFetchedData: boolean;
    counterState: number;
    selectedOption: string;
    correctAnswer: string;
    pointsState: number;
}

export class Quiz extends React.Component<IQuestionsProps, IQuestionsState> {
    public constructor(props: IQuestionsProps) {
        super(props);
        this.state = {
            questions: [],
            hasFetchedData: false,
            counterState: 0,
            selectedOption: '',
            correctAnswer: 'temp',
            pointsState: 0,
        };
        this.submitAnswer = this.submitAnswer.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.restart = this.restart.bind(this);

        console.log(id);

        fetch('api/Questions')
            .then(response => response.json() as Promise<Question[]>)
            .then(data => {
                this.setState({ questions: data, hasFetchedData: true })
            });
    }

    public render() {
        let contents = this.state.hasFetchedData
            ? this.renderQuestionTable(this.state.questions, this.state.counterState)
            : <p><em>Loading...</em></p>;

        return <div>
            <h1>Questions</h1>
            {contents}
        </div>
    }

    public renderQuestionTable(questions: Question[], counter1: number) {
        if (counter < questions.length) {
            return <div>
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
                                <td>{questions[counter1].text}</td>
                                <td><input onChange={this.handleAnswer}
                                    type="radio"
                                    name="answer"
                                    checked={this.state.selectedOption === 'A'}
                                    value="A" />{questions[counter1].answerA}</td>
                                <td><input onChange={this.handleAnswer}
                                    type="radio"
                                    name="answer"
                                    checked={this.state.selectedOption === 'B'}
                                    value="B" />{questions[counter1].answerB}</td>
                                <td><input onChange={this.handleAnswer}
                                    type="radio"
                                    name="answer"
                                    checked={this.state.selectedOption === 'C'}
                                    value="C" />{questions[counter1].answerC}</td>
                                <td><input onChange={this.handleAnswer}
                                    type="radio"
                                    name="answer"
                                    checked={this.state.selectedOption === 'D'}
                                    value="D" />{questions[counter1].answerD}</td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <button onClick={this.submitAnswer}>Submit</button>
            </div>;
        }
        else {
            console.log('no more questions');
            this.submitScore();
            return <div>
                <p>You finished with {this.state.pointsState} points!</p>
                <p>Press this button to start again: 
                <button onClick={this.restart}>Restart</button></p>
            </div>;
        }
    }

    handleAnswer(e: any) {
        this.setState({ selectedOption: e.target.value })
    }

    restart() {
        points = 0;
        counter = 0;
        this.setState({ counterState: counter, pointsState: points});
    }

    public submitAnswer(event: any) {
        console.log(counter);
        console.log(this.state.selectedOption);
        if (this.state.questions[counter].correctAnswer === this.state.selectedOption) {
            points++;
            this.setState({ pointsState: points })
            console.log('correct');
        }
        else {
            console.log('wrong');
        }
        counter++;
        this.setState({ counterState: counter });
    }

    submitScore() {
        fetch('api/Questions/SubmitScore?points=' + this.state.pointsState + '&id=' + id)
            .then(Response =>
                console.log(Response))
            .then(d =>
                console.log('fetch successful', d)
            );
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