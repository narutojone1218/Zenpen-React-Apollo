import React from 'react'
import BundleSlot from '../BundleSlot'
import styled from 'styled-components'
import gql from 'graphql-tag'

const BundleSlotsWrapper = styled.div``

const BundleSlots = ({ userBundle }) => {
  const quantity = userBundle.bundleConfig.quantity

  const remaining = quantity - userBundle.products.edges.length

  const dummyArray = []
  for (let i = 0; i < remaining; i++) {
    dummyArray.push({ node: null })
  }

  const products = [].concat(userBundle.products.edges, dummyArray)

  return (
    <BundleSlotsWrapper>
      {products.map(({ userBundleProductId, node }, idx) => (
        <BundleSlot
          key={`${idx}_${(userBundleProductId || 'no-selection')}`}
          userBundleProductId={userBundleProductId}
          quantity={quantity}
          remaining={remaining}
          number={idx + 1}
          userBundle={userBundle}
          product={node}
        />
      ))}
    </BundleSlotsWrapper>
  )
}

BundleSlots.fragments = {
  userBundle: gql`
    fragment BundleSlots_userBundle on UserBundle {
      products {
        edges {
          id
          userBundleProductId: id
          node {
            id
            ...BundleSlot_product
          }
        }
      }
      ...BundleSlot_userBundle
    }
    ${BundleSlot.fragments.product}
    ${BundleSlot.fragments.userBundle}
  `,
}

export default BundleSlots
