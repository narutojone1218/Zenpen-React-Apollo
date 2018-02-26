import React from 'react'

import gql from 'graphql-tag'
import style from './style'

import { ingredient as ingredientImages } from '../../assets/images'

const Ingredient = ({ className, ingredient }) => (
  <div className={className}>
    <img src={ingredientImages[ingredient.slug]} alt={ingredient.title} />
    <p className="title">{ingredient.title}</p>
  </div>
)

const IngredientStyled = style(Ingredient)

IngredientStyled.fragments = {
  ingredient: gql`
    fragment Ingredient_ingredient on Ingredient {
      id
      slug
      title
      shortDescription
    }
  `,
}

export default IngredientStyled
