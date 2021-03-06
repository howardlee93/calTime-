

import React from 'react';
import { withRouter } from 'react-router-dom';


class SignIn extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          password: '',
          errors: {}
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.renderErrors = this.renderErrors.bind(this);
      }
    


      componentDidUpdate(nextProps){  
          if (nextProps.currentUser === true) {
              this.props.history.push('/activity');
            }
        
            // this.setState({errors: nextProps.errors})

      }
   
    
      update(field) {
        return e => this.setState({
          [field]: e.currentTarget.value
        });
      }
    
      handleSubmit(e) {
        e.preventDefault();
    
        let user = {
          email: this.state.email,
          password: this.state.password
        };
    
        this.props.login(user); 
      }
    
      // renderErrors() {
      //   return(
      //     <ul>
      //       {Object.keys(this.state.errors).map((error, i) => (
      //         <li key={`error-${i}`}>
      //           {this.state.errors[error]}
      //         </li>
      //       ))}
      //     </ul>
      //   );
      // }
    
      render() {
        return (
          <div>
            <h3 style={{color:'white'}}>Sign in</h3>
            <form onSubmit={this.handleSubmit}>
              <div>
                <br/>
                  <input type="text"
                    value={this.state.email}
                    onChange={this.update('email')}
                    placeholder="Email"
                  />
                <br/>
                  <input type="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                    placeholder="Password"
                  />
                <br/>
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        );
      }


}
export default withRouter(SignIn);