import { socialLinks } from '../data/socialLinks'
import LinkCard from './LinkCard'

export default function SocialLinksCard() {
  return (
    <div className="flex justify-center gap-4 flex-wrap mt-8">
      {socialLinks.map((social) => (
        <LinkCard key={social.name} icon={social.icon} url={social.url} name={social.name} />
      ))}
    </div>
  )
}
