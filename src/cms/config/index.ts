const config = {
	backend      : {
		name                  : 'git-gateway',
		repo                  : 'QardsJs/qards',
		branch                : 'website',
		squash_merges         : true,
		workflow_branch_prefix: 'qards',
	},
	publish_mode : 'editorial_workflow',
	media_folder : 'static/images/uploads',
	public_folder: '/images/uploads',
	slug         : {
		encoding     : 'ascii',
		clean_accents: true,
	},
};

export default config;