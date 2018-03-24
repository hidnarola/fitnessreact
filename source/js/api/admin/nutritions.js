import { fetchResource } from '..';

function addNutrition(nutritionData) {
    var options = {
        method: 'POST',
        body: nutritionData,
    }

    return fetchResource('admin/nutrition', options);
}

export default [
    addNutrition
]