import React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { ButtonComponent } from '../Button/components'
import { withCreateSocialTokenMutation } from '../Auth/mutations'
import { newToken } from '../Auth/actions'

const FacebookLoginWrapper = ({ className, ...props }) => (
  <FacebookLogin cssClass={className} {...props} />
)

const FacebookLoginStyled = ButtonComponent.withComponent(FacebookLoginWrapper)

class FacebookLoginButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
  }

  handleFacebookLogin(response) {
    this.props.createSocialToken({
      variables: {
        socialId: response.id,
        socialType: 'FACEBOOK',
        email: response.email,
        signature: response.requestSignature,
        firstName: response.first_name,
        lastName: response.last_name,
      },
    })
      .then(({ data }) => this.props.onLoginSuccess(data.createSocialToken.token))
      .catch((err) => {
        console.log({ err })
      })
  }

  render() {
    const { ...buttonProps } = this.props
    return (
      <FacebookLoginStyled
        appId="140822963356991"
        autoLoad={false}
        fields="first_name,last_name,email,picture"
        color="facebook"
        expandToParent
        callback={this.handleFacebookLogin}
        textButton={<span><i className="fa fa-facebook-official" /> Connect with Facebook</span>}
      />
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  onLoginSuccess: token => dispatch(newToken(token)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withCreateSocialTokenMutation,
)(FacebookLoginButton)
