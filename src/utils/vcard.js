const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

const isAndroid = /Android/i.test(navigator.userAgent)

export const generateContactVCard = (profile = {}) => {
  const fullName = profile.name || 'Raquel Sainz Flores'
  const parts = fullName.trim().split(/\s+/)
  const firstName = parts.slice(0, -1).join(' ') || fullName
  const lastName = parts.slice(-1)[0] || ''
  const phone = (profile.mobile || '+34 636481091').replace(/\s+/g, '')
  const website = profile.websiteUrl || profile.website || 'https://www.crgarments.com'
  const location = profile.location || 'Spain'

  const fields = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${fullName}`,
    `ORG:${profile.company || 'C.R. Garments'}`,
    `TITLE:${profile.designation || 'International Business Development Director'}`,
    `TEL;TYPE=CELL,VOICE:${phone}`,
    `EMAIL;TYPE=INTERNET:${profile.email || 'Raquelsainz@crgarments.com'}`,
    `URL;TYPE=WORK:${website}`,
    `ADR;TYPE=WORK:;;;${location};;;`,
    'END:VCARD',
  ]

  return fields.join('\r\n') + '\r\n'
}

export const buildVCard = (profile) => generateContactVCard(profile)

export const openVCard = (profile) => {
  const vCard = generateContactVCard(profile)
  const blob = new Blob([vCard], {
    type: 'text/vcard;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const filename = 'Raquel-Sainz-Flores-C-R-Garments.vcf'

  if (isIOS || isAndroid) {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.style.display = 'none'
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

    return
  }

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  link.rel = 'noopener noreferrer'
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
