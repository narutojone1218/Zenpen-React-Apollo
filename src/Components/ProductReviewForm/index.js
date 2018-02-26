import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import gql from 'graphql-tag'
import Form from '../Form'
import Button from '../Button'
import Modal from '../Modal'
import ReviewStarSelectorField from '../ReviewStarSelector/field'
import { withCreateReviewMutation } from '../../Components/Reviews/mutations'

class ProductReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, open: false }
    this.handleProductReviewSubmit = this.handleProductReviewSubmit.bind(this)
  }

  handleProductReviewSubmit(data) {
    this.setState({ open: false })
    this.setState({ loading: true })
    this.props.createReview({
      variables: {
        productId: this.props.product.id,
        ...data,
      },
    })
      .then(_ => this.handleProductReviewSubmitSuccess())
      .finally(_ => this.handleProductReviewSubmitComplete())
  }

  handleProductReviewSubmitSuccess() {
    if (this.props.onSubmit) {
      this.props.onSubmit()
    }
  }

  handleProductReviewSubmitComplete() {
    this.setState({ loading: false })
    this.setState({ open: true })
    this.props.onBtnClick(false)
  }

  render() {
    const { account, product, ...formProps } = this.props
    return (           
      <Form.Form form={`ProductReviewForm_${product.id}`} loading={this.state.loading} {...formProps} onSubmit={this.handleProductReviewSubmit}>
        <Form.FormTitle>Your {product.title} Review</Form.FormTitle>
        <Form.FieldSet>
          <Form.Row>
            <Form.TextField icon="fa fa-bullhorn" name="title" type="text" placeholder="Title" />
          </Form.Row>
          <Form.Row>
            <ReviewStarSelectorField iconSpace value={5} name="rating" />
          </Form.Row>
          <Form.Row>
            <Form.TextAreaField icon="fa fa-pencil" name="content" rows={5} placeholder="Your Review" />
          </Form.Row>
          <Button color="blue" expandToParent>Submit Review</Button>
        </Form.FieldSet>
      </Form.Form>
    )
  }
}

ProductReviewForm.propTypes = {
  onBtnClick: PropTypes.func
}

ProductReviewForm.fragments = {
  account: gql`
    fragment ProductReviewForm_account on Account {
      id
      firstName
      lastName
    }
  `,
  product: gql`
    fragment ProductReviewForm_product on Product {
      id
      title
    }
  `,
}

ProductReviewForm.defaultProps = {
  onSubmit: () => {},
}

export default compose(withCreateReviewMutation)(ProductReviewForm)
