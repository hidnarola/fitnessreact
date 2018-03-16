var express = require('express');
var router = express.Router();

var users = require('./users');
router.use('/user', users);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/new_data', function (req, res, next) {
    res.json({
        allWidgets: {todayWorkOut: true, nextMeal: true, activity: true, goalProgress: true,
            bodyFat: true, badges: true, weeksCalories: true, activityFeed: true},
        todayWorkOut: {
            warmUp: [
                {"name": "Bench Press Up", exercise: "25kg for 6 sets of 6 reps", img: ""},
                {"name": "Bent Over Row", exercise: "10kg for 5 sets of 12 reps", img: ""},
                {"name": "Shoulder Press", exercise: "10kg for 5 sets of 12 reps", img: ""},
            ],
            workOut: [
                {"name": "Bench Press", exercise: "25kg for 6 sets of 6 reps", img: ""},
                {"name": "Bent Over Row", exercise: "10kg for 5 sets of 12 reps", img: ""},
                {"name": "Shoulder Press", exercise: "10kg for 5 sets of 12 reps", img: ""},
            ],
            coolDown: [
                {"name": "Bench Press", exercise: "25kg for 6 sets of 6 reps", img: ""},
                {"name": "Bent Over Row", exercise: "10kg for 5 sets of 12 reps", img: ""},
                {"name": "Shoulder Press", exercise: "10kg for 5 sets of 12 reps", img: ""},
            ]
        },
        nextMeal: {
            mealType: "breakfast",
            mealTitle: "Boiled eggs & avocado on rye toast",
            mealImg: "",
            cals: 400,
            protein: 26,
            fat: 20,
            carbs: 30
        },
        goalProgress: "70",
        bodyFat: {
            xAxis: "",
            yAxis: "weight",
            data: [
                {name: 'Jan', weight: 110},
                {name: 'Feb', weight: 105},
                {name: 'Mar', weight: 100},
                {name: 'Apr', weight: 90},
                {name: 'May', weight: 95},
                {name: 'Jun', weight: 89},
                {name: 'Jul', weight: 85},
                {name: 'Sep', weight: 70},
                {name: 'Oct', weight: 79},
                {name: 'Nov', weight: 75},
                {name: 'Dec', weight: 80},
            ]
        },
        badges: {
            data: [
                {"title": "getting heavy", "desc": "Lift a total of 1000Kg overall.", "extra": "500/1000Kg", "status": "Completed", "badge_date": "June 8, 2017"},
                {"title": "getting heavy 2", "desc": "Lift a total of 1000Kg overall.", "extra": "", "status": "Completed", "badge_date": "June 8, 2018"},
                {"title": "getting heavy 3", "desc": "Lift a total of 1000Kg overall.", "extra": "500/1000Kg", "status": "Completed", "badge_date": "June 8, 2019"},
            ]
        },
        weeksCalories: "60978"
    });
});

router.get('/nutrition_meal', function (req, res, next) {
    res.json({
        todaysMeal: [
            {
                id: "1",
                imageUrl: "/assets/img/nutrition/img-07.jpg",
                title: "Bulletproof butter coffee with cream",
                smallTitle: "Breakfast",
                calories: "400",
                protein: "26g",
                fat: "23g",
                carbohydrates: "6g"
            },
            {
                id: "2",
                imageUrl: "/assets/img/nutrition/img-07.jpg",
                title: "Bulletproof butter coffee with cream",
                smallTitle: "Lunch",
                calories: "400",
                protein: "26g",
                fat: "23g",
                carbohydrates: "6g"
            },
            {
                id: "3",
                imageUrl: "/assets/img/nutrition/img-07.jpg",
                title: "Bulletproof butter coffee with cream",
                smallTitle: "Dinner",
                calories: "400",
                protein: "26g",
                fat: "23g",
                carbohydrates: "6g"
            },
            {
                id: "4",
                imageUrl: "/assets/img/nutrition/img-07.jpg",
                title: "Bulletproof butter coffee with cream",
                smallTitle: "Breakfast",
                calories: "400",
                protein: "26g",
                fat: "23g",
                carbohydrates: "6g"
            },
            {
                id: "5",
                imageUrl: "/assets/img/nutrition/img-07.jpg",
                title: "Bulletproof butter coffee with cream",
                smallTitle: "Lunch",
                calories: "400",
                protein: "26g",
                fat: "23g",
                carbohydrates: "6g"
            },
            {
                id: "6",
                imageUrl: "/assets/img/nutrition/img-07.jpg",
                title: "Bulletproof butter coffee with cream",
                smallTitle: "Dinner",
                calories: "400",
                protein: "26g",
                fat: "23g",
                carbohydrates: "6g"
            },
            {
                id: "7",
                imageUrl: "/assets/img/nutrition/img-07.jpg",
                title: "Bulletproof butter coffee with cream",
                smallTitle: "Breakfast",
                calories: "400",
                protein: "26g",
                fat: "23g",
                carbohydrates: "6g"
            }
        ],
        mealPlanStatus: [
            {title: "Total Calories", value: "2510", units: ""},
            {title: "Total Protein", value: "36", units: "g"},
            {title: "Total Fat", value: "40", units: "g"},
            {title: "Total Carbs", value: "80", units: "g"},
            {title: "Total Time", value: "80 min", units: ""}
        ],
        mealPlanNutritionChart: "/assets/img/nutrition/nutrition-chart.jpg"
    });
});

router.post('/post_name', function (req, res, next) {
    console.log(req.body);

    res.json({"status": "success"});
});

module.exports = router;
