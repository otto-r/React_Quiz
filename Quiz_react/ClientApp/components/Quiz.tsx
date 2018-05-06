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
        this.nextQuestion = this.nextQuestion.bind(this);

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
                                <td><label><input onChange={this.handleAnswer}
                                    type="radio"
                                    name="answer"
                                    checked={this.state.selectedOption === 'A'}
                                    value="A" />{questions[counter1].answerA}</label></td>
                                <td><label><input onChange={this.handleAnswer}
                                    type="radio"
                                    name="answer"
                                    checked={this.state.selectedOption === 'B'}
                                    value="B" />{questions[counter1].answerB}</label></td>
                                <td><label><input onChange={this.handleAnswer}
                                    type="radio"
                                    name="answer"
                                    checked={this.state.selectedOption === 'C'}
                                    value="C" />{questions[counter1].answerC}</label></td>
                                <td><label><input onChange={this.handleAnswer}
                                    type="radio"
                                    name="answer"
                                    checked={this.state.selectedOption === 'D'}
                                    value="D" />{questions[counter1].answerD}</label></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <button id='submitButton' onClick={this.submitAnswer}>Submit</button>
                <button id='nextButton' hidden onClick={this.nextQuestion}>Next Question</button>
                <p id="result"></p>
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
        this.setState({ counterState: counter, pointsState: points });
    }

    nextQuestion() {
        counter++;
        document.getElementById('result')!.innerHTML = '';
        this.setState({ counterState: counter });
        document.getElementById('submitButton')!.hidden = false;
        document.getElementById('nextButton')!.hidden = true;
    }

    public submitAnswer(event: any) {
        console.log(counter);
        console.log(this.state.selectedOption);
        if (this.state.questions[counter].correctAnswer === this.state.selectedOption) {
            points++;
            this.setState({ pointsState: points })
            console.log('correct');
            document.getElementById('result')!.innerHTML = 'Correct!';
        }
        else {
            document.getElementById('result')!.innerHTML = 'Wrong!';
            console.log('wrong');
        }
        document.getElementById('submitButton')!.hidden = true;
        document.getElementById('nextButton')!.hidden = false;
    }

    submitScore() {
        fetch('api/Questions/SubmitScore?points=' + this.state.pointsState + '&id=' + id)
            .then(Response =>
                console.log('fetch status: ', Response.status));
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