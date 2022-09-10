export default function (context) {
  console.log('[MIDDLEWARE] Check Auth');
  if (process.client) {
    context.store.dispatch("initAuth", context.req);
  }
}
