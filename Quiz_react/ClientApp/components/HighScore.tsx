import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface IScoresState {
    scores: Score[];
    hasFetchedData: boolean;
}

export class HighScore extends React.Component<RouteComponentProps<{}>, IScoresState> {
    constructor() {
        super();
        this.state = { scores: [], hasFetchedData: false };

        fetch('api/Questions/HighScore')
            .then(response => response.json() as Promise<Score[]>)
            .then(data => {
                this.setState({ scores: data, hasFetchedData: true })
            });
    }

    public render() {
        let contents = this.state.hasFetchedData
            ? HighScore.renderQuestionsTable(this.state.scores)
            : <p><em>Loading...</em></p>;

        return <div>
            <h1>High Score</h1>
            {contents}
        </div>
    }

    private static renderQuestionsTable(scores: Score[]) {
        console.log(scores[0].userName);
        console.log(scores[0].date);
        return <table className='table'>
            <thead>
                <tr>
                    <th>Points</th>
                    <th>User Name</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {scores.map(score =>
                    <tr key={score.id}>
                            <td>{score.points}</td>
                            <td>{score.userName}</td>
                            <td>{score.date}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

interface Score {
    id: string;
    points: number;
    userName: string;
    date: Date;
}