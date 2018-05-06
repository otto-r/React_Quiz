import * as React from 'react';
import { render } from 'react-dom';
import { ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router';


interface IQuestionProps { }
interface IQuestionState {
    text: string;
    AnswerA: string;
    AnswerB: string;
    AnswerC: string;
    AnswerD: string;
    CorrectAnswer: string;
    hasFetchedData: boolean;
}

export class AddQuestion extends React.Component<IQuestionProps, IQuestionState> {
    public constructor(props: IQuestionProps) {
        super(props);
        this.state = {
            text: "",
            AnswerA: "",
            AnswerB: "",
            AnswerC: "",
            AnswerD: "",
            CorrectAnswer: "",
            hasFetchedData: false
        };
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeAnswerA = this.handleChangeAnswerA.bind(this);
        this.handleChangeAnswerB = this.handleChangeAnswerB.bind(this);
        this.handleChangeAnswerC = this.handleChangeAnswerC.bind(this);
        this.handleChangeAnswerD = this.handleChangeAnswerD.bind(this);
        this.handleChangeCorrectAnswer = this.handleChangeCorrectAnswer.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
    }

    public render() {
        return (
            <div>
                <h1>Add New Question</h1>
                <form >
                    <div className="form-group">
                        <label htmlFor="text">Question: </label>
                        <input type="text" className="form-control" id="text"
                            value={this.state.text}
                            onChange={this.handleChangeText}
                            placeholder="Question" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="AnswerA">Answer A: </label>
                        <input type="text" className="form-control" id="AnswerA"
                            value={this.state.AnswerA}
                            onChange={this.handleChangeAnswerA}
                            placeholder="Answer A" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="AnswerB">Answer B: </label>
                        <input type="text" className="form-control" id="AnswerB"
                            value={this.state.AnswerB}
                            onChange={this.handleChangeAnswerB}
                            placeholder="Answer B" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="AnswerC">Answer C: </label>
                        <input type="text" className="form-control" id="AnswerC"
                            value={this.state.AnswerC}
                            onChange={this.handleChangeAnswerC}
                            placeholder="Answer C" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="AnswerD">Answer D: </label>
                        <input type="text" className="form-control" id="AnswerD"
                            value={this.state.AnswerD}
                            onChange={this.handleChangeAnswerD}
                            placeholder="Answer D" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="CorrectAnswer">Correct Answer: </label>
                        <input type="text" className="form-control" id="CorrectAnswer"
                            value={this.state.CorrectAnswer}
                            onChange={this.handleChangeCorrectAnswer}
                            placeholder="Correct Answer" />
                    </div>
                    <button className="btn btn-default" onClick={this.addQuestion}>Add Question</button>
                </form>
            </div>);
    }
    handleChangeText(event: any) {
        this.setState({ text: event.target.value });
    }
    handleChangeAnswerA(event: any) {
        this.setState({ AnswerA: event.target.value });
    }
    handleChangeAnswerB(event: any) {
        this.setState({ AnswerB: event.target.value });
    }
    handleChangeAnswerC(event: any) {
        this.setState({ AnswerC: event.target.value });
    }
    handleChangeAnswerD(event: any) {
        this.setState({ AnswerD: event.target.value });
    }
    handleChangeCorrectAnswer(event: any) {
        this.setState({ CorrectAnswer: event.target.value });
    }
    addQuestion(event: any) {
        fetch('/api/Questions/NewQuestion?text=' + this.state.text + '&answerA=' + this.state.AnswerA +
            '&answerB=' + this.state.AnswerB + '&answerC=' + this.state.AnswerC + '&answerD=' + this.state.AnswerD +
            '&correctAnswer=' + this.state.CorrectAnswer)
            .then(Response => {
                console.log(Response);
            })
        this.setState({ hasFetchedData: false });
    }
}
