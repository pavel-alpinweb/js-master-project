console.log('I am module');

async function start() {
  return await Promise.resolve('async working !');
}

start().then(console.log);
