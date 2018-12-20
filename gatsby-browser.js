const config = require('./static/config/settings');

exports.onInitialClientRender = () => {
	if (!config.performanceMode) {
		switch (config.baseFont) {
			case 'Roboto':
				require('typeface-roboto');
				break;
			case 'Lato':
				require('typeface-lato');
				break;
			case 'Biorhyme':
				require('typeface-biorhyme');
				break;
			case 'Open Sans':
				require('typeface-open-sans');
				break;
			case 'Poppins':
				require('typeface-poppins');
				break;
			case 'Work Sans':
				require('typeface-work-sans');
				break;
		}
	}

	require('./src/styles/index.scss');
};
