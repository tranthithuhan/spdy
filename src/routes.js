const express = require("express");
const router = express.Router();

const {HighLevelProducer, KafkaClient, Consumer} = require('kafka-node');

let kafkaUri = process.env["KAFKA_URI"] ? process.env["KAFKA_URI"] : 'kafka.kafka:9092';

let messageId = 0;

router.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    let producer = new HighLevelProducer(new KafkaClient({kafkaHost: kafkaUri}));
    producer.on('ready', () => {
        console.log("Connected successfully to Kafka server");
    });

    this.consumer = new Consumer(
        new KafkaClient({kafkaHost: kafkaUri}),
        [ { topic: 'server.events', partition: 0 } ]
    );
    this.consumer.on('ready', () => {
        console.log("Connected successfully to Kafka server");
    });

this.consumer.on('message', function (message) {
    // grab the main content from the Kafka message
    var data = JSON.parse(message.value);
    console.log("event received", data);
});

let message = JSON.stringify({
    type: "USER_STATUS",
    payload: {
        status: "ONLINE"
    }
});


    setInterval(function(){
    var msg = JSON.stringify({'msg': messageId});
    var resourcePath = '/resource/'+messageId;
    res.push(resourcePath, {}, function(err, stream) { stream.end(msg) });

        producer.send([{
            topic: "server.events",
            messages: message
        }], (err) => err !== null ? "error" : console.log("send event", message))
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
