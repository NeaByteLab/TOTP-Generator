const crypto = require('crypto')
const qrcode = require('qrcode')
const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

/**
 * Base32 Decode
 * Params: EncodedStr
 */
function base32Decode(encodedStr) {
  let bits = ''
  let decoded = []
  for (let char of encodedStr) {
    const val = base32Chars.indexOf(char)
    bits += val.toString(2).padStart(5, '0')
  }
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    decoded.push(parseInt(bits.substring(i, i + 8), 2))
  }
  return Buffer.from(decoded)
}

/**
 * Generate Secret Key
 * Params: Length
 */
function generateSecretKey(length = 20) {
  const buffer = crypto.randomBytes(length)
  let bits = ''
  let secretKey = ''
  for (let byte of buffer) {
    bits += byte.toString(2).padStart(8, '0')
  }
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.substring(i, i + 5).padEnd(5, '0')
    secretKey += base32Chars[parseInt(chunk, 2)]
  }
  return secretKey
}

/**
 * Generate OTP Auth URL
 * Params: AppName, UserEmail, SecretKey
 */
function generateOtpUrl(appName, userEmail, secretKey) {
  return `otpauth://totp/${encodeURIComponent(appName)}:${encodeURIComponent(userEmail)}?secret=${secretKey}&issuer=${encodeURIComponent(appName)}`
}

/**
 * Generate QRCode URL
 * Params: OtpUrl
 */
async function generateQrCode(otpUrl) {
  return await qrcode.toDataURL(otpUrl)
}

/**
 * Generate TOTP Token
 * Params: SecretKey
 */
function generateToken(secretKey) {
  const epoch = Math.floor(Date.now() / 1000)
  const timeStep = Math.floor(epoch / 30)
  const timeBuffer = Buffer.alloc(8)
  timeBuffer.writeUInt32BE(0, 0)
  timeBuffer.writeUInt32BE(timeStep, 4)
  const hmac = crypto.createHmac('sha1', base32Decode(secretKey))
  const hash = hmac.update(timeBuffer).digest()
  const offset = hash[hash.length - 1] & 0xf
  const tokenBinary = ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff)
  return (tokenBinary % 1000000).toString().padStart(6, '0')
}

/**
 * Verify User Token
 * Params: SecretKey, UserToken
 */
function verifyToken(secretKey, userToken) {
  const generatedToken = generateToken(secretKey)
  return userToken === generatedToken
}

/**
 * Exported Functions
 */
module.exports = {
  generateSecretKey,
  generateOtpUrl,
  generateQrCode,
  generateToken,
  verifyToken
}