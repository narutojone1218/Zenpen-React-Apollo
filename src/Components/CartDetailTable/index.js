import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import CartTable from '../CartTable'
import colors from '../../util/styles/colors'
import Section from '../Section'
import ProductIcon from '../ProductIcon'

const CartDetailTableWrapper = styled.div`

`

const CartDetailTableHeader = styled.thead`

`

const CartDetailTableHeaderRow = styled.tr`

`

const CartDetailTableHeaderCell = styled.th`
  vertical-align: bottom;
  border-bottom: 2px solid ${colors.gray};
  padding: 0 10px 10px 10px;
  text-align: ${({ align }) => align};
`

CartDetailTableHeaderCell.defaultProps = {
  align: 'left',
}

const CartDetailTableBodyRow = styled.tr`

`

const CartDetailTableBodyCell = styled.td`
  text-align: ${({ align }) => align};
  padding: 10px;
  font-weight: ${({ strong }) => (strong ? 'bold' : 'inherit')};
`

CartDetailTableBodyCell.defaultProps = {
  align: 'left',
}

const CartDetailTableBody = styled.tbody`

`

const CartDetailTableFooterRow = styled.tr`

`

const CartDetailTableFooterCell = styled.td`
  text-align: ${({ align }) => align};
  padding: 10px;
  font-weight: ${({ strong }) => (strong ? 'bold' : 'inherit')};
  ${({ highlight }) => (highlight ? `
    background-color: #ffffd5;
  ` : '')}
`

CartDetailTableFooterCell.defaultProps = {
  align: 'left',
}

const CartDetailTableFooter = styled.tfoot`

`

const CartDetalTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 80%;
  > ${CartDetailTableBody} {
    > ${CartDetailTableBodyRow} {
      > ${CartDetailTableBodyCell} {
        border-bottom: 1px solid ${colors.lightGray};
      }
      &:last-child {
        > ${CartDetailTableBodyCell} {
          border-bottom: none;
        }
      }
    }
  }
  > ${CartDetailTableFooter} {
    > ${CartDetailTableFooterRow} {
      &:first-child {
        ${CartDetailTableFooterCell} {
          border-top: 1px solid ${colors.gray};
        }
      }
    }
  }
`

CartDetalTable.defaultProps = {
  striped: false,
}

const CartTotals = styled(CartDetalTable)`
  width: 50%;
`

const MiniUserBundleWrapper = styled.div`

`

const MiniUserBundleTitle = styled.div`
  font-weight: bold;
`

const MiniUserBundleProducts = styled.div`
  padding: 9px 0 0 9px;
`

const UserBundleProductIcon = styled(ProductIcon)`
  margin-right: 3px;
`

const SubscriptionWrapper = styled.span`
  color: ${colors.brandDark};
`

const GrandTotalWrapper = styled.span`
  color: ${colors.red};
`

const CartDetail = ({ cart }) => (
  <CartDetailTableWrapper>
    <CartDetalTable striped>
      <CartDetailTableHeader>
        <CartDetailTableHeaderRow>
          <CartDetailTableHeaderCell>Product</CartDetailTableHeaderCell>
          <CartDetailTableHeaderCell align="right">Quantity</CartDetailTableHeaderCell>
          <CartDetailTableHeaderCell align="right">Unit Price</CartDetailTableHeaderCell>
          <CartDetailTableHeaderCell>Subscription</CartDetailTableHeaderCell>
        </CartDetailTableHeaderRow>
      </CartDetailTableHeader>
      <CartDetailTableBody>
        {cart.cartable.edges.map(edge => (
          (edge.node.cartableType === 'UserBundle' ? (
            <CartDetailTableBodyRow key={edge.id}>
              <CartDetailTableBodyCell colSpan={2}>
                <MiniUserBundleWrapper>
                  <MiniUserBundleTitle>{edge.node.bundleConfig.title}</MiniUserBundleTitle>
                  <MiniUserBundleProducts>
                    {edge.node.products.edges.map(({ id: userBundleProductEdgeId, node: userBundleProduct }) => (
                      <p key={`MiniUserBundleProducts_${userBundleProductEdgeId}`}>
                        <UserBundleProductIcon forceIcon="fa fa-circle" product={userBundleProduct} /> {userBundleProduct.title}
                      </p>
                    ))}
                  </MiniUserBundleProducts>
                </MiniUserBundleWrapper>
              </CartDetailTableBodyCell>
              <CartDetailTableBodyCell strong align="right">{edge.node.price.formatted}</CartDetailTableBodyCell>
              <CartDetailTableBodyCell>
                {edge.node.bundleConfig.subscription ? (
                  <SubscriptionWrapper><i className="fa fa-refresh" /> Monthly</SubscriptionWrapper>
                ) : null}
              </CartDetailTableBodyCell>
            </CartDetailTableBodyRow>
          ) : (
            <CartDetailTableBodyRow key={edge.id}>
              <CartDetailTableBodyCell strong><ProductIcon forceIcon="fa fa-circle" product={edge.node} /> {edge.node.title}</CartDetailTableBodyCell>
              <CartDetailTableBodyCell align="right">{edge.quantity}</CartDetailTableBodyCell>
              <CartDetailTableBodyCell strong align="right">{edge.node.price.formatted}</CartDetailTableBodyCell>
              <CartDetailTableBodyCell />
            </CartDetailTableBodyRow>
          ))
        ))}
      </CartDetailTableBody>
    </CartDetalTable>
    <Section.Sub />
    <CartTotals>
      <CartDetailTableBody>
        <CartDetailTableBodyRow>
          <CartDetailTableBodyCell strong>Subtotal:</CartDetailTableBodyCell>
          <CartDetailTableBodyCell align="right">{cart.subtotal.formatted}</CartDetailTableBodyCell>
        </CartDetailTableBodyRow>
        <CartDetailTableBodyRow>
          <CartDetailTableBodyCell strong>Discounts:</CartDetailTableBodyCell>
          <CartDetailTableBodyCell align="right">{cart.discounts.formatted}</CartDetailTableBodyCell>
        </CartDetailTableBodyRow>
        <CartDetailTableBodyRow>
          <CartDetailTableBodyCell strong>Shipping:</CartDetailTableBodyCell>
          <CartDetailTableBodyCell align="right">{cart.shipping.formatted}</CartDetailTableBodyCell>
        </CartDetailTableBodyRow>
        <CartDetailTableBodyRow>
          <CartDetailTableBodyCell strong>Sales Tax:</CartDetailTableBodyCell>
          <CartDetailTableBodyCell align="right">{cart.tax.formatted}</CartDetailTableBodyCell>
        </CartDetailTableBodyRow>
      </CartDetailTableBody>
      <CartDetailTableFooter>
        <CartDetailTableFooterRow>
          <CartDetailTableFooterCell highlight strong>Grand Total (due now):</CartDetailTableFooterCell>
          <CartDetailTableFooterCell highlight strong align="right"><GrandTotalWrapper>{cart.total.formatted}</GrandTotalWrapper></CartDetailTableFooterCell>
        </CartDetailTableFooterRow>
      </CartDetailTableFooter>
    </CartTotals>
  </CartDetailTableWrapper>
)

CartDetail.defaultProps = {
  small: false,
  controls: true,
}

CartDetail.fragments = {
  cart: gql`
    fragment CartDetailTable_cart on Cart {
      id
      quantity
      subtotal(currency: USD) {
        formatted
      }
      discounts(currency: USD) {
        formatted
      }
      shipping(currency: USD) {
        formatted
      }
      tax(currency: USD) {
        formatted
      }
      total(currency: USD) {
        formatted
      }
      cartable {
        edges {
          id
          quantity
          node {
            id
            cartableType: __typename
            __typename
            ... on Product {
              id
              title
              slug
              shortDescription
              price(currency: USD) {
                formatted
              }
              primaryColor
              ...ProductIcon_product
            }
            ... on UserBundle {
              id
              price(currency: USD) {
                formatted
              }
              products {
                edges {
                  id
                  node {
                    id
                    title
                    ...ProductIcon_product
                  }
                }
              }
              bundleConfig {
                id
                title
                subscription
              }
            }
          }
        }
      }
    }
    ${ProductIcon.fragments.product}
  `,
}

export default CartDetail
