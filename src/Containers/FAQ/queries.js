import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Accordians from '../../Components/Accordians'

const query = graphql(gql` 
  query FAQPageQuery { 
    viewer { 
      id 
      faqs: allFAQS { 
        ...Accordians_faqConnection 
      } 
    } 
  } 
  ${Accordians.fragments.faqConnection} 
`)

export default compose(query)
