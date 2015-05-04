import React from 'react';
import {addons} from 'react/addons';

const Loading = React.createClass({
    mixins: [addons.PureRenderMixin],

    render() {
        return (
            <img width={30} src="./img/loading.gif" alt="loading..." />
        );
    }
});

export default Loading;
