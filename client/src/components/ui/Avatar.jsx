import { forwardRef } from "react";

const Avatar = forwardRef(({ className = "h-9 w-9", ...props }, ref) => {
  const avatarSrc = "/images/avatar.png";

  return (
    <img
      ref={ref}
      className={`rounded-full border border-border object-cover  ${className}`}
      src={avatarSrc}
      alt="profile image"
      {...props}
    />
  );
});

Avatar.displayName = "Avatar";

export default Avatar;
