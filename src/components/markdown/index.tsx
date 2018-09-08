import React, {Component} from "react";
import remark from "remark";
import remarkReact from "remark-react";

export interface Props {
    md: string;
}

class MarkdownRender extends Component<Props, any> {
    render() {
        const {md, ...props} = this.props;

        return <div {...props}>{
            remark().use(remarkReact)
                .processSync(md)
                .contents
        }</div>;
    }
}

export default MarkdownRender;