import * as React from 'react';
import { FetchData } from 'ClientApp/components/FetchData';

let counter: number;
interface IQuestionsProps { }
interface IQuestionsState {
    questions: Question[];
    hasFetchedData: boolean;
}

export class Quiz extends React.Component<IQuestionsProps, IQuestionsState> {
    public constructor(props: IQuestionsProps) {
        super(props);
        this.state = {
            questions: [],
            hasFetchedData: false,
        };

        fetch('api/Questions')
            .then(response => response.json() as Promise<Question[]>)
            .then(data => {
                this.setState({ questions: data, hasFetchedData: true })
            });
    }

    public render() {
        let contents = this.state.hasFetchedData
            ? Quiz.renderQuestionsTable(this.state.questions)
            : <p><em>Loading...</em></p>;

        return <div>
            <h1>Questions</h1>
            <p>{contents}</p>
        </div>
    }

    private static renderQuestionsTable(questions: Question[]) {
        return <table className='table'>
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
                <form>
                {
                    questions.map(question =>
                        <tr key={question.text}>
                            <td>{question.text}</td>
                            <td><input type="radio" name={question.text} value="A"/>{question.answerA}</td>
                            <td><input type="radio" name={question.text} value="B"/>{question.answerB}</td>
                            <td><input type="radio" name={question.text} value="C"/>{question.answerC}</td>
                            <td><input type="radio" name={question.text} value="D"/>{question.answerD}</td>
                            </tr>)}
                </form>
            </tbody>
        </table>;
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