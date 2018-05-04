import React from "react";
import PropTypes from "prop-types";
import "./Login.css"
import Validator from "validator";
import InlineError from "../messages/InlineError";
import {FormattedMessage} from "react-intl"
import {NavLink} from 'react-router-dom'


class Login extends React.Component {

    state = {
        data: {
            email: '',
            password: '',
            remember: false
        },
        loading: false,
        errors: {}
    }

    onChange = e =>
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        })

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            this.props
                .submit(this.state.data)
                .catch(error =>{
                    console.log(error.response.data.error)
                    this.setState({errors: {global: error.response.data.error}, loading: false})
                });
        }
    }

    validate = data => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Can't be blank";
        return errors;
    }

    toggleCheckboxChange = e => {
      this.setState({
        data: {
          ...this.state.data,
          remember: !this.state.data.remember
        }
      })
    }

    render() {

        const {data, errors, loading} = this.state;
        const {classes} = this.props;

        return (

            <div className="login-background">
               <div className="">
                   <div className="">
                       <div id="login_contens" >

                           <h1><img src="/common/images/logo_01.png" width="180px" alt=" "/></h1>

                           <div className="login-box">
                               <form action="" id="logForm" role="form" name="logForm" method="post" className="form-horizontal" onSubmit={this.onSubmit}>
                                   {errors.global && <InlineError  text={errors.global}/>}
                                   <input type="hidden" name="returnUrl" value=""/>
                                   <input type="hidden" name="Act" value="LoginCheck"/>
                                   <input type="hidden" name="VToken" value=""/>
                                   <div className="form-group col-xs-12">
                                       <input type="text"
                                              id="email"
                                              className={!errors.email ? 'form-control input-lg' : 'form-control input-lg is-invalid'}
                                              name="email"
                                              placeholder="Email"
                                              value={data.email}
                                              onChange={this.onChange}
                                              autoComplete="off" required=""  />
                                       {errors.email && <InlineError text={errors.email}/>}
                                   </div>
                                   <div className="form-group col-xs-12">
                                       <input type="password"
                                              placeholder="password" id="password"
                                              name="password"
                                              className={!errors.password ? 'form-control input-lg' : 'form-control input-lg is-invalid'}
                                              value={data.password}
                                              onChange={this.onChange}
                                              autoComplete="off"
                                              required=""  />
                                       {errors.password && <InlineError text={errors.password}/>}

                                   </div>
                                   <div className="save-box col-xs-12">
                                    <div className="checkbox save-check">
                                      <label>
                                        <input
                                          type="checkbox"
                                          value={data.remember}
                                          checked={data.remember}
                                          onChange={this.toggleCheckboxChange}
                                        />
                                          <span className="label-text">아이디 저장</span>

                                      </label>
                                    </div>
                                       <div className="login-btn">
                                           <button type="submit" name="loginbt" className="btn bg-pink3 btn-md"
                                           ><span>로그인</span></button>
                                       </div>
                                       <div className="clearfix"></div>

                                       <div className="text-right  m-t-5">
                                          <NavLink to="/password/reset">
                                            <span>비밀번호 찾기</span>
                                          </NavLink>
                                       </div>
                                   </div>
                               </form>

                           </div>

                       </div>
                   </div>
               </div>
            </div>
    );
  }
}

Login.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default Login;

