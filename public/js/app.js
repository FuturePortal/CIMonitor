Vue.component('status-block', {
    template:
    '<div class="status" :class="status.status">' +
    '   <div class="status-icon-box">' +
    '       <img :src="getTypeImage" />' +
    '   </div>' +
    '   <div class="status-title">' +
    '       <span class="title">{{ status.name }}</span>' +
    '       <span class="sub-title">{{ status.branch }}</span>' +
    '   </div>' +
    '   <div class="status-stages job-container" v-if="status.stages">' +
    '       <div v-for="stage in status.stages" :class="stage.status">' +
    '           <span>{{ stage.name }}</span>' +
    '       </div>' +
    '   </div>' +
    '   <div class="status-jobs job-container" v-if="status.jobs">' +
    '       <div v-for="job in status.jobs" :class="job.status">' +
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
    '           {{ time }}' +
    '       </div>' +
    '   </div>' +
    '</div>',
    props: ['status'],
    data: function() {
        return {
            'time': 'now',
        };
    },
    methods: {

    },
    computed: {
        getTypeImage: function() {
            return '/images/types/' + this.status.type + '.svg';
        },
        getStatusPhoto: function() {
            return 'background-image: url(\'' + this.status.photo + '\')'
        }
    }
});

Vue.component('status-overview', {
    template:
    '<div>' +
    '   <status-block' +
    '       v-for="status in getStatuses()"' +
    '       :key="status.time"' +
    '       :status="status"' +
    '   ></status-block>' +
    '</div>',
    data: function() {
        return {
            statuses: [],
        };
    },
    methods: {
        getStatuses: function() {
            if (this.statuses.length === 0) {
                return [{
                    name: 'No statuses yet',
                    type: 'wait',
                    branch: '',
                    status: 'success',
                    time: (new Date()).getMilliseconds(),
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
