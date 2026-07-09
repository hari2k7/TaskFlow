export default function reqTime(req, res, next){
    console.log(`Request received at ${new Date().toISOString()}`)
    next()
}