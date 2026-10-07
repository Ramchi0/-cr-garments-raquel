import { Globe, Mail, MapPin, Phone } from 'lucide-react'

const ContactInfo = ({ profile }) => {
  const contacts = [
    {
      icon: Phone,
      label: 'Mobile',
      value: profile.mobile,
      href: `tel:${profile.mobile.replace(/\s+/g, '').replace('+', '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Globe,
      label: 'Website',
      value: profile.website,
      href: profile.website.startsWith('http') ? profile.website : `https://${profile.website}`,
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
        {contacts.map(({ icon: Icon, label, value, href, external }) => {
          const content = (
            <>
              <span className="contact-icon">
                <Icon size={18} strokeWidth={1.9} />
              </span>
              <span className="contact-meta">
                <span className="contact-label">{label}</span>
                <span className="contact-value">{value}</span>
              </span>
            </>
          )

          if (!href) {
            return (
              <li className="contact-item" key={label}>
                {content}
              </li>
            )
          }

          return (
            <li className="contact-item" key={label}>
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="contact-link"
              >
                {content}
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ContactInfo
