import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@penguinfinance/uikit'

export interface ExpandableSectionProps {
  avaxScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  withdrawalFee?: string
  feeLabel?: string
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  avaxScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  addLiquidityUrl,
  withdrawalFee,
  feeLabel
}) => {
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(316, 'Stake')}:</Text>
        <StyledLinkExternal href={addLiquidityUrl}>{lpLabel}</StyledLinkExternal>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(316, 'Withdrawal Fee')}:</Text>
        <Text>{`${withdrawalFee} %`}</Text>
      </Flex>
      {!removed && (
        <Flex justifyContent="space-between">
          <Text>{TranslateString(23, 'Total Liquidity')}:</Text>
          <Text>{totalValueFormated}</Text>
        </Flex>
      )}
      <Flex justifyContent="flex-start">
        <Link external href={avaxScanAddress} bold={false}>
          {TranslateString(356, 'View on AVAX CChain Explorer')}
        </Link>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
