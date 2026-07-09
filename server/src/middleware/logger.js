export default function logger(req, res, next) {
    res.on("finish", () => {
        console.log(
            `${req.method} ${req.url} ${res.statusCode} ${new Date().toISOString()}
Status: ${res.statusCode}`
        );
    });

    next();
}
