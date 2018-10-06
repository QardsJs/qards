// @ts-ignore
import CMS, { init } from "netlify-cms";
import appStyles from "./cms.scss";

//	cms config
import config from "./config";
import { settingsCollection, categoriesCollection, postsCollection, authorsCollection } from "./config/collections";

//	typography styles
import typography from "../utils/typography";

//	widgets
import * as ColorWidget from "netlify-cms-widget-color";

//  editor components
import Code from "./editor-components/code";
import Audio from "./editor-components/audio";
import Video from "./editor-components/video";
import Image from "./editor-components/image";
import Calout from "./editor-components/callout";
import Reveal from "./editor-components/reveal";
import Divider from "./editor-components/divider";
import Gallery from "./editor-components/gallery";
import Reference from "./editor-components/reference";
import Countdown from "./editor-components/countdown";
import SectionHeading from "./editor-components/section-heading";

//	previews
import PostsPreview from "./previews/posts";

init({
	config: {
		...config,
		collections: [
			settingsCollection,
			authorsCollection,
			categoriesCollection,
			postsCollection
		]
	}
});

//	load stylesheets
CMS.registerPreviewStyle(typography.toString(), { raw: true });
CMS.registerPreviewStyle(appStyles.toString(), { raw: true });

//	register widgets
CMS.registerWidget("color", ColorWidget.Control);

//	register editor components
CMS.registerEditorComponent(Code);
CMS.registerEditorComponent(Audio);
CMS.registerEditorComponent(Video);
CMS.registerEditorComponent(Image);
CMS.registerEditorComponent(Reveal);
CMS.registerEditorComponent(Calout);
CMS.registerEditorComponent(Divider);
CMS.registerEditorComponent(Gallery);
CMS.registerEditorComponent(Reference);
CMS.registerEditorComponent(Countdown);
CMS.registerEditorComponent(SectionHeading);

//	register previews
CMS.registerPreviewTemplate("posts", PostsPreview);