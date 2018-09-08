exports.onInitialClientRender = () => {
	// don't remove unless this is fixed: https://github.com/gatsbyjs/gatsby/issues/7261#issuecomment-413361951

	// dirty fix for missing popstate listener
	const GATSBY_NAVIGATE = window.___navigate || {};

	window.addEventListener('popstate', () =>
		GATSBY_NAVIGATE(window.location.pathname, {replace: true})
	);
	// don't remove unless this is fixed: https://github.com/gatsbyjs/gatsby/issues/7261#issuecomment-413361951

	require("./src/styles/index.scss");
};