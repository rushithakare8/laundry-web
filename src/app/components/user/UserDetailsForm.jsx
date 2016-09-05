import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate } from '../../data/validators/userDetails';
import Input from '../form/fields.jsx';

class UserDetailsForm extends React.Component {
  componentDidMount() {}
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field component="input" type="hidden" name="idClient" />
        <div className="ui grid">
          <div className="row">
            <div className="column">
              <Field component={Input} type="text" name="name" placeholder="Nombre" />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <Field component={Input} type="text" name="lastName" placeholder="Apellido" />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <Field component={Input} type="email" name="email" placeholder="Email" />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <Field component={Input} type="text" name="rfc" placeholder="RFC" />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <Field component={Input} type="text" name="razonSocial" placeholder="Razon Social" />
            </div>
          </div>
          <div className="row">
            <div className="sixteen wide column Ta(e)">
              <button className="ui icon button" type="submit" onClick={handleSubmit} disabled={submitting}>
                <i className="fa fa-floppy-o" />
                <span className="Mstart(10px)">Guardar</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

UserDetailsForm.propTypes = {
  resetForm: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'userDetailsForm',
  validate,
})(UserDetailsForm);
