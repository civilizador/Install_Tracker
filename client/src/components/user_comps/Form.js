import React ,{ Component } from "react";
import { Field, reduxForm } from 'redux-form'


class FormEditUser extends Component {
state={submitted:false}


  renderInput(formProps){
     return(
        <div className="form-group">
          <label>{formProps.label}</label>
          <input
            type      = {formProps.input.type}
            onChange  = {formProps.input.onChange}
            value     = {formProps.input.value}
            className = "form-control"
          />
          <div>{formProps.meta.error}</div>
        </div>
      )
  }


  render() {
    return (
        <form key={Math.random()*64+Math.random()}  onSubmit={this.props.handleSubmit(this.props.onSubmit)}>

                  <Field name='name' component={this.renderInput} label="Enter Name"  />
                  <Field name='price' component={this.renderInput} label="Enter price" />
                  <Field name='description' component={this.renderInput} label="Enter description" />
                  <Field name='timeToCook' component={this.renderInput} label="Enter timeToCook" />
                  <Field name='featured' component={this.renderInput} label="Is it featured?" />
                  <Field name='category' component={this.renderCategoryField} label="Enter category" />
                  <Field name='image' component={this.renderInput} label="Image URL" />

                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{ width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem" }}
                      type="submit"
                      className="btn btn-lg btn-outline-info float-right">
                       ADD
                    </button>
                </div>

              </form>

    );
  }
}


 const validate = (values)=>{
   const errors = {};

   if(!values.name ){errors.name = 'Please Enter Name for the Item'}

   if(!values.timeToCook || isNaN(values.timeToCook) ){errors.timeToCook = 'Please Enter a Valid Time To Cook in minutes'}

   if(!values.category ){errors.category = 'Please Enter a Category for the Item'}

   if(!values.image  ){errors.image = 'Please Enter Image URL'}

   if(!values.price || isNaN(values.price)  ){errors.price = 'Please Enter a Valid Price'}

        return errors
 }


  export default reduxForm({
    form: "create_edit_form",
     enableReinitialize : true,
    validate
  })(FormEditCreate);
