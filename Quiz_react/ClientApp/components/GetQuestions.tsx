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
                    <th>Correct</th>
                </tr>
            </thead>
            <tbody>
                {
                    questions.map(question =>
                        <tr key={question.text}>
                            <td>{question.text}</td>
                            <td>{question.answerA}</td>
                            <td>{question.answerB}</td>
                            <td>{question.answerC}</td>
                            <td>{question.answerD}</td>
                            <td>{question.correctAnswer}</td>
                        </tr>)}
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