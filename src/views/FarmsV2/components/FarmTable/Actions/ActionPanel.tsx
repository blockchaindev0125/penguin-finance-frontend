import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes, css } from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Card, Text, Button, Flex, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { WEEKS_PER_YEAR } from 'config'
import useAssets from 'hooks/useAssets'
import { useV2Harvest } from 'hooks/useV2Farm'
import useTheme from 'hooks/useTheme'
import { getBalanceNumber } from 'utils/formatBalance'
import { getTokenLogoFromSymbol } from 'utils/token'
import Balance from 'components/Balance'
import tokens from 'config/constants/tokens'
import { getAddress } from 'utils/addressHelpers'
import { usePricePefiUsdt, usePricePngUsdt, useV2Pools } from 'state/hooks'
import { FarmCardProps } from '../../types'
import StakePanel from './StakePanel'
import AutoNesting from './AutoNesting'

const getIPefiToPefiRatio = (pool) => {
  return pool.totalStaked && pool.totalSupply
    ? new BigNumber(pool.totalStaked).div(new BigNumber(pool.totalSupply)).toJSON()
    : 1
}

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 1000px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 1000px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => (theme.isDark ? '#121021' : theme.colors.background)};
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 8px 0 0;
  overflow: auto;

  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
    // justify-content: space-between;
    padding: 8px 0 0;
  }
`

const ActionCard = styled(Card)<{ minWidth?: number }>`
  border-radius: 16px;
  overflow: unset;
  min-width: ${({ minWidth }) => minWidth && `${minWidth}px`};

  filter: ${({ theme }) => theme.card.dropShadow};
`

const PendingRewardsCard = styled(ActionCard)`
  @media (min-width: 1400px) {
    min-width: 480px;
  }
`;
const PendingRewardsContent = styled(Flex)`
  flex-wrap: wrap;

  .pending-rewards {
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 1400px) {
      flex-direction: column;
      align-items: flex-start;
      width: unset;
    }
  }
  @media (min-width: 1400px) {
    min-width: 450px;
    width: unset;
    justify-content: space-between;
  }
`;

const RewardImage = styled.img<{ size: number; ml?: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  margin: 0px 12px;
  margin-left: ${({ ml }) => ml && `${ml}px`};
  border-radius: 50%;
`

const StyledButton = styled(Button)`
  font-weight: 500;
  font-size: 14px;
  border-radius: 10px;
  height: 38px;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.colors.red};
  color: white;

  img {
    margin-left: 8px;
  }
`

const EarningsContainer = styled.div`
  min-width: 180px;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  height: 3px;
  width: 100%;
`

const Label = styled(Text)`
  white-space: nowrap;
`

const StyledBalance = styled(Balance)`
  margin: auto !important;
  white-space: nowrap;
`

const UsdBalanceWrapper = styled.div`
  div {
    color: ${({ theme }) => (theme.isDark ? '#b2b2ce' : theme.colors.textDisabled)};
  }
`

const BalanceWrapper = styled.div`
  div {
    white-space: nowrap;
    span {
      margin-right: 2px;
    }
  }
`

const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
`

const ActionPanel: React.FunctionComponent<FarmCardProps> = ({ farm, lpPrice, expanded }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const { getTokenLogo, getTokenSymbol } = useAssets()
  const { onHarvest } = useV2Harvest(farm.pid)
  const { account } = useWeb3React()
  const v2Pools = useV2Pools(account)
  const v2Nest = v2Pools.length > 0 ? v2Pools[0] : null
  const pefiPriceUsd = usePricePefiUsdt().toNumber()
  const pngPriceUsd = usePricePngUsdt().toNumber()
  const iPefiToPefiRatio = Number(getIPefiToPefiRatio(v2Nest))
  const iPefiPriceUsd = iPefiToPefiRatio * pefiPriceUsd

  const { isXl, isLg } = useMatchBreakpoints()
  const isMobile = !isXl
  const { pendingTokens, userData, maxBips: maxAutoNestAllocation } = farm
  const userPendingTokens = userData ? userData.userPendingTokens : []
  const userShares = userData ? getBalanceNumber(userData.userShares) : 0
  const userStakedBalance = userData ? getBalanceNumber(userData.stakedBalance) : 0
  const userStakedBalanceInUsd = userData ? userStakedBalance * lpPrice : 0
  const uesrAutoNestingAllocation = userData ? userData.userIpefiDistributionBips : 0

  const totalShares = getBalanceNumber(farm.totalShares)
  const totalLp = getBalanceNumber(farm.totalLp)
  const liquidity = totalLp ? totalLp * lpPrice : '-'

  const userSharePercentage = totalShares > 0 ? (100 * userShares) / totalShares : 0
  const theme = useTheme()
  const pefiPerYear = getBalanceNumber(farm.pefiPerYear)
  const pefiPerWeek = pefiPerYear / WEEKS_PER_YEAR

  const lpSymbol = farm.lpSymbol.replaceAll(' LP', '')
  const lpLogo = getTokenLogoFromSymbol(lpSymbol)

  const onClickHarvest = async () => {
    setPendingTx(true)
    try {
      await onHarvest()
      setPendingTx(false)
    } catch (error) {
      setPendingTx(false)
    }
  }

  const getTokenPrice = (address) => {
    const rewardToken = tokens.find((row) => getAddress(row.address) === address)
    if (rewardToken && rewardToken.symbol === 'PEFI') return pefiPriceUsd
    if (rewardToken && rewardToken.symbol === 'iPEFI') return iPefiPriceUsd
    if (rewardToken && rewardToken.symbol === 'PNG') return pngPriceUsd
    return 1
  }

  return (
    <Container expanded={expanded}>
      <ActionCard className='stake-panel' padding="20px" mr={!isMobile && '8px'} mb="8px" minWidth={300}>
        <StakePanel {...farm} />
      </ActionCard>
      <ActionCard className='earnings-panel' mr={!isMobile && '8px'} mb="8px" minWidth={300}>
        <Flex padding="16px 16px 12px">
          <EarningsContainer>
            <Title fontSize="20px" bold lineHeight={1} mb="8px">
              Your Stake
            </Title>
            <Balance
              fontSize="14px"
              color="textSubtle"
              fontWeight="400"
              prefix=""
              suffix={` ${lpSymbol}`}
              value={Number(userStakedBalance)}
            />
            <UsdBalanceWrapper>
              <Balance fontSize="10px" fontWeight="400" prefix="$" value={Number(userStakedBalanceInUsd)} />
            </UsdBalanceWrapper>
            {userSharePercentage > 3 && (
              <Balance
                fontSize="14px"
                color="textSubtle"
                fontWeight="400"
                prefix=" "
                suffix="% of the igloo"
                value={Number(userSharePercentage)}
              />
            )}
          </EarningsContainer>
          <RewardImage src={lpLogo} alt="pefi-earning" size={56} />
        </Flex>
        <Divider />
        <Flex padding="12px 16px">
          <EarningsContainer>
            <Title fontSize="20px" bold lineHeight={1} mb="8px">
              Igloo Stats
            </Title>
            <Balance
              fontSize="14px"
              color="textSubtle"
              fontWeight="400"
              prefix="APR: "
              suffix="%"
              value={Number(pefiPerWeek)}
            />
            <Balance
              fontSize="14px"
              color="textSubtle"
              fontWeight="400"
              prefix="Liquidity: $"
              value={Number(liquidity)}
            />
            <Balance
              fontSize="14px"
              color="textSubtle"
              fontWeight="400"
              prefix="PEFI Per Week: "
              value={Number(pefiPerWeek)}
            />
          </EarningsContainer>
          <RewardImage src={lpLogo} alt="igloo-stats" size={56} />
        </Flex>
      </ActionCard>
      <Flex className='pending-panel' flexDirection="column" mb="8px">
        <PendingRewardsCard padding="10px 16px">
          <PendingRewardsContent>
            <Flex alignItems="center" justifyContent="space-around" mr="16px">
              {pendingTokens.map((pendingToken) => {
                const rewardTokenInfo = userPendingTokens.find((row) => row.address === pendingToken)
                const amount = rewardTokenInfo ? Number(rewardTokenInfo.amount) : 0
                const amountInUsd = getTokenPrice(pendingToken) * amount

                return (
                  <Flex flexDirection="column" alignItems="center" mr="4px" ml="4px">
                    <RewardImage src={getTokenLogo(pendingToken)} alt="penguin" size={50} />
                    <BalanceWrapper>
                      <StyledBalance
                        fontSize="14px"
                        color="textSubtle"
                        fontWeight="400"
                        value={getBalanceNumber(new BigNumber(amount))}
                      />
                    </BalanceWrapper>
                    <UsdBalanceWrapper>
                      <Balance
                        fontSize="10px"
                        fontWeight="400"
                        prefix="$"
                        value={getBalanceNumber(new BigNumber(amountInUsd))}
                      />
                    </UsdBalanceWrapper>
                  </Flex>
                )
              })}
            </Flex>
            <Flex flexDirection="column" justifyContent="space-between" pb="4px">
              <Label fontSize="20px" color="textSubtle" bold mt="4px">
                Pending Rewards
              </Label>
              <StyledButton
                color="primary"
                endIcon={<img src="/images/farms/harvest-coin.svg" alt="harvest" width={16} />}
                disabled={!account || pendingTx}
                onClick={onClickHarvest}
              >
                {pendingTx ? 'Pending...' : 'Harvest'}
              </StyledButton>
            </Flex>
          </PendingRewardsContent>
        </PendingRewardsCard>
        <ActionCard padding="12px 16px" mt="8px">
          <AutoNesting currentAllocation={uesrAutoNestingAllocation} maxAllocation={maxAutoNestAllocation} />
        </ActionCard>
      </Flex>
    </Container>
  )
}

export default ActionPanel
