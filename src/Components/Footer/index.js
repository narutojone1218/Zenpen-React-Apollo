import React from 'react'

import * as C from './components'

const Footer = () => (
  <C.FooterWrapper>
    <C.FooterSection>
      <C.FooterLeftContainer>
        <C.FooterIconContainer>
          <C.SocialIconWrapper><C.SocialIcon className="fa fa-facebook-f" aria-hidden="true" /></C.SocialIconWrapper>
          <C.SocialIconWrapper><C.SocialIcon className="fa fa-instagram" aria-hidden="true" /></C.SocialIconWrapper>
          <C.SocialIconWrapper><C.SocialIcon className="fa fa-twitter" aria-hidden="true" /></C.SocialIconWrapper>
          <C.SocialIconWrapper><C.SocialIcon className="fa fa-pinterest" aria-hidden="true" /></C.SocialIconWrapper>
          <C.SocialIconWrapper><C.SocialIcon className="fa fa-at" aria-hidden="true" /></C.SocialIconWrapper>
        </C.FooterIconContainer>
      </C.FooterLeftContainer>
      <C.FooterRightContainer>
        <C.FooterIconContainer>
          <C.FooterIcon className="fa fa-expeditedssl" aria-hidden="true" />
          <C.FooterIcon className="fa fa-cc-visa" aria-hidden="true" />
          <C.FooterIcon className="fa fa-cc-mastercard" aria-hidden="true" />
        </C.FooterIconContainer>
      </C.FooterRightContainer>
    </C.FooterSection>
    <C.FooterSection>
      <p>Copyright <i className="fa fa-copyright" aria-hidden="true" /> 2017 MyZenPen. All Rights Reserved.</p>
    </C.FooterSection>
  </C.FooterWrapper>
)

export default Footer
