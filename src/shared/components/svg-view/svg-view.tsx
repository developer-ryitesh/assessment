type Props = {
   src: string;
   size: number;
   // color?: string;
   className?: string;
};
export function SvgView({ src, size = 16, className = "" }: Props) {
   return (
      <div
         className={className}
         style={{
            width: size + "px",
            height: size + "px",
            //backgroundColor: color,
            WebkitMask: `url(${src}) no-repeat center`,
            WebkitMaskSize: "contain",
            mask: `url(${src}) no-repeat center`,
            maskSize: "contain",
         }}
      />
   );
}
