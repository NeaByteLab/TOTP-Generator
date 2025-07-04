const { generateSecretKey, generateOtpUrl, generateQrCode, verifyToken } = require('./src/index')
const readlineSync = require('readline-sync')
const qrcodeTerminal = require('qrcode-terminal')

/**
 * Generate OTP Data
 * Params: AppName, UserEmail, SecretKey
 */
async function generateOtpData(appName, userEmail, secretKey) {
  const otpAuthUrl = generateOtpUrl(appName, userEmail, secretKey)
  const otpQrCode = await generateQrCode(otpAuthUrl)
  return { otpAuthUrl, otpQrCode }
}

/**
 * Verify User OTP
 * Params: SecretKey, MaxAttempts
 */
function verifyUserOtp(secretKey, maxAttempts = 3) {
  let attemptCount = 0
  while (attemptCount < maxAttempts) {
    const userInputOtp = readlineSync.question('Enter OTP: ').trim()
    if (verifyToken(secretKey, userInputOtp)) {
      console.log(' -> OTP Valid')
      return
    } else {
      console.log(' -> OTP Invalid')
      attemptCount++
    }
  }
  console.log(' -> Max Attempts Reached')
}

/**
 * Main Execute Function
 */
async function mainExecute() {
  const appName = 'MyApp'
  const userEmail = 'user@example.com'
  const secretKey = generateSecretKey()
  const { otpAuthUrl } = await generateOtpData(appName, userEmail, secretKey)
  qrcodeTerminal.generate(otpAuthUrl, { small: true })
  verifyUserOtp(secretKey)
}
mainExecute()