import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
const es = initEdgeStore.create();
/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket({
      maxSize: 1024 * 1024 * 5, // 5MB
    })
    .beforeDelete(({ ctx, fileInfo }) => {
      //("beforeDelete", ctx, fileInfo);
      return true;
    }),
});
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});
export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
