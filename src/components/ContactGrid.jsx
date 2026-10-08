import { Globe2, Mail, MapPin, Phone, UserPlus } from 'lucide-react'
import ContactItem from './ContactItem'
import { openVCard } from '../utils/vcard'

const ContactGrid = ({ profile }) => {
  const contacts = [
    {
      icon: Phone,
      label: 'Mobile',
      value: profile.mobile,
      href: `tel:+${profile.mobile.replace(/\D/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Globe2,
      label: 'Website',
      value: profile.website,
      href: profile.websiteUrl || `https://${profile.website.replace(/^https?:\/\//, '')}`,
      external: true,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile.location,
    },
  ]

  const handleSaveContact = () => {
    openVCard(profile)
  }

  return (
    <section className="contact-panel" aria-label="Contact information">
      <button type="button" className="save-contact-inline" onClick={handleSaveContact}>
        <UserPlus size={16} strokeWidth={2.2} aria-hidden="true" />
        <span>Save Contact</span>
      </button>

      <ul className="contact-list">
        {contacts.map((contact) => (
          <ContactItem key={contact.label} {...contact} />
        ))}
      </ul>
    </section>
  )
}

export default ContactGrid
