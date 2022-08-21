export default function (context) {
  console.log('[MIDDLEWARE] this message is showing in the middleware file `log.js`');
}

// this option is used when you execute a async code
// export default function (context) {
//   return Promise(...)
// }
