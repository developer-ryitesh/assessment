import { useEffect, useRef } from "react";

export function AutoScroll({ trigger }: { trigger: any }) {
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const el = ref.current?.parentElement;

      if (!el) return;

      const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;

      if (isNearBottom) {
         ref.current?.scrollIntoView({ behavior: "smooth" });
      }
   }, [JSON.stringify(trigger)]);

   return <div ref={ref} />;
}
