import Image from 'next/image'

interface AvatarProps{
  src: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
  const imgPlaceholder = "/images/placeholder.jpg"
  
  return (
      <Image
      className="rounded-full object-cover h-full w-full"
      height={50}
      width={50}
      alt="logged in user avatar"
      src={src || imgPlaceholder}
      />
  )
}

export default Avatar