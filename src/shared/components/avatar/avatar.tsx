type AvatarProps = {
   isOnline?: boolean;
   fullname?: string;
   src?: string;
   size?: number;
};

export function Avatar({ src, isOnline, fullname = "User", size = 40 }: AvatarProps) {
   const initials = fullname?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

   return (
      <div className="relative inline-block rounded-full">
         {src ? (
            <img //
               src={src}
               alt={fullname}
               style={{ width: size, height: size }}
               className="rounded-lg"
            />
         ) : (
            <div style={{ width: size, height: size }} className="flex items-center justify-center rounded-full bg-gray-300 text-sm font-semibold">
               {initials}
            </div>
         )}

         {isOnline && (
            <span //
               className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
            />
         )}
      </div>
   );
}
