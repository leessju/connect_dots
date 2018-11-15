import React, { Component } from 'react'
//import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor() {
    super();
   
    this.state = {
      user_id: '',
      pwd: '',
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  //async onSubmit(e) {
    onSubmit(e) {
    e.preventDefault();

    const loginUser = {
      user_id: this.state.user_id,
      pwd: this.state.pwd
    }

    this.props.loginUser(loginUser);
    
    // try {
    //   const res = await axios.post('/api/user/login', loginUser);
    //   console.log(res.data);
    // } catch (err) {
    //   this.setState({errors: err.response.data.res_msg})
    //   console.log(this.state.errors);
    // }
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { errors } = this.state;
    //const { user } = this.props.auth;

    return (
      <div>

        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your DevConnector account</p>
                <form onSubmit={this.onSubmit} noValidate>
                  <div className="form-group">
                    <input type="email" 
                           className={classnames('form-control form-control-lg', { 'is-invalid': errors.user_id })}
                           placeholder="Email Address" 
                           value={this.state.user_id}
                           onChange={this.onChange}
                           name="user_id" />
                    {errors.user_id && <div className="invalid-feedback">{errors.user_id}</div>}
                  </div>
                  <div className="form-group">
                    <input type="password" 
                           className={classnames('form-control form-control-lg', { 'is-invalid': errors.pwd })}
                           placeholder="Password" 
                           value={this.state.pwd}
                           onChange={this.onChange}
                           name="pwd" />
                    {errors.pwd && <div className="invalid-feedback">{errors.pwd}</div>}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ 
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);