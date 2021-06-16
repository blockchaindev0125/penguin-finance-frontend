import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const PEFI_MAX_SUPPLY = 21000000
export const AVAX_BLOCK_TIME = 8.2
export const WEEKS_PER_YEAR = 52
export const SECONDS_PER_YEAR = 60 * 60 * 24 * 365
export const PEFI_POOL_PID = 0
export const BASE_EXCHANGE_URL = 'https://app.pangolin.exchange'
export const BASE_LYDIA_EXCHANGE_URL = 'https://exchange.lydia.finance/'
export const BASE_GONDOLA_LIQUIDITY_POOL_URL = 'https://app.gondola.finance/#/deposit'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LYDIA_LIQUIDITY_URL = `${BASE_LYDIA_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1

export const MAX_COMPOUND_APY = 99999

export const APY_TOOLTIP_TEXT =
  '<div>The APY  shown are estimated for your convenience, it is not a guaranteed return rate. These yields can change due to block speed, emission rates adjustments, compounding strategies, among other factors</div>'

export const COINGECKO_API_ENDPOINT = 'https://api.coingecko.com/api'
export const ASSET_CONTENT_URL = 'https://raw.githubusercontent.com/Penguin-Finance/assets/master'
