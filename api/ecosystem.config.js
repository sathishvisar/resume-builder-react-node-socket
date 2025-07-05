module.exports = {
  apps: [{
    name: 'api',
    script: 'dist/index.js',   // compiled JS
    exec_mode: 'cluster',
    instances: 'max',
    env: { PORT: 4000 }
  }]
};






// // ecosystem.config.js
// module.exports = {
//   apps: [{
//     name: 'api',
//     script: 'src/index.ts',
//     exec_mode: 'cluster',
//     instances: 'max',
//     interpreter: './node_modules/.bin/ts-node',
//     watch: false,
//     env: {
//       PORT: 4000,
//       NODE_ENV: 'development'
//     }
//   }]
// };