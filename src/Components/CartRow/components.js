import styled from 'styled-components'
import gql from 'graphql-tag'
import media from '../../util/styles/media'
import colors from '../../util/styles/colors'
import ProductImage from '../ProductImage'
import ProductIcon from '../ProductIcon'
import { bundles, extra } from '../../assets/images'
import MiniProductBox from '../MiniProductBox'

export const CartRowWrapper = styled.div`
  position: relative;
  ${media.small_phone`
    font-size: 95%;
  `}
  border-radius: 0.3em;
`

export const CartRowProductImageCell = styled.div`
  text-align: center;
  margin-right: 2em;
  ${media.phone`
    margin-right: 1em;
  `}
`

export const CartRowProductImageWrapper = styled.div`
  padding: 9px;
  background: white;
  border-radius: 0.3em;
  box-shadow: inset 0px 0px 5px rgb(109, 109, 109);
  border: 1px solid white;
  line-height: 0;
  ${ProductImage} {
    margin: 0 auto;
    &:first-child {
      margin-bottom: 0.5em;
    }
  }
`

export const CartRowProductDetailCell = styled.div`
  flex-grow: 1;
`

export const CartRowProductDetailExtended = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.phone`
    align-items: baseline;
  `}
`

export const CartRowProductDetailExtendedLeft = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2em;
  > * {
    margin-bottom: 0.8rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  ${media.phone`
    margin-right: 1em;
  `}
`

export const CartRowProductDetailExtendedRight = styled.div`
  display: block;
  margin-right: 1em;
  align-items: center;
  ${media.phone`
    flex-direction: column;
    align-items: flex-end;
  `}
`

export const CartRowProductTitle = styled.div`
  font-size: 1.5em;
  display: flex;
  margin-bottom: 0.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #e0e0e0;
  ${media.phone`
    font-size: 1.2em;
    border-bottom: none;
  `}
`

export const CartRowProductInStock = styled.div`
  font-size: 90%;
  color: ${colors.darkGreen};
`

export const CartRowProductDescription = styled.div`
  font-size: 85%;
  line-height: 1.4em;
  ${media.phone`
    display: none;
  `}
`

export const CartRowProductPriceCell = styled.div`
  flex: 1;
  white-space: nowrap;
  text-align: right;
  color: ${colors.darkGray};
  font-size: 14px;
  line-height: 29px;
`

export const CartRowProductQuantityCell = styled.div`
  text-align: center;
`

export const CartRowActionsWrapper = styled.div`
  font-size: 80%;
`

export const ProductIconStyled = styled(ProductIcon)``

export const CartRowUserBundleImage = styled.div`
  background: url(${({ bundleConfig }) => bundles[bundleConfig.slug].primary});
  background-size: 120%;
  background-position: center;
  border-radius: 0.3em;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  height: 100px;
  width: 100px;
  border: 2px solid white;
  display: inline-block;
  ${media.phone`
  height: 70px;
  width: 70px;
  `}
`

export const CancelButton = styled.div`
  cursor: pointer;
  background: red;
  color: white;
  border-radius: 0.3rem;
  text-align: center;
  padding: 0.5rem 1rem;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  transition: all .2s;
  width: 80px;
  margin-bottom: 20px;
  &:hover {
    background: darkRed;
  }
`

export const EditButton = styled.div`
  cursor: pointer;
  background: #fbfbfb;
  color: black;
  width: 80px;
  text-align: center;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  transition: all .2s;
  &:hover {
    background: #dfdfdf;
  }
`

export const ShipDate = styled.span`
  margin-left: 20px;
`

CartRowUserBundleImage.fragments = {
  bundleConfig: gql`
    fragment CartRowUserBundleImage_bundleConfig on BundleConfig {
      slug
    }
  `,
}

export const MiniProductBoxStyled = styled(MiniProductBox)``

export const MiniProductBoxes = styled.div`
  margin: -0.5em;
  margin-bottom: 0.3rem;
  ${MiniProductBoxStyled} {
    margin: 0.5em;
  }
  ${({ small }) => (small ? `
    font-size: 70%;
  ` : '')}
`

export const ProductIcons = styled.div`
  margin-bottom: 0.8rem;
  ${ProductIconStyled} {
    margin-right: 0.3em;
    &:last-child {
      margin-right: 0;
    }
  }
`

export const CartRowUserBundleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5em;
  border-radius: 0.3em;
`

export const UpsellWrapper = styled.div`
  ${media.phone`
    padding: 0 0.3em;
  `}
`

export const UpsellWrapperInner = styled.div`
  border: 5px solid #e9e981;
  border-radius: 0.3em;
`

export const UpsellHeader = styled.div`
  background: url(${extra.whiteWaveBg});
  background-color: #ffffea;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
  padding: 1em;
  align-items: center;
  ${media.phone`
    flex-direction: column;
    align-items: flex-start;
  `}
`

export const UpsellDetails = styled.div`
  text-shadow: 0 1px 1px rgba(0,0,0,.15);
  ${media.phone`
    margin-bottom: 1em;
  `}
`

export const PriceWrapper = styled.span`
  font-size: 120%;
  color: ${colors.red};
`

export const ListedPriceWrapper = styled.span`
  text-decoration: line-through;
  font-size: 90%;
`

export const SavingsWrapper = styled.span`
  font-size: 90%;
`

export const UpsellTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.2rem;
  letter-spacing: 0.03em;
`

export const UpsellPricing = styled.div`
  margin-bottom: 0.2rem;
`

export const UpsellPromoText = styled.div`
  font-size: 90%;
  font-weight: 300;
  color: #54962b;
`

export const UpsellDescription = styled.div`
  font-size: 90%;
  font-weight: 300;
`

export const UpsellActions = styled.div`

`

export const UpsellChildRow = styled.div`

`

export const UpsellTitleTooltipIconWrapper = styled.a`
  color: ${colors.blackish};
  text-decoration: none;
`

export const UpsellTooltipContentWrapper = styled.div`
  max-width: 400px;
  font-size: 150%;
`

export const UpsellContentWrapper = styled.div`
  border-radius: 0.3em;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  ${UpsellChildRow},
  ${CartRowUserBundleWrapper} {
    border-bottom-left-radius: 0.3em;
    border-bottom-right-radius: 0.3em;
  }
`
