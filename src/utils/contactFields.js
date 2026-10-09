const getValue = (entry, keys) => {
  if (typeof entry === 'string') return entry
  if (!entry || typeof entry !== 'object') return ''
  for (const key of keys) {
    if (entry[key]) return String(entry[key])
  }
  return ''
}

export const getProfilePhones = (profile = {}) => {
  const entries = [
    ...(profile.mobile ? [{ type: 'CELL', value: profile.mobile }] : []),
    ...(profile.whatsapp ? [{ type: 'WHATSAPP', value: profile.whatsapp }] : []),
    ...(Array.isArray(profile.phones) ? profile.phones : []),
  ]

  const seen = new Set()
  return entries
    .map((entry) => ({
      type: typeof entry === 'object' && entry ? entry.type || 'CELL' : 'CELL',
      value: getValue(entry, ['value', 'number', 'phone', 'mobile', 'whatsapp']),
    }))
    .filter((phone) => {
      if (!phone.value.trim()) return false
      const key = `${String(phone.type).toUpperCase()}:${phone.value.replace(/\s+/g, '')}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
}

export const getProfileEmails = (profile = {}) => {
  const entries = [profile.email, ...(Array.isArray(profile.emails) ? profile.emails : [])]

  const seen = new Set()
  return entries
    .map((entry) => ({
      type: typeof entry === 'object' && entry ? entry.type || 'INTERNET' : 'INTERNET',
      value: getValue(entry, ['value', 'address', 'email']),
    }))
    .filter((email) => {
      if (!email.value.trim()) return false
      const key = `${String(email.type).toUpperCase()}:${email.value.toLowerCase()}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
}

export const getPhoneLabel = (type) => {
  switch (String(type || 'CELL').toUpperCase()) {
    case 'WHATSAPP':
      return 'WhatsApp'
    case 'WORK':
      return 'Work'
    case 'HOME':
      return 'Home'
    case 'CELL':
    case 'MOBILE':
    default:
      return 'Mobile'
  }
}
