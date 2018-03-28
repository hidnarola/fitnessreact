import { fetchResource, postFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/equipment_category';

function getEquipmentCategories() {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

export default {
    getEquipmentCategories
}