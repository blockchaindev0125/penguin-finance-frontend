import React, { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Button, Flex, useModal } from 'penguinfinance-uikit2'
import UnlockButton from 'components/UnlockButton'
import roundDown from 'utils/roundDown'
import escapeRegExp from 'utils/escapeRegExp'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'
import TokenInput from './TokenInput'

interface UnStakeFormProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
  account?: string
  requested: boolean
  stakingTokenName: string
  onApprove: () => void
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

const UnstakeForm: React.FC<UnStakeFormProps> = ({ max, tokenName = '', account, onConfirm }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleConfirm = async () => {
    setPendingTx(true)
    try {
      await onConfirm(val)
      setPendingTx(false)
      setVal('')
    } catch (error) {
      setPendingTx(false)
      setVal('')
    }
  }

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const nextInput = e.currentTarget.value.replace(/,/g, '.')
      if (nextInput.length < 25) {
        if (nextInput === '' || inputRegex.test(escapeRegExp(nextInput))) {
          setVal(nextInput)
        }
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    // setVal(roundDown(fullBalance, 2))
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const renderText = () => {
    if (Number(val) > Number(fullBalance)) return 'Not Enough Funds'
    if (pendingTx) return TranslateString(488, 'Pending Confirmation')
    if (val) return 'Confirm Withdrawal'
    return 'Enter Amount'
  }

  const canUnStake = !pendingTx && Number(val) > 0 && Number(fullBalance) >= Number(val)

  return (
    <>
      <TokenInput
        value={roundDown(val, 2)}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <Flex mt="8px">
        <StyledButton scale="md">Coming Soon</StyledButton>

        {/* {!account && <StyledUnlockButton />}
        {account && (
          <>
            <StyledButton tokenBalance={val} scale="md" disabled={!canUnStake} onClick={onConfirm}>
              {renderText()}
            </StyledButton>
          </>
        )} */}
      </Flex>
    </>
  )
}

const StyledButton = styled(Button)<{ tokenBalance?: string }>`
  width: 100%;
  border-radius: 8px;
  color: white;
  background-color: #38db93;
`

const StyledUnlockButton = styled(UnlockButton)`
  width: 100%;
  border-radius: 8px;
  background-color: #38db93;
`

export default UnstakeForm
