import React from "react";
import base from "./base";

export default base(
	"qards-countdown", "Countdown", [
		{
			name  : "title",
			label : "Title",
			widget: "string"
		}, {
			name  : "subtitle",
			label : "Subtitle",
			widget: "string"
		}, {
			name  : "event",
			label : "Event date",
			widget: "datetime"
		}
	]
);