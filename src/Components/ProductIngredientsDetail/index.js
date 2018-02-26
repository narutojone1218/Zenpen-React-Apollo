import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { ingredient as ingredientImages } from '../../assets/images'
import colors from '../../util/styles/colors'
import media from '../../util/styles/media'

const ProductIngredientsDetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: -0.5em;
`

const ProductIngredientWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin: 0.5em;
  ${({ count }) => ((count % 2) === 0 ? `
    flex-basis: calc(50% - 20px);
    width: calc(50% - 20px);
    max-width: calc(50% - 20px);
  ` : `
    flex-basis: calc(33% - 20px);
    width: calc(33% - 20px);
    max-width: calc(33% - 20px);
  `)}
  ${media.desktop_lr`
    ${({ count }) => ((count % 2) === 0 ? `
      flex-basis: calc(50% - 20px);
      width: calc(50% - 20px);
      max-width: calc(50% - 20px);
    ` : `
      flex-basis: calc(50% - 20px);
      width: calc(50% - 20px);
      max-width: calc(50% - 20px);
    `)}
  `}
  ${media.tablet`
    margin-bottom: 1em;
    ${({ count }) => ((count % 2) === 0 ? `
      width: 100%;
      max-width: 100%;
      flex-basis: 100%;
    ` : `
      width: 100%;
      max-width: 100%;
      flex-basis: 100%;
    `)}
  `}
`

const ProductIngredientContainer = styled.div`
  flex: 1;
`

const ProductIngredientHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1em;
  ${media.tablet`
    margin-bottom: 0;
  `}
`

const ProductIngredientImageWrapper = styled.div`
  margin-right: 1em;
`

const ProductIngredientImage = styled.img`
  width: 3em;
`

const ProductIngredientTitleWrapper = styled.div`
  font-weight: 300;
  color: ${colors.blackish};
  font-size: 160%;
`

const ProductIngredientTitle = styled.p`

`

const ProductIngredientSubTitle = styled.p`
  color: #9e9e9e;
  font-size: 60%;
  font-style: italic;
`

const ProductIngredientRoleText = styled.p`
  color: ${({ product }) => `${product.primaryColor}`};
  font-size: 80%;
  font-style: italic;
`

const ProductIngredientDescription = styled.div`
  font-weight: 300;
  color: ${colors.blackish};
  line-height: 1.5em;
`

const ProductIngredientsDetailItem = ({
  count, ingredient, description, product,
}) => (
  <ProductIngredientWrapper count={count}>
    <ProductIngredientContainer>
      <ProductIngredientHeaderWrapper>
        <ProductIngredientImageWrapper>
          <ProductIngredientImage src={ingredientImages[ingredient.slug]} alt={ingredient.title} />
        </ProductIngredientImageWrapper>
        <ProductIngredientTitleWrapper>
          <div>
            <ProductIngredientTitle>{ingredient.title}</ProductIngredientTitle>
            <ProductIngredientSubTitle>{ingredient.scientific}</ProductIngredientSubTitle>
          </div>
        </ProductIngredientTitleWrapper>
      </ProductIngredientHeaderWrapper>
      <ProductIngredientDescription>
        <ProductIngredientRoleText product={product}>{ingredient.title}'s role in {product.title}...</ProductIngredientRoleText>
        {description}
      </ProductIngredientDescription>
    </ProductIngredientContainer>
  </ProductIngredientWrapper>
)

const ProductIngredientsDetail = ({ product }) => (
  <ProductIngredientsDetailWrapper>
    {product.ingredients.edges.map(({ node, description }) => (
      <ProductIngredientsDetailItem
        key={node.id}
        count={product.ingredients.edges.length}
        product={product}
        ingredient={node}
        description={description}
      />
      ))}
  </ProductIngredientsDetailWrapper>
)

ProductIngredientsDetail.fragments = {
  product: gql`
    fragment ProductIngredientsDetail_product on Product {
      id
      title
      primaryColor
      ingredients {
        edges {
          description
          node {
            id
            slug
            title
            scientific
            shortDescription
          }
        }
      }
    }
  `,
};

export default ProductIngredientsDetail
