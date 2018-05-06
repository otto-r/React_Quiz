import * as React from 'react';
import { render } from 'react-dom';
import { ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router';


interface IQuestionProps { }
interface IQuestionState {
    id: number;
    hasFetchedData: boolean;
}

export class DeleteQuestion extends React.Component<IQuestionProps, IQuestionState> {
    public constructor(props: IQuestionProps) {
        super(props);
        this.state = {
            id: 1,
            hasFetchedData: false
        };
        this.handleChangeId = this.handleChangeId.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }

    public render() {
        return (
            <div>
                <h1>Delete Question</h1>
                <div >
                    <div className="form-group">
                        <label htmlFor="text">Id: </label>
                        <input type="id" className="form-control" id="id"
                            value={this.state.id}
                            onChange={this.handleChangeId}
                            placeholder="Id" />
                    </div>
                    <button className="btn btn-default" onClick={this.deleteQuestion}>Delete Question</button>
                </div>
            </div>);
    }
    handleChangeId(event: any) {
        this.setState({ id: event.target.value });
    }
    deleteQuestion(event: any) {
        fetch('/api/Questions/DeleteQuestion?id=' + this.state.id)
            .then(Response => {
                console.log(Response);  
                console.log("******console after response*****");
            })
        this.setState({ hasFetchedData: false });
    }
}
