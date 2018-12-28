export default {
	backend      : {
		name                  : 'git-gateway',
		branch                : 'master',
		squash_merges         : true,
		workflow_branch_prefix: 'qards',
	},
	media_folder : 'static/images/uploads',
	public_folder: '/images/uploads',
	slug         : {
		encoding     : 'unicode',
		clean_accents: false,
	},
};
