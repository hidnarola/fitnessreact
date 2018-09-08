import { postFormData, fetchResource, putFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';
import { WIDGETS_TYPE_TIMELINE } from '../constants/consts';

const requestUrlTimeline = 'user/timeline';
const requestUrlWidgets = 'user/widgets';

function getWidgetsAndWidgetsData(username) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrlTimeline + '/widgets/' + username, options);
}

function saveTimelineWidgetsData(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrlWidgets + '/' + WIDGETS_TYPE_TIMELINE, requestData, headers);
}

function changeTimelineBodyFatWidget(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrlTimeline + '/body_fat', requestData, headers);
}

function changeTimelineMuscleInnerData(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrlTimeline + '/muscle', requestData, headers);
}

export default {
    getWidgetsAndWidgetsData,
    saveTimelineWidgetsData,
    changeTimelineBodyFatWidget,
    changeTimelineMuscleInnerData,
}