import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      user_name: '',
      user_id  : '',
      pwd      : '',
      pwd2     : '',
      errors   : {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  //async onSubmit(e) {
    onSubmit(e) {
    e.preventDefault();

    const newUser = {
      user_name: this.state.user_name,
      user_id  : this.state.user_id,
      pwd      : this.state.pwd,
      pwd2     : this.state.pwd2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;

    return (
      <div>
        <div className="register">
          {user? user.user_name:null}
          
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your DevConnector account</p>
                <form onSubmit={this.onSubmit} noValidate>
                  <div className="form-group">
                    <input  type="email" 
                            className={classnames('form-control form-control-lg', { 'is-invalid': errors.user_id })}
                            placeholder="ID (Email)" 
                            value={this.state.user_id}
                            onChange={this.onChange}
                            name="user_id" />
                    {errors.user_id && <div className="invalid-feedback">{errors.user_id}</div>}
                  </div>
                  <div className="form-group">
                    <input  type="text" 
                            className={classnames('form-control form-control-lg', { 'is-invalid': errors.user_name })}
                            placeholder="Name" 
                            name="user_name" 
                            value={this.state.user_name}
                            onChange={this.onChange}
                            />
                    {errors.user_name && <div className="invalid-feedback">{errors.user_name}</div>}
                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                  </div>
                  <div className="form-group">
                    <input  type="password" 
                            className={classnames('form-control form-control-lg', { 'is-invalid': errors.pwd })}
                            placeholder="Password" 
                            value={this.state.pwd}
                            onChange={this.onChange}
                            name="pwd" />
                    {errors.pwd && <div className="invalid-feedback">{errors.pwd}</div>}
                  </div>
                  <div className="form-group">
                    <input  type="password" 
                            className={classnames('form-control form-control-lg', { 'is-invalid': errors.pwd2 })}
                            placeholder="Confirm Password" 
                            value={this.state.pwd2}
                            onChange={this.onChange}
                            name="pwd2" />
                    {errors.pwd2 && <div className="invalid-feedback">{errors.pwd2}</div>}
                  </div>
                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// 받을 props 타입 설정
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ 
  auth: state.auth,
  errors: state.errors
});

// (받는 데이터, 사용할 메소드)
// withRouter => this.props.history
export default connect(mapStateToProps, { registerUser })(withRouter(Register));