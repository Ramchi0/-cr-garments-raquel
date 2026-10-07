import { Globe2, Mail, MapPin, Phone } from 'lucide-react'
import ContactItem from './ContactItem'

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
      href: `https://${profile.website.replace(/^https?:\/\//, '')}`,
      external: true,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile.location,
    },
  ]

  return (
    <section className="contact-panel" aria-label="Contact information">
      <ul className="contact-list">
        {contacts.map((contact) => (
          <ContactItem key={contact.label} {...contact} />
        ))}
      </ul>
    </section>
  )
}

export default ContactGrid
