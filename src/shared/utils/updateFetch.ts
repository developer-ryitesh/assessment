export async function updateFetch<U, F>(updateCall: () => Promise<{ data: U }>, fetchCall: () => Promise<{ data: F }>) {
   const { data: update } = await updateCall(); // first update
   const { data: fetch } = await fetchCall(); // then fetch

   return {
      ...update,
      data: (fetch as any)?.data ?? fetch,
   };
}
