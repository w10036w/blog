performance = require('perf_hooks').performance;

(async () => {
// http://fengwc.cn/article/Promise.all%E5%89%8D%E7%AB%AFhttp%E8%AF%B7%E6%B1%82%E5%B9%B6%E5%8F%91%E6%8E%A7%E5%88%B6/
  async function asyncPool(jobs, limit, callback) {
    const res = {}
    const pool = []
    const handler = 
      job => new Promise(resolve => {
        setTimeout(() => resolve(job), Math.random()*2000)
      })
    const asyncWorker = (job, worker) => handler(job).then(data => {
      console.log(`worker ${worker} has done job ${job}`)
      res[job]=data
      if (jobs.length===0) return
      return asyncWorker(jobs.pop(), worker)
    })
    for (let i=0; i<limit; i++) {
      pool.push(asyncWorker(jobs.pop(), i+1))
    }
    return Promise.all(pool).then(_ => callback(res))
  }

  let jobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  let limit=3
  let callback = console.log

  const start=performance.now()

  const res = await asyncPool(jobs, limit, callback)

  const t= parseInt(performance.now()-start)
  // console.log(res)
  console.log('time: '+t+'ms')

})()