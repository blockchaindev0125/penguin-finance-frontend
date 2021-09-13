import React, { useState, useCallback, useEffect } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Card, Flex, Text, Button, useMatchBreakpoints } from 'penguinfinance-uikit2'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { getBalanceNumber, getNumberWithCommas } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import { useV2NestContract } from 'hooks/useContract'
import { useV2Pools } from 'state/hooks'
import { getPefiAddress } from 'utils/addressHelpers'
import roundDown from 'utils/roundDown'
import CardValue from 'components/CardValue'
import NestCard from './components/NestCard'

const NestV2: React.FC = () => {
  const [handsOnPenalty, setHandsOnPenalty] = useState(6)
  const { path } = useRouteMatch()
  const { account } = useWeb3React()
  const pools = useV2Pools(account)
  const iPefiContract = useV2NestContract()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  const [finishedPools, openPools] = partition(pools, (pool) => pool.isFinished)

  const fetchHandsOnPenalty = useCallback(async () => {
    const perHandsPenalty = await iPefiContract.methods.paperHandsPenalty().call()
    setHandsOnPenalty(perHandsPenalty)
  }, [iPefiContract])

  const getXPefiToPefiRatio = () => {
    return openPools[0].totalStaked && openPools[0].totalSupply
      ? new BigNumber(openPools[0].totalStaked).div(new BigNumber(openPools[0].totalSupply)).toNumber()
      : 1
  }

  const handleLearnMore = () => {
    window.open('https://docs.penguinfinance.io/summary/penguin-nests-staking-and-fee-collection', '_blank')
  }

  useEffect(() => {
    // fetchHandsOnPenalty()
  }, [fetchHandsOnPenalty])

  const xPefiToPefiRatio = getXPefiToPefiRatio()
  const stakedBalance = new BigNumber(openPools[0].userData?.stakedBalance || 0)
  const pefiBalance = useTokenBalance(getPefiAddress())
  const displayedNestApy = (openPools[0].apy.toNumber() * 100).toFixed(2)

  return (
    <Flex justifyContent="center">
      <NestDetailsContainer>
        <NestCardsWrapper justifyContent="space-between">
          <LeftCardsContainer>
            <APYCard padding="8px 24px 16px" mb="16px">
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="20px" color="white" fontWeight={500}>
                  {`Yesterday's APY `}
                </Text>
                <Text fontSize="36px" bold color="white">
                  {getNumberWithCommas(displayedNestApy)}%
                </Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <ViewStatsButton scale="sm" onClick={handleLearnMore}>
                  Learn More
                </ViewStatsButton>
                <APYLabel>{`${Number(handsOnPenalty).toFixed(2)}% Paper Hands Penalty`}</APYLabel>
              </Flex>
            </APYCard>
            <Route exact path={`${path}`}>
              <>
                {orderBy(openPools, ['sortOrder']).map((pool) => (
                  <NestCard key={pool.sousId} pool={pool} isMainPool />
                ))}
              </>
            </Route>
            <Route path={`${path}/history`}>
              {orderBy(finishedPools, ['sortOrder']).map((pool) => (
                <NestCard key={pool.sousId} pool={pool} isMainPool />
              ))}
            </Route>
          </LeftCardsContainer>
          <BalanceCard padding="16px 24px 32px" mb="16px">
            <Flex flexDirection={isMobile ? 'row' : 'column'} justifyContent="space-between">
              <div>
                <BalanceLabel>Balance</BalanceLabel>
                <Flex mt="4px" alignItems="center">
                  <CardImage
                    isMobile={isMobile}
                    src="/images/pools/iPefi.svg"
                    alt="ipefi logo"
                    width={64}
                    height={64}
                  />
                  <Flex flexDirection="column">
                    <Balance>
                      <CardValue
                        className="balance"
                        fontSize={isMobile ? '22px' : '24px'}
                        value={roundDown(getBalanceNumber(stakedBalance), 2)}
                        decimals={2}
                        lineHeight="1"
                      />
                    </Balance>
                    <BalanceText fontSize={isMobile ? '18px' : '20px'} fontWeight={300} lineHeight="1.4">
                      iPEFI
                    </BalanceText>
                    <BalanceTextSmall>
                      <CardValue
                        className="balance"
                        fontSize="12px"
                        value={roundDown(xPefiToPefiRatio * getBalanceNumber(stakedBalance), 2)}
                        decimals={2}
                        lineHeight="1.2"
                        prefix="≈ "
                        suffix=" PEFI"
                      />
                    </BalanceTextSmall>
                  </Flex>
                </Flex>
              </div>
              <div>
                <BalanceLabel mt={!isMobile && '24px'}>Unstaked</BalanceLabel>
                <Flex mt="4px" alignItems="center">
                  <CardImage
                    isMobile={isMobile}
                    src="/images/penguin-finance-logo.svg"
                    alt="penguin logo"
                    width={64}
                    height={64}
                  />
                  <Flex flexDirection="column">
                    <Balance>
                      <CardValue
                        className="balance"
                        fontSize={isMobile ? '22px' : '24px'}
                        value={account ? roundDown(getBalanceNumber(pefiBalance), 2) : 0}
                        decimals={2}
                        lineHeight="1"
                      />
                    </Balance>
                    <BalanceText fontSize={isMobile ? '18px' : '20px'} fontWeight={300} lineHeight="1.4">
                      PEFI
                    </BalanceText>
                    <BalanceTextSmall>
                      <CardValue
                        className="balance"
                        fontSize="12px"
                        value={account ? roundDown(getBalanceNumber(pefiBalance) / xPefiToPefiRatio, 2) : 0}
                        decimals={2}
                        lineHeight="1.2"
                        prefix="≈ "
                        suffix=" iPEFI"
                      />
                    </BalanceTextSmall>
                  </Flex>
                </Flex>
              </div>
            </Flex>
          </BalanceCard>
        </NestCardsWrapper>
      </NestDetailsContainer>
    </Flex>
  )
}

const NestCardsWrapper = styled(Flex)`
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const LeftCardsContainer = styled.div`
  width: 100%;
  margin-right: 16px;
`

const APYCard = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#30264F' : theme.colors.secondary)};
  border-radius: 8px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 460px;
  }
`

const BalanceCard = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#30264F' : 'white')};
  border-radius: 8px;
  width: 100%;
  margin-top: 16px;
  height: max-content;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 260px;
    width: 240px;
    margin-top: 0;
  }
`

const BalanceLabel = styled(Text)`
  font-size: 18px;
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
  font-weight: 500;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
  }
`

const NestDetailsContainer = styled.div`
  max-width: 720px;
  width: 100%;
`

const ViewStatsButton = styled(Button)`
  background: white;
  border-radius: 4px;
  font-weight: 400;
  margin-right: 16px;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.secondary};
`

const APYLabel = styled(Text)`
  color: #ddd7ff;
  font-weight: 400;
`

const CardImage = styled.img<{ isMobile?: boolean }>`
  margin-right: ${({ isMobile }) => (isMobile ? '8px' : '12px')};
  width: ${({ isMobile }) => (isMobile ? '56px' : '72px')};
  height: ${({ isMobile }) => (isMobile ? '56px' : '72px')};
`

const Balance = styled.div`
  .balance {
    color: ${({ theme }) => theme.colors.red};
    font-weight: 500;
  }
`

const BalanceText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
  line-height: 1.2;
`

const BalanceTextSmall = styled.div`
  .balance {
    color: ${({ theme }) => (theme.isDark ? '#BBA6DD' : '#8F88A0')};
    font-weight: 400;
  }
`

export default NestV2