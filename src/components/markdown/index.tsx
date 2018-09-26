import React, {Component} from "react";
import remark from "remark";
import remarkReact from "remark-react";

export interface Props {
    md: string;
    component?: React.ReactType;
}

class MarkdownRender extends Component<Props, any> {
    render() {
        const {md, component, ...props} = this.props;
        const Wrapper: React.ReactType = component || "div";

        return <Wrapper {...props}>{
            remark().use(remarkReact)
                .processSync(md)
                .contents
        }</Wrapper>;
    }
}

export default MarkdownRender;