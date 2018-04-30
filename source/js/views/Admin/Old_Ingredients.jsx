// import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom';
// import AdminHeader from 'components/Admin/Template/AdminHeader';
// import AdminNav from 'components/Admin/Template/AdminNav';
// import { adminRouteCodes } from '../../constants/adminRoutes';
// import IngredientsListing from '../../components/Admin/Ingredients/IngredientsListing';
// import IngredientsSave from '../../components/Admin/Ingredients/IngredientsSave';

// class Ingredients extends Component {
//     render() {
//         return (
//             <div className="admin-dashboard-wrapper">
//                 <AdminHeader />
//                 <AdminNav />
//                 <section className="body-wrap">
//                     <Switch>
//                         <Route exact path={adminRouteCodes.INGREDIENTS} component={IngredientsListing} />
//                         <Route path={`${adminRouteCodes.INGREDIENTS_SAVE}/:id?`} component={IngredientsSave} />
//                     </Switch>
//                 </section>
//             </div>
//         );
//     }
// }

// export default Ingredients;