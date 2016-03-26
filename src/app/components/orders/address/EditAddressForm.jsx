import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

const EditAddressForm = ({ fields, handleSubmit, cancelHandler, submitting }) => (
  <form onSubmit={ handleSubmit }>
    <div className="ui two column grid">
      <div className="row">
        <div className="sixteen wide column">
          <div className="ui fluid input">
            <label htmlFor="address"></label>
            <input type="text" placeholder="Address" { ...fields.address } />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="sixteen wide column">
          <div className="ui fluid input">
            <label htmlFor="address2"></label>
            <input type="text" placeholder="Apt #" { ...fields.address2 } />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <div className="ui fluid input">
            <label htmlFor="city"></label>
            <input type="text" placeholder="City" { ...fields.city } />
          </div>
        </div>
        <div className="column">
          <div className="ui fluid input">
            <label htmlFor="state"></label>
            <input type="text" placeholder="State" { ...fields.state } />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="sixteen wide column Ta(e)">
          <button className="ui icon button" type="button"
            onClick={ cancelHandler } disabled={ submitting }
          >
            <i className="fa fa-times"></i>
            <span className="Mstart(10px)">Cancel</span>
          </button>
          <button className="ui icon button" type="submit"
            onClick={ handleSubmit } disabled={ submitting }
          >
            <i className="fa fa-floppy-o"></i>
            <span className="Mstart(10px)">Save</span>
          </button>
        </div>
      </div>
    </div>
  </form>
);

EditAddressForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  cancelHandler: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'editAddressForm',
  fields: ['address', 'address2', 'city', 'state'],
})(EditAddressForm);

 // ,
 // state => ({ // mapStateToProps
 //   initialValues: state.account.data // will pull state into form's initialValues
 // }),
 // {load: loadAccount}      // mapDispatchToProps (will bind action creator to dispatch)
