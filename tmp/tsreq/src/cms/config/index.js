"use strict";
var config = {
    backend: {
        name: 'git-gateway',
        branch: 'master',
        squash_merges: true,
        workflow_branch_prefix: 'qards',
    },
    publish_mode: 'editorial_workflow',
    media_folder: 'static/images/uploads',
    public_folder: '/images/uploads',
    slug: {
        encoding: 'ascii',
        clean_accents: true,
    },
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config;
