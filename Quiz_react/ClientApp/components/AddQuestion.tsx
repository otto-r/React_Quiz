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
        //this.handleChangeBelopp = this.handleChangeBelopp.bind(this);
        //this.handlePayment = this.handlePayment.bind(this);
    }

    public render() {
        //let remaining = this.state.actualTax - this.state.totalPayed;

        return (
            <div>
                <h1>Add New Question</h1>
                <form >
                    <div className="form-group">
                        <label htmlFor="text">Question: </label>
                        <input type="text" className="form-control" id="text" placeholder="Question" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="AnswerA">Answer A: </label>
                        <input type="text" className="form-control" id="AnswerA" placeholder="Question" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="AnswerB">Answer B: </label>
                        <input type="text" className="form-control" id="AnswerB" placeholder="Question" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="AnswerC">Answer C: </label>
                        <input type="text" className="form-control" id="AnswerC" placeholder="Question" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="AnswerD">Answer D: </label>
                        <input type="text" className="form-control" id="AnswerD" placeholder="Question" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="CorrectAnswer">Correct Answer: </label>
                        <input type="text" className="form-control" id="CorrectAnswer" placeholder="Question" />
                    </div>
                </form>
            </div>);
    }
    addQuestion(event: any) {
        fetch('/api/Questions/NewQuestion?text=' + this.state.text + '&answerA=' + this.state.AnswerA +
            '&answerB=' + this.state.AnswerB + '&answerC=' + this.state.AnswerC + '&answerD=' + this.state.AnswerD +
            '&correctAnswer=' + this.state.CorrectAnswer)
            .then(data => {
                this.fetchNewTaxInfo();
            })
        this.setState({ hasFetchedData: false });
    }
}
