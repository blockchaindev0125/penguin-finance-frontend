import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, useMatchBreakpoints } from 'penguinfinance-uikit2'
import Page from 'components/layout/Page'

// const TOKEN_SALES_ECONOMICS = [
//   { label: 'Hard Cap', value: '10,000,000' },
//   { label: 'Farming & Staking Rewards', value: '5,100,000' },
//   { label: 'Initial Token Sale', value: '2,000,000' },
//   { label: 'Strategic Partnerships & Advisors', value: '500,000' },
//   { label: 'Development & Bug Bounties', value: '500,000' },
//   { label: 'Marketing & Community Growth', value: '500,000' },
//   { label: 'Foundation ', value: '1,400,000' }
// ];

const TOKEN_INFO = [
  { label: 'TOKEN NAME', value: 'BOOFINANCE' },
  { label: 'TOKEN SYMBOL', value: 'BOOFI' },
  { label: 'TOTAL SUPPLY', value: '10,000,000' },
  { label: 'INITIAL SUPPLY', value: '500,000' },
  { label: 'INITIAL MARKET CAP', value: '500,000' },
  { label: 'TOKEN TYPE', value: '500,000' },
  { label: 'TOKEN ADDRESS ', value: '0xb00f1ad977a949a3ccc389ca1d1282a2946963b0' }
];

const LAUNCHPAD_INFO = [
  { label: 'TOKEN NAME', value: 'BOOFINANCE' },
  { label: 'TOKEN SYMBOL', value: 'BOOFI' },
  { label: 'TOKENS OFFERED', value: '2,000,000' },
  { label: 'VESTING PERIOD', value: '500,000' },
  { label: 'PROJECT WEBSITE', value: 'https://www.boofinance.io/' },
  { label: 'NUMBER OF REGISTRATIONS', value: '500,000' },
  { label: 'SALE CONTRACT ADDRESS ', value: '1,400,000' }
];

const TABS = [
  {
    label: 'Launchpad',
    value: 'launchpad',
    smLabel: 'Launchpad'
  },
  {
    label: 'Token Info',
    value: 'token-info',
    smLabel: 'Token'
  }, 
  {
    label: 'About the Project',
    value: 'about',
    smLabel: 'About'
  }, 
  {
    label: 'Your Allocations & Tier',
    value: 'allocations',
    smLabel: 'Allocations & Tier'
  }
];

const TIERS = [
  { 
    label: 'Ghoul',
    imageUrl: 'Ghoul.svg',
    requiredIPEFI: 300
  }, 
  { 
    label: 'Reaper',
    imageUrl: 'Reaper.svg',
    requiredIPEFI: 1500
  }, 
  { 
    label: 'Demonlord',
    imageUrl: 'Demonlord.svg',
    requiredIPEFI: 15000
  }
]

const ProjectDetailsCard = () => {
  const { isXs, isSm, isXl } = useMatchBreakpoints()
  const isMobile = isXs || isSm;
  const [activeTab, setActiveTab] = useState('launchpad');
  const yourTier = 'Demonlord';

  const handleChangeActiveTab = tab => () => {
    setActiveTab(tab);
  };

  const renderLaunchpadInfo = () => {
    return (
      <IdoDetailsContainer>
        <HeaderTitle fontSize='34px' color='#313131' fontWeight={800} mb='35px'>Launchpad Info</HeaderTitle>
        <TokenSalesEconomics>
          {LAUNCHPAD_INFO.map((tokenEconomic) => {
            return (
              <TokenEconomic key={tokenEconomic.label} justifyContent='space-between'>
                <Text color='#5E4BAF' fontSize='14px' lineHeight='32px' fontWeight={600}>{tokenEconomic.label}</Text>
                <Text color='#292929' fontSize='16px' lineHeight='32px' fontWeight={600}>{tokenEconomic.value}</Text>
              </TokenEconomic>
            )
          })}
        </TokenSalesEconomics>
      </IdoDetailsContainer>
    )
  };

  const renderTokenInfo = () => {
    return (
      <IdoDetailsContainer>
        <HeaderTitle fontSize='34px' color='#313131' fontWeight={800} mb='35px'>Token Info</HeaderTitle>
        <TokenSalesEconomics>
          {TOKEN_INFO.map((tokenEconomic) => {
            return (
              <TokenEconomic key={tokenEconomic.label} justifyContent='space-between'>
                <Text color='#5E4BAF' fontSize='14px' lineHeight='32px' fontWeight={600}>{tokenEconomic.label}</Text>
                <Text color='#292929' fontSize='16px' lineHeight='32px' fontWeight={600}>{tokenEconomic.value}</Text>
              </TokenEconomic>
            )
          })}
        </TokenSalesEconomics>
      </IdoDetailsContainer>
    )
  };

  const renderTokenAllocation = () => {
    return (
      <AllocationsContainer>
        <HeaderTitle fontSize='34px' color='#313131' fontWeight={800} mb='35px'>Allocations & Tier</HeaderTitle>
        <TierInfo justifyContent='space-between' alignItems='center'>
          <Allocation src={`${process.env.PUBLIC_URL}/images/ido/tiers/${yourTier}.svg`} alt='allocation' />
          <AllocationInfo>
            <Flex>
              <img src={`${process.env.PUBLIC_URL}/images/ido/tier.svg`} alt='your-tier' />
              <Text color='#292929' fontSize='34px' fontWeight={800} ml='10px'>Your Tier</Text>
            </Flex>
            <TokenEconomic justifyContent='space-between'>
              <Text color='#5E4BAF' fontSize='14px' lineHeight='32px' fontWeight={600}>YOUR ALLOCATION</Text>
              <Text color='#292929' fontSize='16px' lineHeight='32px' fontWeight={600}>62.5 AP</Text>
            </TokenEconomic>
            <TokenEconomic justifyContent='space-between'>
              <Text color='#5E4BAF' fontSize='14px' lineHeight='32px' fontWeight={600}>YOUR STAKE</Text>
              <Text color='#292929' fontSize='16px' lineHeight='32px' fontWeight={600}>15000.00 iPEFI</Text>
            </TokenEconomic>
            <TokenEconomic justifyContent='space-between'>
              <Text color='#5E4BAF' fontSize='14px' lineHeight='32px' fontWeight={600}>PRICE PER BOOFI</Text>
              <Text color='#292929' fontSize='16px' lineHeight='32px' fontWeight={600}> $0.02</Text>
            </TokenEconomic>
          </AllocationInfo>
        </TierInfo>
        <AllocationsFooter justifyContent='space-around'>
          {TIERS.map((tier, index) => {
            return (
              <React.Fragment key={tier.label}>
                <Flex alignItems='center' className='allocation'>
                  {tier.label === yourTier && 
                    <img src={`${process.env.PUBLIC_URL}/images/ido/footer-tier.svg`} alt='active-tier' />
                  }
                  <TierLabel active={tier.label === yourTier}>
                    {tier.label}
                  </TierLabel>
                  <TierTag active={tier.label === yourTier}>
                    {`+${tier.requiredIPEFI} iPEFI`}
                  </TierTag>
                </Flex>
                {((index < (TIERS.length-1)) && isXl) &&
                  <Connector alignItems='center'>
                    <div className='prev-connector' />
                    <div className='connect-line' />
                    <div className='next-connector' />
                  </Connector>
                }
              </React.Fragment>
            )
          })}
        </AllocationsFooter>
      </AllocationsContainer>
    )
  };

  const renderAbout = () => {
    return (
      <IdoDetails>
        <IntroductionImage src={`${process.env.PUBLIC_URL}/images/ido/introduction_boofi.png`} />
        <HeaderTitle fontSize='34px' color='#313131' fontWeight={800} mt='50px' mb='8px'>About the BooFinance Project</HeaderTitle>
        <Text fontSize='16px' lineHeight='24px' color='#7F7F7F' mt='24px'>
          Boo Finance is pioneering DeFi 3.0 with an exciting, gamified yield farming platform built for user competition. Users can enter the Haunted House of dApps through the Cauldron, where you earn zBOOFI rewards by staking your LP or single-asset, interest-bearing tokens. The Stake allows you to &quot;zombify&quot; your BOOFI on the spot for zBOOFI (single-asset staking)! zBOOFI is your ticket to adventure in the Haunted House, and it&apos;s always growing in value.
        </Text>
        <Text fontSize='16px' lineHeight='24px' color='#7F7F7F' mt='24px'>
          &quot;Ghosts&quot; use the Cauldron and the Stake to maximize their zBOOFI over time, competing for the highest score on the Well of Souls leaderboard. By staking a lot of zBOOFI for a long period of time, you&apos;ll earn additional BOOFI rewards. Ghosts who harvest the most rewards ascend their way to the top of the leaderboard and gain the title of Top Necromancers! Not only do Top Necromancers get fame, glory, and BOOFI rewards, they also get unique additional rewards. Airdrops, bonus tokens, and NFTs are just a few things possible for the most dedicated users!
        </Text>
        <Text fontSize='16px' lineHeight='24px' color='#7F7F7F' mt='24px'>
          Just like Penguin Finance, Boo Finance is a community-oriented protocol, with no venture capital, pre-mine, or private sales. Boo Finance aims to maximize its impact on Avalanche through a fun and innovative wealth-generation machine.
        </Text>
      </IdoDetails>
    )
  }

  const renderIntroduction = () => {
    switch(activeTab) {
      case 'launchpad':
        return renderLaunchpadInfo();
      case 'token-info':
        return renderTokenInfo();
      case 'about':
        return renderAbout();
      case 'allocations':
        return renderTokenAllocation();
      default:
        return null;
    }
  };

  return (
    <Container>
      <MaskBgContainer />
      <MaskBgImageContainer />
      <LaunchpadPage>
        <Text mb='64px' fontSize='41px' fontWeight={800} color='#fff'>Project Details</Text>
        <Flex>
          {TABS.map(tab => {
            return (
              <TabHead active={tab.value === activeTab} key={tab.value} onClick={handleChangeActiveTab(tab.value)}>{isMobile ? tab.smLabel : tab.label}</TabHead>
            )
          })}        
        </Flex>
        <IntroductionContainer>
          {renderIntroduction()}
        </IntroductionContainer>
      </LaunchpadPage>
    </Container>
  )
}

const TabHead = styled.div<{ active?: boolean }>`
  background: ${({ active }) => active ? '#FFFFFF' : '#CBC5E4'};
  color: ${({ active }) => active ? '#5E4BAF' : '#797293'};
  font-size: 12px;
  // line-height: 24px;
  padding: 8px 8px;
  border-radius: 8px 8px 0 0;
  margin-right: 4px;
  cursor: pointer;

  @media (min-width: 640px) {
    border-radius: 15px 15px 0 0;
    padding: 4px 16px;
    font-size: 16px;
    line-height: 24px;
  }
  @media (min-width: 968px) {
    padding: 8px 30px;
  }
`;

const TokenEconomic = styled(Flex)`
  border-bottom: 1px solid #DCDCDC;
  padding-top: 16px;
  padding-bottom: 16px;

  div {
    padding-left: 0;
    padding-right: 0;
    line-height: 14px;
    line-height: 16px;

    &:first-child {
      text-transform: uppercase;
    }

    &:last-child {
      padding-left: 16px;
      padding-right: 16px;
    }

    @media (min-width: 640px) {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
`;

const TokenSalesEconomics = styled.div`
  max-width: 100%;
`;

const IntroductionImage = styled.img`
  width: 100%;
  border-radius: 16px;
`;

const Container = styled.div`
  position: relative;
  padding-bottom: 60px;
`;

const HeaderTitle = styled(Text)`
  font-size: 26px;
  line-height: 1;
  @media (min-width: 640px) {
    font-size: 34px;
    line-height: 1.5;
  }
`;

const LaunchpadPage = styled(Page)`
  max-width: 1200px;
  padding-top: 40px;

  @media (min-width: 640px) {
    padding-top: 60px;
  }

  @media (min-width: 968px) {
    padding-top: 100px;
  }
`;

const MaskBgContainer = styled.div`
  background-size: cover;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
  background: linear-gradient(204.54deg, #2A2844 39.75%, #1F2426 139.73%);
`;

const MaskBgImageContainer = styled.div`
  background-image: url('/images/ido/mask.png');
  background-size: cover;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`;

const IntroductionContainer = styled.div`
  background: white;
  box-shadow: 0px 121px 174px rgba(33, 6, 49, 0.1), 0px 61.2562px 75.8531px rgba(33, 6, 49, 0.0675), 0px 24.2px 28.275px rgba(33, 6, 49, 0.05), 0px 5.29375px 10.0594px rgba(33, 6, 49, 0.0325);
  border-radius: 0 20px 20px;
`;

const IdoDetails = styled.div`
  padding: 20px;
  padding-bottom: 32px;

  @media (min-width: 768px) {
    padding: 32px;
    padding-bottom: 48px;
  }
  @media (min-width: 968px) {
    padding: 35px;
    padding-bottom: 60px;
  }
`;

const IdoDetailsContainer = styled.div`
  padding: 30px 20px;
  padding-bottom: 48px;

  @media (min-width: 768px) {
    padding: 48px 32px;
    padding-bottom: 72px;
  }
  @media (min-width: 968px) {
    padding: 60px 36px;
    padding-bottom: 100px;
  }
`;

const AllocationsContainer = styled.div`
  padding: 30px 20px 16px;

  @media (min-width: 768px) {
    padding: 48px 32px 16px;
  }
  @media (min-width: 968px) {
    padding: 60px 36px 16px;
  }
`;

const Allocation = styled.img`
  max-width: 360px;
`;

const AllocationInfo = styled.div`
  max-width: 570px;
  width: 100%;
`;

const AllocationsFooter = styled(Flex)`
  flex-direction: column; 
  justify-content: space-around;
  align-items: center;
  padding: 24px 0 8px;
  margin-top: 60px;

  @media (min-width: 968px) {
    flex-direction: row;
    border-top: 1px solid #DCDCDC;
  }

  .allocation {
    margin-top: 8px;

    @media (min-width: 968px) {
      margin-top: 0;
    }
  }
`;

const TierLabel = styled(Text)<{ active?: boolean }>`
  color: ${({ active }) => !active ? '#BDBDBD' : '#7405AA'};
  font-weight: ${({ active }) => active ? 'bold' : 500};
  margin-left: ${({ active }) => active && '8px'};
`;

const TierTag = styled.div<{ active?: boolean }>`
  background: ${({ active }) => !active ? '#BCBCBC' : '#7405AA'};
  color: white;
  border-radius: 8px;
  margin-left: 8px;
  padding: 4px 8px;
  font-size: 14px;
`;

const Connector = styled(Flex)`
  .prev-connector, .next-connector {
    background: #E1E1E1;
    height: 4px;
    width: 4px;
    transform: rotate(45deg);
  }
  .connect-line {
    border-top: 1px solid #E1E1E1;
    width: 100px;
  }
`;

const TierInfo = styled(Flex)`
  flex-direction: column;

  @media (min-width: 968px) {
    flex-direction: row;
  }
`;

export default ProjectDetailsCard
