// import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom';
// import AdminHeader from 'components/Admin/Template/AdminHeader';
// import AdminNav from 'components/Admin/Template/AdminNav';
// import { adminRouteCodes } from 'constants/adminRoutes';
// import RecipesListing from 'components/Admin/Recipes/RecipesListing';
// import RecipesSave from 'components/Admin/Recipes/RecipesSave';

// class Recipes extends Component {
//     render() {
//         return (
//             <div className="admin-dashboard-wrapper">
//                 <AdminHeader />
//                 <AdminNav />
//                 <section className="body-wrap">
//                     <Switch>
//                         <Route exact path={adminRouteCodes.RECIPES} component={RecipesListing} />
//                         <Route path={`${adminRouteCodes.RECIPES_SAVE}/:id?`} component={RecipesSave} />
//                     </Switch>
//                 </section>
//             </div>
//         );
//     }
// }

// export default Recipes;