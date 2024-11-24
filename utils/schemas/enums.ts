export enum Currency {
  // Major currencies
  USD = 'USD', // United States Dollar
  EUR = 'EUR', // Euro
  GBP = 'GBP', // British Pound Sterling
  JPY = 'JPY', // Japanese Yen
  CHF = 'CHF', // Swiss Franc
  AUD = 'AUD', // Australian Dollar
  CAD = 'CAD', // Canadian Dollar
  NZD = 'NZD', // New Zealand Dollar

  // Latin American currencies
  ARS = 'ARS', // Argentine Peso
  BRL = 'BRL', // Brazilian Real
  CLP = 'CLP', // Chilean Peso
  COP = 'COP', // Colombian Peso
  MXN = 'MXN', // Mexican Peso
  PEN = 'PEN', // Peruvian Sol
  UYU = 'UYU', // Uruguayan Peso
  PYG = 'PYG', // Paraguayan Guarani

  // European currencies
  SEK = 'SEK', // Swedish Krona
  NOK = 'NOK', // Norwegian Krone
  DKK = 'DKK', // Danish Krone
  PLN = 'PLN', // Polish Zloty
  CZK = 'CZK', // Czech Koruna
  HUF = 'HUF', // Hungarian Forint

  // Asian currencies
  CNY = 'CNY', // Chinese Yuan
  HKD = 'HKD', // Hong Kong Dollar
  KRW = 'KRW', // South Korean Won
  INR = 'INR', // Indian Rupee
  SGD = 'SGD', // Singapore Dollar
  MYR = 'MYR', // Malaysian Ringgit
  IDR = 'IDR', // Indonesian Rupiah
  THB = 'THB', // Thai Baht

  // Cryptocurrencies
  BTC = 'BTC', // Bitcoin
  ETH = 'ETH', // Ethereum
  USDT = 'USDT', // Tether
  USDC = 'USDC', // Coinbase
  BNB = 'BNB', // Binance Coin
  XRP = 'XRP', // Ripple
  DOGE = 'DOGE', // Dogecoin
  SOL = 'SOL', // Solana
  ADA = 'ADA', // Cardano
  DOT = 'DOT', // Polkadot

  // Other currencies
  RUB = 'RUB', // Russian Ruble
  ZAR = 'ZAR', // South African Rand
  TRY = 'TRY', // Turkish Lira
  SAR = 'SAR', // Saudi Riyal
  AED = 'AED', // United Arab Emirates Dirham
}

export enum PaymentMethod {
  CASH = 'CASH',
  BANK = 'BANK',
  CRYPTO = 'CRYPTO',
}

export enum Network {
  // Popular blockchain networks
  ETHEREUM = 'ETHEREUM', // Ethereum main network
  BINANCE_SMART_CHAIN = 'BINANCE_SMART_CHAIN', // Binance Smart Chain (BSC)
  BITCOIN = 'BITCOIN', // Bitcoin main network
  POLYGON = 'POLYGON', // Polygon (formerly Matic)
  AVALANCHE = 'AVALANCHE', // Avalanche C-Chain
  SOLANA = 'SOLANA', // Solana network
  TRON = 'TRON', // TRON network
  CARDANO = 'CARDANO', // Cardano network
  DOGECOIN = 'DOGECOIN', // Dogecoin main network
  LITECOIN = 'LITECOIN', // Litecoin network
  ARBITRUM = 'ARBITRUM', // Arbitrum Layer 2 (Ethereum)
  OPTIMISM = 'OPTIMISM', // Optimism Layer 2 (Ethereum)
  FANTOM = 'FANTOM', // Fantom Opera network
  COSMOS = 'COSMOS', // Cosmos Hub
  XRP = 'XRP', // Ripple main network
  POLKADOT = 'POLKADOT', // Polkadot network
}
