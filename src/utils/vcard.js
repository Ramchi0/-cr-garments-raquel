import { getProfileEmails, getProfilePhones } from './contactFields.js'

export const isIOSDevice = () =>
  typeof navigator !== 'undefined' &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))

const escapeText = (value = '') =>
  String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')

const foldLine = (line) => {
  const encoder = new TextEncoder()
  const physicalLines = []
  let currentLine = ''
  let byteLength = 0

  for (const character of line) {
    const characterLength = encoder.encode(character).length
    if (byteLength + characterLength > 75) {
      physicalLines.push(currentLine)
      currentLine = ` ${character}`
      byteLength = characterLength + 1
    } else {
      currentLine += character
      byteLength += characterLength
    }
  }

  physicalLines.push(currentLine)
  return physicalLines.join('\r\n')
}

const escapeFilenamePart = (value) =>
  String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const getPhoneType = (type) => {
  switch (String(type || 'CELL').toUpperCase()) {
    case 'WHATSAPP':
      return 'CELL,VOICE,X-WHATSAPP'
    case 'WORK':
      return 'WORK,VOICE'
    case 'HOME':
      return 'HOME,VOICE'
    case 'CELL':
    case 'MOBILE':
    default:
      return 'CELL,VOICE'
  }
}

const getEmailType = (type) => {
  switch (String(type || 'INTERNET').toUpperCase()) {
    case 'HOME':
      return 'HOME,INTERNET'
    case 'WORK':
      return 'WORK,INTERNET'
    case 'INTERNET':
    default:
      return 'INTERNET'
  }
}

const getAddressComponents = (profile) => {
  const address = profile.address
  if (address && typeof address === 'object' && !Array.isArray(address)) {
    return [
      address.poBox,
      address.extended,
      address.street,
      address.locality,
      address.region,
      address.postalCode,
      address.country,
    ].map(escapeText)
  }

  if (typeof address === 'string' && address.trim()) {
    return ['', '', escapeText(address), '', '', '', escapeText(profile.location || '')]
  }

  return ['', '', '', escapeText(profile.location || ''), '', '', '']
}

export const generateContactVCard = (profile = {}) => {
  const fullName = String(profile.name || '').trim()
  const nameParts = fullName.split(/\s+/).filter(Boolean)
  const firstName = nameParts.slice(0, -1).join(' ')
  const lastName = nameParts.slice(-1)[0] || ''
  const fields = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeText(lastName)};${escapeText(firstName)};;;`,
    `FN:${escapeText(fullName)}`,
  ]

  if (profile.company) fields.push(`ORG:${escapeText(profile.company)}`)
  if (profile.designation) fields.push(`TITLE:${escapeText(profile.designation)}`)

  for (const phone of getProfilePhones(profile)) {
    const value = String(phone.value).replace(/\s+/g, '')
    fields.push(`TEL;TYPE=${getPhoneType(phone.type)}:${value}`)
  }

  for (const email of getProfileEmails(profile)) {
    fields.push(`EMAIL;TYPE=${getEmailType(email.type)}:${escapeText(email.value)}`)
  }

  const website = profile.websiteUrl || profile.website
  if (website) fields.push(`URL;TYPE=WORK:${escapeText(website)}`)

  if (profile.address || profile.location) {
    fields.push(`ADR;TYPE=WORK:${getAddressComponents(profile).join(';')}`)
  }

  fields.push('END:VCARD')
  return fields.map(foldLine).join('\r\n') + '\r\n'
}

export const buildVCard = (profile) => generateContactVCard(profile)

export const openVCard = (profile) => {
  const vCard = generateContactVCard(profile)
  const blob = new Blob([vCard], {
    type: 'text/vcard;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const name = escapeFilenamePart(profile.name) || 'contact'
  const company = escapeFilenamePart(profile.company)
  const filename = `${name}${company ? `-${company}` : ''}.vcf`
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  if (!isIOSDevice()) link.rel = 'noopener noreferrer'
  document.body.appendChild(link)

  try {
    link.click()
  } catch (error) {
    window.location.href = url
  } finally {
    setTimeout(() => {
      if (link.parentNode) {
        link.parentNode.removeChild(link)
      }
      URL.revokeObjectURL(url)
    }, 1500)
  }
}
