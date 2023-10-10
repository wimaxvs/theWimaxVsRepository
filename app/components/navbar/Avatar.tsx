import Image from 'next/image'

interface AvatarProps{
  src: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
  const imgPlaceholder = "/images/placeholder.jpg"
  
  return (
      <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="logged in user avatar"
      src={src || imgPlaceholder}
      />
  )
}

export default Avatar