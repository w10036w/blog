performance = require('perf_hooks').performance;

// customized
// refer to
// http://fengwc.cn/article/Promise.all%E5%89%8D%E7%AB%AFhttp%E8%AF%B7%E6%B1%82%E5%B9%B6%E5%8F%91%E6%8E%A7%E5%88%B6/
async function asyncPool0(jobs, limit, handler, callback) {
  const queue = [...jobs]
  const res = {}
  const pool = []
  const worker = (job, n) => handler(job).then(data => {
    console.log(`worker ${n} has done job ${job}`)
    res[job]=data
    if (queue.length===0) return
    return worker(queue.pop(), n) // or shift
  })
  for (let i=0; i<limit; i++) {
    pool.push(worker(queue.pop(), i+1))
  }
  return Promise.all(pool).then(_ => callback(res))
}
// tiny-async-pool es7
async function asyncPool1(jobs, limit, handler, callback) {
  const res = []
  const executing = [];
  for (const job of jobs) {
    const p=Promise.resolve().then(() => handler(job)) // can print log here
    res.push(p);
    const e = p.then(_ => executing.splice(executing.indexOf(e), 1));
    executing.push(e);
    if (executing.length >= limit) await Promise.race(executing)
  }
  return Promise.all(res).then(_ => callback(res));
  // return Promise.allSettled(res).then(_ => callback(res));
}

;(async () => {
  let jobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  let limit=10
  let callback = console.log
  let handler = 
    job => new Promise(resolve => {
      setTimeout(() => resolve(job), Math.random()*2000)
    })

  const start=performance.now()
  const res = await asyncPool1(jobs, limit, handler, callback)
  const t= parseInt(performance.now()-start)
  console.log('time: '+t+'ms')

})()