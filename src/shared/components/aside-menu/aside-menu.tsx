import { useEffect, useImperativeHandle, useState, type ComponentType, type CSSProperties, type Dispatch, type ReactNode, type Ref, type SetStateAction } from "react";

type Props = {
   children: ReactNode;
   AsideComponent: ComponentType<{ isToggle?: boolean }>;
   position?: "left" | "right";
   width?: string;
   isOpen?: boolean;
   mode?: "push" | "overlay";
   collapsibleWidth?: string;
   style?: CSSProperties;
   ref?: Ref<AsideMenuRefType>;
};

export type AsideMenuRefType = {
   setToggle: Dispatch<SetStateAction<boolean>>;
};

export function AsideMenu({ children, position = "left", AsideComponent, width = "220px", isOpen = false, mode = "push", collapsibleWidth = "0px", style, ref }: Props) {
   const [toggle, setToggle] = useState(isOpen);

   useImperativeHandle(ref, () => ({ setToggle }), [setToggle]);

   useEffect(() => {
      setToggle(isOpen);
   }, [isOpen]);

   const isLeft = position === "left";
   const translateClosed = isLeft ? "translateX(-100%)" : "translateX(100%)";

   const asideStyle: CSSProperties = {
      width: toggle ? width : collapsibleWidth,
      position: "fixed",
      top: 0,
      bottom: 0,
      [position]: 0,
      transform: mode === "overlay" ? (toggle ? "translateX(0)" : translateClosed) : "translateX(0)",
      transition: "all 250ms ease",
      ...style,
   };

   const mainStyle: CSSProperties = {
      transition: "margin 250ms ease",
      ...(mode === "push" && {
         [isLeft ? "marginLeft" : "marginRight"]: toggle ? width : collapsibleWidth,
      }),
   };

   if (mode === "overlay") {
      return (
         <>
            {toggle && <div onClick={() => setToggle(false)} className="fixed inset-0 z-40 bg-black/30" />}

            {toggle && (
               <aside
                  style={{
                     width,
                     position: "fixed",
                     top: 0,
                     bottom: 0,
                     [position]: 0,
                     transform: toggle ? "translateX(0)" : translateClosed,
                     transition: "transform 250ms ease",
                     pointerEvents: toggle ? "auto" : "none",
                  }}
                  className="z-50 bg-white shadow-lg">
                  <AsideComponent isToggle={toggle} />
               </aside>
            )}
            {children}
         </>
      );
   }

   return (
      <>
         <aside style={asideStyle} className="z-40 overflow-hidden border-r border-gray-200 bg-white">
            <AsideComponent isToggle={toggle} />
         </aside>

         <main className="flex h-screen flex-col md:h-full" style={mainStyle}>
            {children}
         </main>
      </>
   );
}
