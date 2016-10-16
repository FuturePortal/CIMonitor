/**
 * @constructor
 * @param statusManager
 */
var GitLab = function(statusManager) {
    /** {StatusManager} */
    this.statusManager = statusManager;

    this.init();
};

/**
 * Add the status listener
 */
GitLab.prototype.init = function() {
    console.log('[GitLab] Ready to process GitLab events.');
};

GitLab.prototype.processEvent = function(event) {
    console.log('[GitLab] Translating GitLab event...');

    console.log(JSON.stringify(event));

    console.log(event.object_kind);
};

module.exports = GitLab;
