import * as React from "react";

import QardsDivider from "../divider";
import QardBase, { QardProps } from "../base";
import { slugify } from "../../../utils/helpers";
import { Wrapper, PrimaryTitle, SecondaryTitle, SubTitle } from "./styles";

export interface CardHeaderType extends QardProps {
	title: string;
	subtitle?: string;
	//	`primary` generates a h2 and it also creates a divider on top
	//	`secondary` generates a h3 and has no divider on top
	type?: string;
}

export default class QardHeader extends QardBase<CardHeaderType, any> {
	public render() {
		const { title, subtitle, type } = this.props;

		if (!title) return <div/>;

		let Title = PrimaryTitle;
		if (type == "secondary") {
			Title = SecondaryTitle;
		}

		return <Wrapper className="h-item" id={`h-item-${slugify(title)}`}>
			{!type || type === "primary" && <QardsDivider type={"line"}/>}
			<Title>{title}</Title>
			{subtitle && <SubTitle>{subtitle}</SubTitle>}
		</Wrapper>;
	}
}
