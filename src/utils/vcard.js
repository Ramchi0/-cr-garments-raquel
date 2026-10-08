export const buildVCard = (profile) => {
  const fullName = profile.name || ''
  const parts = fullName.trim().split(/\s+/)
  const firstName = parts.slice(0, -1).join(' ') || fullName
  const lastName = parts.slice(-1)[0] || ''

  const vCard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${fullName}`,
    `N:${lastName};${firstName};;;`,
    `ORG:${profile.company}`,
    `TITLE:${profile.designation}`,
    `TEL;TYPE=CELL:${profile.mobile.replace(/\s+/g, '')}`,
    `EMAIL;TYPE=INTERNET:${profile.email}`,
    `URL:${profile.websiteUrl || profile.website}`,
    `ADR;TYPE=WORK:;;;${profile.location || ''};;;`,
    'END:VCARD',
  ].join('\r\n')

  return vCard
}

export const openVCard = (profile) => {
  const vCard = buildVCard(profile)

  const blob = new Blob([vCard], {
    type: 'text/vcard;charset=utf-8',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = 'Raquel-Sainz-Flores.vcf'
  link.style.display = 'none'
  link.rel = 'noopener noreferrer'

  document.body.appendChild(link)

  try {
    const popup = window.open(url, '_blank', 'noopener,noreferrer')
    if (popup) {
      popup.opener = null
      return
    }

    link.click()
  } catch (error) {
    link.click()
  } finally {
    setTimeout(() => {
      if (link.parentNode) {
        link.parentNode.removeChild(link)
      }
      URL.revokeObjectURL(url)
    }, 1500)
  }
}
