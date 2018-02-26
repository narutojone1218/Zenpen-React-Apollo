import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import Collapsible from 'react-collapsible'
import MarkdownRenderer from 'react-markdown-renderer'

export const AccordianWrapper = styled.div`
`

const Accordian = ({ faq }) => (
  <Collapsible trigger={faq.trigger}>
    <MarkdownRenderer markdown={faq.answer} />
  </Collapsible>
)

const Accordians = ({ faqs }) => (
  <AccordianWrapper>
    {faqs.edges.map(({ node }) => (<Accordian faq={node} />))}
  </AccordianWrapper>
)

Accordians.fragments = {
  faqConnection: gql` 
    fragment Accordians_faqConnection on FAQConnection { 
      edges { 
        node { 
          trigger 
          answer 
        } 
      } 
    } 
  `,
}

export default Accordians
