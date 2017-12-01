Vue.config.devtools = true;

Vue.component('status-block', {
    template:
        '<div class="status" :class="status.status">' +
        '   <div class="status-icon-box">' +
        '       <img :src="getTypeImage" />' +
        '   </div>' +
        '   <div class="status-title">' +
        '       <span class="title">{{ status.project }}</span>' +
        '       <span class="sub-title">{{ status.branch }}</span>' +
        '   </div>' +
        '   <div class="status-stages job-container" v-if="status.stages">' +
        '       <div v-for="stage in status.stages" :key="stage.name" :class="stage.status">' +
        '           <span>{{ stage.name }}</span>' +
        '       </div>' +
        '   </div>' +
        '   <div class="status-jobs job-container" v-if="status.jobs">' +
        '       <div' +
        '           v-for="job in status.jobs"' +
        '           v-if="job.stage === status.currentStage"' +
        '           :key="job.name"' +
        '           :class="job.status"' +
        '       >' +
        '           <span>{{ job.name }}</span>' +
        '       </div>' +
        '   </div>' +
        '   <div class="status-info">' +
        '       <div' +
        '           v-if="status.photo"' +
        '           class="status-face"' +
        '           :style="getStatusPhoto"' +
        '       ></div>' +
        '       <div class="status-time">' +
        '           {{ getTimeAgo }}' +
        '       </div>' +
        '   </div>' +
        '</div>',
    props: ['status', 'now'],
    computed: {
        getTypeImage: function() {
            return '/images/types/' + this.status.type + '.svg';
        },
        getStatusPhoto: function() {
            var statusPhoto = this.status.photo;
            // Photos from Gravatar will get blurry if we do not bump up the resolution.
            if (statusPhoto.indexOf('gravatar.com') !== -1) {
                statusPhoto = statusPhoto.replace('s=80', 's=300');
            }
            return 'background-image: url(\'' + statusPhoto + '\')'
        },
        getTimeAgo: function() {
            var timeAgo = moment(this.status.updateTime).from(this.now);
            if (timeAgo === 'a few seconds ago' || timeAgo === 'in a few seconds') {
                timeAgo = 'just now';
            }
            return timeAgo;
        },
    }
});

Vue.component('status-overview', {
    template:
        '<div>' +
        '   <status-block' +
        '       v-for="status in getStatuses()"' +
        '       :key="status.key"' +
        '       :status="status"' +
        '       :now="now"' +
        '   ></status-block>' +
        '   <div v-if="disconnected" class="no-connection">' +
        '       <img src="/images/no-connection.svg" height="90" />' +
        '   </div>' +
        '</div>',
    data: function() {
        return {
            statuses: [],
            disconnected: true,
            socket: null,
            now: this.getCurrentTimestamp(),
        };
    },
    created: function() {
        this.socket = io();
        this.socket.on('statuses', this.setStatuses);
        this.socket.on('disconnect', this.socketDisconnected);
        setInterval(this.setNow, 3000);
    },
    methods: {
        getCurrentTimestamp: function() {
            return (new Date()).getTime();
        },
        setNow: function() {
            this.now = this.getCurrentTimestamp();
        },
        setStatuses: function(update) {
            this.disconnected = false;
            this.statuses = update.statuses;
        },
        socketDisconnected: function() {
            this.disconnected = true;
        },
        getStatuses: function() {
            if (this.statuses.length === 0) {
                return [{
                    project: 'No statuses yet',
                    type: 'wait',
                    branch: '',
                    status: 'success',
                    updateTime: this.getCurrentTimestamp(),
                    stages: [{
                        name: 'CIMonitor',
                        status: 'success',
                    }],
                    jobs: [{
                        name: 'Waiting for new statuses',
                        status: 'success',
                    }],
                }];
            }
            return this.statuses;
        },
    }
});

new Vue({
    el: '#app'
});