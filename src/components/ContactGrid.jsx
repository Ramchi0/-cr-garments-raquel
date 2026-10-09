import { useRef, useState } from 'react'
import { Globe2, Mail, MapPin, Phone, UserPlus } from 'lucide-react'
import ContactItem from './ContactItem'
import { isIOSDevice, openVCard } from '../utils/vcard'
import { getPhoneLabel, getProfileEmails, getProfilePhones } from '../utils/contactFields'

const ContactGrid = ({ profile }) => {
  const savePending = useRef(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const phones = getProfilePhones(profile)
  const emails = getProfileEmails(profile)
  const address =
    typeof profile.address === 'string'
      ? profile.address
      : profile.address && typeof profile.address === 'object'
        ? [
            profile.address.street,
            profile.address.locality,
            profile.address.region,
            profile.address.postalCode,
            profile.address.country,
          ]
            .filter(Boolean)
            .join(', ')
        : ''
  const contacts = [
    ...phones.map((phone) => ({
      icon: Phone,
      label: getPhoneLabel(phone.type),
      value: phone.value,
      href: `tel:${phone.value.replace(/[^\d+]/g, '')}`,
    })),
    ...emails.map((email) => ({
      icon: Mail,
      label: String(email.type).toUpperCase() === 'WORK' ? 'Work Email' : 'Email',
      value: email.value,
      href: `mailto:${email.value}`,
    })),
    ...(profile.website || profile.websiteUrl
      ? [
          {
            icon: Globe2,
            label: 'Website',
            value: profile.website || profile.websiteUrl,
            href: profile.websiteUrl || `https://${profile.website.replace(/^https?:\/\//, '')}`,
            external: true,
          },
        ]
      : []),
    ...(address
      ? [
          {
            icon: MapPin,
            label: 'Address',
            value: address,
          },
        ]
      : []),
    ...(profile.location
      ? [
          {
            icon: MapPin,
            label: 'Location',
            value: profile.location,
          },
        ]
      : []),
  ]

  const handleSaveContact = () => {
    if (savePending.current) return

    savePending.current = true
    setIsSaving(true)
    setSaveError('')
    try {
      openVCard(profile)
      window.setTimeout(() => {
        savePending.current = false
        setIsSaving(false)
      }, 1600)
    } catch (error) {
      console.error('Unable to create the contact card.', error)
      savePending.current = false
      setIsSaving(false)
      setSaveError('No se pudo preparar la tarjeta de contacto. Inténtalo de nuevo.')
    }
  }

  return (
    <section className="contact-panel" aria-label="Contact information">
      <button
        type="button"
        className="save-contact-inline"
        onClick={handleSaveContact}
        disabled={isSaving}
      >
        <UserPlus size={16} strokeWidth={2.2} aria-hidden="true" />
        <span>Save Contact</span>
      </button>
      {isIOSDevice() ? (
        <p className="ios-contact-guidance">
          En la vista previa, elige Create New Contact o Add to Existing Contact. Completa el
          formulario de contactos y pulsa Done para guardar.
        </p>
      ) : null}
      {saveError ? (
        <p className="contact-save-error" role="alert">
          {saveError}
        </p>
      ) : null}

      <ul className="contact-list">
        {contacts.map((contact) => (
          <ContactItem key={`${contact.label}-${contact.value}`} {...contact} />
        ))}
      </ul>
    </section>
  )
}

export default ContactGrid
