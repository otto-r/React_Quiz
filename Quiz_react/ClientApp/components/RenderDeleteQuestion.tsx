import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { DeleteQuestion } from './DeleteQuestion';

export class RenderDeleteQuestion extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <DeleteQuestion />
        </div>;
    }
}
