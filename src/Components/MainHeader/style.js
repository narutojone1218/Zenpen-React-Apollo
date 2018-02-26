import styled from 'styled-components';
import media from '../../util/styles/media'
import colors from '../../util/styles/colors'
import { mainHeader as mainHeaderImages } from '../../assets/images'

export default component => (styled(component)`



  /***** main *****/

  background-image: url(${mainHeaderImages.background});
  background-size: cover;


  ${media.desktop_lr`
    border-width: 0.1em;
  `}

  ${media.tablet`
    background-image: url(${mainHeaderImages.backgroundMobile});
    border-width: 0.1em;
  `}


  /***** header-text *****/

  .header-text {
    .t1 {
      font-size: 3em;
      color: ${colors.black};
      font-weight: 300;
    }
    .t2 {
      display: inline-block;
      .b1 {
        font-size: 5.5em;
        color: ${colors.brand};
        text-transform: uppercase;
        font-weight: 300;
      }
      .b2 {
        background: ${colors.brand};
        font-size: 2.4em;
        color: white;
        text-align: center;
        letter-spacing: 0.13em;
        width: 100%;
        font-weight: 300;
        padding: 0.2em;
      }
    }
  }

  ${media.tablet`
    .header-text {
      .t1 {
        font-size: 2em;
        margin-bottom: 0.2em;
      }
      .t2 {
        .b1 {
          font-size: 4em;
        }
        .b2 {
          font-size: 1.5em;
          letter-spacing: 0.1em;
          padding: 0.13em;
        }
      }
    }
  `}



  ${media.small_phone`
    .header-text {
      .t1 {
        font-size: 1em;
      }
      .t2 {
        .b1 {
          font-size: 1em;
        }
        .b2 {
          font-size: 1em;
        }
      }
    }
  `}

  /***** p-caller *****/

  .p-caller-list {
    font-size: 80%;
    > * {
      margin-right: 2em;
      padding-right: 2em;
      background: url(${mainHeaderImages.separatorVertical}) right 2em no-repeat;
      &:last-child {
        margin-right: 0;
        padding-right: 0;
        background: none;
      }
    }
  }

  .p-caller {
    text-align: center;
    display: inline-block;
    .icon {
      display: inline-block;
      height: 4em;
      width: 4em;
      background-position: center;
      background-repeat: none;
      background-size: contain;
      margin-bottom: 0.3rem;
    }
    .title {
      color: ${colors.brand};
      font-size: 2.1em;
      text-transform: uppercase;
      margin-bottom: 0.3rem;
    }
    .desc {
      font-size: 1.3em;
      font-weight: 300;
    }
    &.relax {
      .icon {
        background-image: url(${mainHeaderImages.icon1});
      }
    }
    &.focus {
      .icon {
        background-image: url(${mainHeaderImages.icon2});
      }
    }
    &.rejuvenate {
      .icon {
        background-image: url(${mainHeaderImages.icon3});
      }
    }
  }

  ${media.tablet`
    .p-caller-list {
      > * {
        margin-right: 1em;
        padding-right: 1em;
      }
    }
    .p-caller {
      .icon {
        height: 3em;
        width: 3em;
      }
      .title {
        font-size: 1.6em;
      }
      .desc {
        font-size: 0.9em;
      }
    }
  `}

 
  ${media.phone`
    .header-text {
      .t2 {
        .b1 {
          font-size: 2.5em;
        }
        .b2 {
          font-size: 1em;
        }
      }
    }
    .p-caller-list {
      > * {
        margin-right: 1em;
        padding-right: 0;
        background: none;
      }
    }
    .p-caller {
      .icon {
        height: 3em;
        width: 3em;
      }
      .title {
        font-size: 1.6em;
      }
      .desc {
        font-size: 0.9em;
      }
    }
  `}
  



`)
