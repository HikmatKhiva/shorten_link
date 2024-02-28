export function requestTime(req, res, next) {
  req.requestTime = Date.now();
  next();
}
export function logger(req, res, next) {
  let data = new Date(req.requestTime).toLocaleString();
  console.log(`Req.time: ${data}`);
  next();
}
