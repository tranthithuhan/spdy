const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("ok");
});

let messageId = 0;

router.get('/pushy', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');

    setInterval(function(){
    var msg = JSON.stringify({'msg': messageId});
    var resourcePath = '/resource/'+messageId;
    res.push(resourcePath, {}, function(err, stream) { stream.end(msg) });

    // notify client that resource is available in cache
    res.write('data:'+resourcePath+'\n\n');
    messageId+=1;
}, 2000);

    // var stream = res.push('/main.js', {
    //     status: 200,
    //     method: 'GET',
    //     request: {
    //         accept: '*/*'
    //     }
    // });
    //
    // stream.on('error', function () {
    //
    // });
    //
    // stream.end('Hello');
    //
    // res.end('<script src="/main.js">aaa</script>');
    // res.end('Hello World! <script src="/main.js"></script>');
});

module.exports = router;
