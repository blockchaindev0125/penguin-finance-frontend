import React from 'react'
import styled, { useTheme } from 'styled-components'
import useMediaQuery from 'hooks/useMediaQuery'
import { Text, ResetCSS, Link, useMatchBreakpoints, Image } from 'penguinfinance-uikit2'
import { FooterProps, FooterBodyProps, FlexProps } from './types'
import { FooterLinks, FooterIconLinks, FooterIconsSponsor } from './config'

const Footer: React.FC<FooterProps> = () => {
  const theme = useTheme()
  const { isLg, isXl } = useMatchBreakpoints()
  const isStacked = !isLg && !isXl
  const isMobile = !isXl
  // custom hook for unhandled Breakpoint test
  const is2k = useMediaQuery('(min-width: 2000px)')

  return (
    <>
      <ResetCSS />
      {/* {console.log('test', isLg)}
      {console.log('QueryTest', is2k)} */}
      <FooterWrapper>
        <FooterBody isStacked={isStacked}>
          <Column isStacked={isStacked} maxWidth={is2k ? '280px' : '260px'}>
            <Div width="100%" height={is2k ? '45px' : '35px'} mb="5px" mt="-8px">
              <Image
                src={theme.isDark ? 'images/footer/logoDark.svg' : 'images/footer/logoLight.svg'}
                width={400}
                height={is2k ? 45 : 35}
              />
            </Div>
            <FooterParagraph as="p" textAlign={isStacked ? 'center' : 'left'} fontSize=".8rem" color="#B7B5DE" mb="6px">
              The Penguin Finance protocol is bringing yield-farming, staking and more functionalities to the Avalanche
              Network.
            </FooterParagraph>
            <Row isStacked={isStacked} alignItems="center">
              <Div width={is2k ? '24px' : '16px'} height={is2k ? '24px' : '16px'}>
                <Image
                  src={theme.isDark ? 'images/footer/shieldDark.svg' : 'images/footer/shieldLight.svg'}
                  width={is2k ? 24 : 20}
                  height={is2k ? 24 : 20}
                />
              </Div>
              <TitleText ml="10px" color="#fff">
                Audited by Certik
              </TitleText>
            </Row>
          </Column>
          {FooterLinks.map((data) => (
            <Column key={data.title} isStacked={isStacked}>
              <TitleText color="#fff" mb="6px" mt={isStacked && '2.5rem'}>
                {data.title}
              </TitleText>
              {data.links.map((link) => (
                <CustomLink key={`${data.title}-${link.key}`} href={link.url} target="_blank" rel="noreferrer">
                  {link.title}
                </CustomLink>
              ))}
            </Column>
          ))}
          <Column isStacked={isStacked} alignItems="center" maxWidth="350px">
            <TitleText color="#fff" mt={isStacked && '2.5rem'}>
              Official Social Media
            </TitleText>
            <Row isStacked={isStacked} justifyContent="space-around" alignItems="center" width="200px">
              {FooterIconLinks[0].map((item) => {
                return (
                  <Div key={`social-${item.key}`} width={is2k ? '29px' : '24px'} height={is2k ? '29px' : '24px'}>
                    <a href={item.url} target="_blank" rel="noreferrer">
                      <Image
                        src={theme.isDark ? item.darkUrl : item.lightUrl}
                        width={is2k ? 29 : 24}
                        height={is2k ? 29 : 24}
                      />
                    </a>
                  </Div>
                )
              })}
            </Row>
            <TitleText color="#fff" mt="2.5rem">
              Powered by
            </TitleText>
            <Row isStacked={isStacked} justifyContent="space-around" alignItems="center" width="100%">
              {FooterIconsSponsor.map((item) => {
                return (
                  <Div key={`sponsor-${item.key}`} width={is2k ? '35px' : '30px'} height={is2k ? '35px' : '30px'}>
                    <a href={item.url} target="_blank" rel="noreferrer">
                      <Image src={item.lightUrl} width={is2k ? 35 : 30} height={is2k ? 35 : 30} />
                    </a>
                  </Div>
                )
              })}
            </Row>
          </Column>
        </FooterBody>
      </FooterWrapper>
    </>
  )
}

const Column = styled.div<FlexProps>`
  display: flex;
  flex-direction: column;
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  width: ${({ width }) => width || 'auto'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems, isStacked }) => (isStacked ? 'center' : alignItems || 'stretch')};
  margin-bottom: ${({ mb }) => mb || 0};
`

const Row = styled.div<FlexProps>`
  display: flex;
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  width: ${({ width }) => width || 'auto'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'stretch'};
  margin-top: 16px;
`

const FooterBody = styled.div<FooterBodyProps>`
  max-width: 1200px; //1200px
  display: flex;
  flex-direction: ${(props) => (props.isStacked ? 'column' : 'row')};
  justify-content: ${({ isStacked }) => (isStacked ? 'center' : 'space-between')};
  align-items: ${({ isStacked }) => (isStacked ? 'center' : 'stretch')};
  padding: 3rem 2rem 3rem 2rem;
  margin: auto;
  @media (min-width: 2000px) {
    max-width: 1700px;
  }
`

const FooterWrapper = styled.div`
  width: '100%';
  background-color: ${(props) => (!props.theme.isDark ? '#2A2844' : '#121020')};
`

const CustomLink = styled(Link).attrs((props) => ({
  small: true,
  color: '#B7B5DE',
  fontSize: '0.7rem',
  mb: '6px',
}))`
  font-family: 'Telegraf UltraLight';
  font-weight: 200;
  font-size: 16px;
  line-height: 1.2;

  @media (min-width: 968px) {
    font-size: 18px;
  }
  @media (min-width: 2000px) {
    font-size: 23px;
  }
`

const TitleText = styled(Text)`
  font-family: 'Telegraf Bold';
  font-size: 16px;
  line-height: 1.2;

  @media (min-width: 968px) {
    font-size: 22px;
  }
  @media (min-width: 2000px) {
    font-size: 27px;
  }
`

const FooterParagraph = styled(Text)`
  font-family: 'Telegraf UltraLight';
  font-size: 16px;

  @media (min-width: 968px) {
    font-size: 18px;
  }
  @media (min-width: 2000px) {
    font-size: 20px;
  }
`

const Div = styled.div<{ width: string; height: string; mb?: string; mt?: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-bottom: ${(props) => props.mb || 0};
  margin-top: ${(props) => props.mt || 0};
`

export default Footer
