import React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import Form from '../Form'
import Button from '../Button'
import { withCreateTokenMutation } from '../Auth/mutations'
import { newToken } from '../Auth/actions'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
  }

  handleLoginSubmit(data) {
    this.props.createToken({
      variables: data,
    })
      .then(({ data }) => this.props.onLoginSuccess(data.createToken.token))
      .catch(err => {
        console.log({err})
      })
  }

  render() {
    return (
      <Form.Form form="loginForm" onSubmit={this.handleLoginSubmit}>
        <Form.FormTitle>Already have an account?</Form.FormTitle>
        <Form.FieldSet>
          <Form.Row>
            <Form.TextField isEmail isRequired icon="fa fa-user-circle" name="email" placeholder="Email" type="email" />
          </Form.Row>
          <Form.Row>
            <Form.TextField isRequired icon="fa fa-key" name="password" placeholder="Password" type="password" />
          </Form.Row>
          <Button color="blue" expandToParent>Login</Button>
        </Form.FieldSet>
      </Form.Form>
    )
  }

}

LoginForm.defaultProps = {
  onSubmit: () => {},
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  onLoginSuccess: token => dispatch(newToken(token)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withCreateTokenMutation,
)(LoginForm)
