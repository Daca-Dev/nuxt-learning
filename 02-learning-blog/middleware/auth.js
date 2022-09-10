export default function (context) {
  console.log('[MIDDLEWARE] Just Auth');
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/admin/auth');
  }
}
