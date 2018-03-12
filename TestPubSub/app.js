const IPFS = require('ipfs');

const node = new IPFS({
  EXPERIMENTAL: {
    pubsub: true
  }
});

const topic = 'Alice-e\'-la-piu\'-bella';
const msg = new Buffer ('Non esiste donna piu\' bella di lei');
var id;


/* Core of the script */
node.on('ready', () => {
  console.log('Node is ready to go!');
  try {
    savingTheId(id);
    subscribe (topic);
    publish (topic, msg);
    publish (topic, new Buffer('Hello everybody!'));
    listThePeers(topic);
  }
  catch (error) {
    console.log('Error detected: ' + error);
  }
});

/** Subscribing to a topic **/
function subscribe (topic) {
  const receiveMsg = (msg) => {
    console.log('Recieved a message from ' + msg.from + ': ' + msg.data.toString());
  }

  const callback = (err) => {
    if (err) {
      throw err;
    }
    console.log ('Correctly subscribed!');
  }

  // sending the request
  node.pubsub.subscribe(topic, receiveMsg, callback);
}

function savingTheId (id) {
  node.id( (error, identity) => {
    if (error) {
      throw error;
    }
    id = identity;
  })
}

function publish (topic, msg) {
  node.pubsub.publish (topic, msg, (error) => {
    if (error) {
      throw error;
    }
    console.log ('Correctly published on ' + topic + ': ' + msg.toString());
  })
}

function listThePeers(topic) {
  node.pubsub.peers(topic, (err, peerIds) => {
    if (err) {
      throw err;
    }
    console.log (peerIds);
  })
}
