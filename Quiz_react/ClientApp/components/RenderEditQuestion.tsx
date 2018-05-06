import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { EditQuestion } from './EditQuestion';

export class RenderEditQuestion extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <EditQuestion />
        </div>;
    }
}
