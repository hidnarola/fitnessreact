import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class RecipesSaveForm extends Component {
    render() {
        return (
            <form>
                <div className="row">
                    <div className="col-md-12 mb-20">
                        <label htmlFor="">Name</label>
                        <input type="" name="" id="" className="form-control" value="" placeholder="" required="required" />
                    </div>
                    <div className="col-md-12 mb-20">
                        <label htmlFor="">Description</label>
                        <textarea name="" id="" className="form-control" placeholder=""></textarea>
                    </div>
                    <div className="col-md-12 mb-20">
                        <label htmlFor="">Image</label>
                        <input type="file" name="" id="" className="form-control" value="" placeholder="" required="required" />
                    </div>
                    <div className="col-md-12 mb-20">
                        <label htmlFor="">Method</label>
                        <input type="" name="" id="" className="form-control" value="" placeholder="" required="required" />
                    </div>
                    <div className="col-md-12 mb-20">
                        <label htmlFor="">Ingredients</label>
                        <input type="" name="" id="" className="form-control" value="" placeholder="" required="required" />
                    </div>
                    <div className="col-md-12 mb-20">
                        <label htmlFor="">Preparation Time</label>
                        <input type="" name="" id="" className="form-control" value="" placeholder="" required="required" />
                    </div>
                    <div className="col-md-12 mb-20">
                        <label htmlFor="">Cooking Time</label>
                        <input type="" name="" id="" className="form-control" value="" placeholder="" required="required" />
                    </div>
                    <div className="col-md-12 mb-20">
                        <label htmlFor="">Difficulty Level</label>
                        <input type="" name="" id="" className="form-control" value="" placeholder="" required="required" />
                    </div>
                    <div className="col-md-12 mb-20">
                        <label htmlFor="">Rating</label>
                        <input type="" name="" id="" className="form-control" value="" placeholder="" required="required" />
                    </div>
                    <div className="col-md-12 mb-20">
                        <label htmlFor="">Recipe Type</label>
                        <input type="" name="" id="" className="form-control" value="" placeholder="" required="required" />
                    </div>
                    <div className="col-md-12 mb-20">
                        <label htmlFor="">Nutritions</label>
                        <input type="" name="" id="" className="form-control" value="" placeholder="" required="required" />
                    </div>
                    <div className="col-md-12 mb-20">
                        <div className="stepbox-b">
                            <button type="submit" className="continues-btn"><span>Continues</span> <i className="icon-skip_next"></i></button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'recipesSave',
})(RecipesSaveForm);