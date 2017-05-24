Vue.component('status-block', {
    template:
    '<div class="status">' +
    '   <div class="status-icon-box">' +
    '       <img src="/images/types/deploy.svg" />' +
    '   </div>' +
    '   <div class="status-title">' +
    '       <span class="title">CIMonitor</span>' +
    '       <span class="sub-title">master</span>' +
    '   </div>' +
    '   <div class="status-stages job-container">' +
    '       <div class="success"><span>test</span></div>' +
    '       <div class="success"><span>build</span></div>' +
    '       <div><span>deploy</span></div>' +
    '       <div class="todo"><span>acceptance</span></div>' +
    '   </div>' +
    '   <div class="status-jobs job-container">' +
    '       <div><span>deploying to production</span></div>' +
    '   </div>' +
    '   <div class="status-info">' +
    '       <div class="status-face" style="background-image: url(\'https://rickvanderstaaij.nl/images/rick.jpg\')">' +
    '       </div>' +
    '       <div class="status-time">' +
    '           5 minutes ago' +
    '       </div>' +
    '   </div>' +
    '</div>'
});

Vue.component('status-overview', {
    template:
    '<div>' +
        '<status-block></status-block>' +
        '<status-block></status-block>' +
    '</div>'
});

new Vue({
    el: '#app'
});
