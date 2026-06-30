// Generado a partir de BankaiPC/omniverse-cryptonite (docs/RPC_API_REFERENCE.en.md),
// que a su vez compila el texto de ayuda real embebido en el código fuente del
// daemon (github.com/pallas1/Cryptonite, MIT). Nada aquí está inventado: firma,
// argumentos, resultado y ejemplos son el texto literal que devuelve `help <cmd>`
// en un nodo real. La única corrección humana documentada es en `balancesat`
// (bug real en el código fuente: bloque Result copiado de otra función,
// numeración de Arguments invertida) — está marcada explícitamente abajo.

export interface ApiCommand {
  name: string;
  native: boolean;
  source: string;
  signature: string;
  descriptionEn: string;
  noteEn?: string;
  detail: string;
}

export interface ApiCategory {
  category: string;
  commands: ApiCommand[];
}

export const API_CATEGORIES: ApiCategory[] = [
  {
    category: `Overall control/query calls`,
    commands: [
      {
        name: `getinfo`,
        native: false,
        source: `\`rpcmisc.cpp\` (function \`getinfo\`)`,
        signature: `getinfo`,
        descriptionEn: `Returns an object containing various state info.`,
        detail: `Result:
{
  "version": xxxxx,           (numeric) the server version
  "protocolversion": xxxxx,   (numeric) the protocol version
  "walletversion": xxxxx,     (numeric) the wallet version
  "balance": xxxxxxx,         (ep) the total cryptonite balance of the wallet
  "blocks": xxxxxx,           (numeric) the current number of blocks processed in the server
  "timeoffset": xxxxx,        (numeric) the time offset
  "connections": xxxxx,       (numeric) the number of connections
  "proxy": "host:port",     (string, optional) the proxy used by the server
  "difficulty": xxxxxx,       (numeric) the current difficulty
  "testnet": true|false,      (boolean) if the server is using testnet or not
  "keypoololdest": xxxxxx,    (numeric) the timestamp (seconds since GMT epoch) of the oldest pre-generated key in the key pool
  "keypoolsize": xxxx,        (numeric) how many new keys are pre-generated
  "unlocked_until": ttt,      (numeric) the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked
  "paytxfee": x.xxxx,         (ep) the transaction fee set in XCN/kb
  "relayfee": x.xxxx,         (ep) minimum relay fee for non-free transactions in XCN/kb
  "errors": "..."           (string) any error messages
}

Examples:
> cryptonite-cli getinfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `help`,
        native: false,
        source: `\`rpcserver.cpp\` (function \`help\`)`,
        signature: `help ( "command" )`,
        descriptionEn: `List all commands, or get help for a specified command.`,
        detail: `Arguments:
1. "command"     (string, optional) The command to get help on

Result:
"text"     (string) The help text`,
      },
      {
        name: `stop`,
        native: false,
        source: `\`rpcserver.cpp\` (function \`stop\`)`,
        signature: `stop`,
        descriptionEn: `Stop Cryptonite server.`,
        detail: ``,
      },
    ],
  },
  {
    category: `P2P networking`,
    commands: [
      {
        name: `addnode`,
        native: false,
        source: `\`rpcnet.cpp\` (function \`addnode\`)`,
        signature: `addnode "node" "add|remove|onetry"`,
        descriptionEn: `Attempts add or remove a node from the addnode list. Or try a connection to a node once.`,
        detail: `Arguments:
1. "node"     (string, required) The node (see getpeerinfo for nodes)
2. "command"  (string, required) 'add' to add a node to the list, 'remove' to remove a node from the list, 'onetry' to try a connection to the node once

Examples:
> cryptonite-cli addnode "192.168.0.6:8333" "onetry"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "addnode", "params": ["192.168.0.6:8333", "onetry"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getaddednodeinfo`,
        native: false,
        source: `\`rpcnet.cpp\` (function \`getaddednodeinfo\`)`,
        signature: `getaddednodeinfo dns ( "node" )`,
        descriptionEn: `Returns information about the given added node, or all added nodes (note that onetry addnodes are not listed here) If dns is false, only a list of added nodes will be provided, otherwise connected information will also be available.`,
        detail: `Arguments:
1. dns        (boolean, required) If false, only a list of added nodes will be provided, otherwise connected information will also be available.
2. "node"   (string, optional) If provided, return information about this specific node, otherwise all nodes are returned.

Result:
[
  {
    "addednode" : "192.168.0.201",   (string) The node ip address
    "connected" : true|false,          (boolean) If connected
    "addresses" : [
       {
         "address" : "192.168.0.201:8333",  (string) The cryptonite server host and port
         "connected" : "outbound"           (string) connection, inbound or outbound
       }
       ,...
     ]
  }
  ,...
]

Examples:
> cryptonite-cli getaddednodeinfo true
> cryptonite-cli getaddednodeinfo true "192.168.0.201"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddednodeinfo", "params": [true, "192.168.0.201"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getconnectioncount`,
        native: false,
        source: `\`rpcnet.cpp\` (function \`getconnectioncount\`)`,
        signature: `getconnectioncount`,
        descriptionEn: `Returns the number of connections to other nodes.`,
        detail: `bResult:
n          (numeric) The connection count

Examples:
> cryptonite-cli getconnectioncount 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getconnectioncount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getnettotals`,
        native: false,
        source: `\`rpcnet.cpp\` (function \`getnettotals\`)`,
        signature: `getnettotals`,
        descriptionEn: `Returns information about network traffic, including bytes in, bytes out, and current time.`,
        detail: `Result:
{
  "totalbytesrecv": n,   (numeric) Total bytes received
  "totalbytessent": n,   (numeric) Total bytes sent
  "timemillis": t        (numeric) Total cpu time
}

Examples:
> cryptonite-cli getnettotals 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnettotals", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getpeerinfo`,
        native: false,
        source: `\`rpcnet.cpp\` (function \`getpeerinfo\`)`,
        signature: `getpeerinfo`,
        descriptionEn: `Returns data about each connected network node as a json array of objects.`,
        detail: `bResult:
[
  {
    "addr":"host:port",      (string) The ip address and port of the peer
    "addrlocal":"ip:port",   (string) local address
    "services":"00000001",   (string) The services
    "lastsend": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last send
    "lastrecv": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last receive
    "bytessent": n,            (numeric) The total bytes sent
    "bytesrecv": n,            (numeric) The total bytes received
    "conntime": ttt,           (numeric) The connection time in seconds since epoch (Jan 1 1970 GMT)
    "pingtime": n,             (numeric) ping time
    "pingwait": n,             (numeric) ping wait
    "version": v,              (numeric) The peer version, such as 7001
    "subver": "/Satoshi:0.8.5/",  (string) The string version
    "inbound": true|false,     (boolean) Inbound (true) or Outbound (false)
    "startingheight": n,       (numeric) The starting height (block) of the peer
    "banscore": n,              (numeric) The ban score (stats.nMisbehavior)
    "syncnode" : true|false     (booleamn) if sync node
  }
  ,...
}

Examples:
> cryptonite-cli getpeerinfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getpeerinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `ping`,
        native: false,
        source: `\`rpcnet.cpp\` (function \`ping\`)`,
        signature: `ping`,
        descriptionEn: `Requests that a ping be sent to all other nodes, to measure ping time. Results provided in getpeerinfo, pingtime and pingwait fields are decimal seconds. Ping command is handled in queue with all other commands, so it measures processing backlog, not just network ping.`,
        detail: `Examples:
> cryptonite-cli ping 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "ping", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
    ],
  },
  {
    category: `Block chain and UTXO`,
    commands: [
      {
        name: `getbestblockhash`,
        native: false,
        source: `\`rpcblockchain.cpp\` (function \`getbestblockhash\`)`,
        signature: `getbestblockhash`,
        descriptionEn: `Returns the hash of the best (tip) block in the longest block chain.`,
        detail: `Result
"hex"      (string) the block hash hex encoded

Examples
> cryptonite-cli getbestblockhash 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbestblockhash", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getblockcount`,
        native: false,
        source: `\`rpcblockchain.cpp\` (function \`getblockcount\`)`,
        signature: `getblockcount`,
        descriptionEn: `Returns the number of blocks in the longest block chain.`,
        detail: `Result:
n    (numeric) The current block count

Examples:
> cryptonite-cli getblockcount 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockcount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getblock`,
        native: false,
        source: `\`rpcblockchain.cpp\` (function \`getblock\`)`,
        signature: `getblock "hash" ( verbose )`,
        descriptionEn: `If verbose is false, returns a string that is serialized, hex-encoded data for block 'hash'. If verbose is true, returns an Object with information about block <hash>.`,
        detail: `Arguments:
1. "hash"          (string, required) The block hash
2. verbose           (boolean, optional, default=true) true for a json object, false for the hex encoded data

Result (for verbose = true):
{
  "hash" : "hash",     (string) the block hash (same as provided)
  "confirmations" : n,   (numeric) The number of confirmations
  "size" : n,            (numeric) The block size
  "height" : n,          (numeric) The block height or index
  "version" : n,         (numeric) The block version
  "merkleroot" : "xxxx", (string) The merkle root
  "accountroot" : "xxxx", (string) The hash of the account trie at this position
  "tx" : [               (array of string) The transaction ids
     "transactionid"     (string) The transaction id
     ,...
  ],
  "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (numeric) The nonce
  "bits" : "1d00ffff", (string) The bits
  "difficulty" : x.xxx,  (numeric) The difficulty
  "previousblockhash" : "hash",  (string) The hash of the previous block
  "nextblockhash" : "hash"       (string) The hash of the next block
}

Result (for verbose=false):
"data"             (string) A string that is serialized, hex-encoded data for block 'hash'.

Examples:
> cryptonite-cli getblock "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblock", "params": ["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getblockhash`,
        native: false,
        source: `\`rpcblockchain.cpp\` (function \`getblockhash\`)`,
        signature: `getblockhash index`,
        descriptionEn: `Returns hash of block in best-block-chain at index provided.`,
        detail: `Arguments:
1. index         (numeric, required) The block index

Result:
"hash"         (string) The block hash

Examples:
> cryptonite-cli getblockhash 1000
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockhash", "params": [1000] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getblockheader`,
        native: false,
        source: `\`rpcblockchain.cpp\` (function \`getblockheader\`)`,
        signature: `getblockheader <hash> [verbose=true]`,
        descriptionEn: `If verbose is false, returns a string that is the serialized, base64-encoded form of a block header. If verbose is true, returns an Object with information contained in block header <hash>.`,
        detail: `Result (for verbose = true):
{
  "hash" : "hash",     (string) the block hash (same as provided)
  "confirmations" : n,   (numeric) The number of confirmations
  "size" : n,            (numeric) The block size
  "height" : n,          (numeric) The block height or index
  "version" : n,         (numeric) The block version
  "merkleroot" : "xxxx", (string) The merkle root
  "accountroot" : "xxxx", (string) The hash of the account trie at this position
  "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (numeric) The nonce
  "bits" : "1d00ffff", (string) The bits
  "difficulty" : x.xxx,  (numeric) The difficulty
  "previousblockhash" : "hash",  (string) The hash of the previous block
  "nextblockhash" : "hash"       (string) The hash of the next block
}

Result (for verbose=false):
"data"             (string) A string that is serialized, hex-encoded data for block 'hash'.

Examples:
> cryptonite-cli getblockheader "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockheader", "params": ["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getdifficulty`,
        native: false,
        source: `\`rpcblockchain.cpp\` (function \`getdifficulty\`)`,
        signature: `getdifficulty`,
        descriptionEn: `Returns the proof-of-work difficulty as a multiple of the minimum difficulty.`,
        detail: `Result:
n.nnn       (numeric) the proof-of-work difficulty as a multiple of the minimum difficulty.

Examples:
> cryptonite-cli getdifficulty 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getdifficulty", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getrawmempool`,
        native: false,
        source: `\`rpcblockchain.cpp\` (function \`getrawmempool\`)`,
        signature: `getrawmempool ( verbose )`,
        descriptionEn: `Returns all transaction ids in memory pool as a json array of string transaction ids.`,
        detail: `Arguments:
1. verbose           (boolean, optional, default=false) true for a json object, false for array of transaction ids

Result: (for verbose = false):
[                     (json array of string)
  "transactionid"     (string) The transaction id
  ,...
]

Result: (for verbose = true):
{                           (json object)
  "transactionid" : {       (json object)
    "size" : n,             (numeric) transaction size in bytes
    "fee" : n,              (ep) transaction fee in XCN
    "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (numeric) block height when transaction entered pool
    "startingpriority" : n, (numeric) priority when transaction entered pool
    "currentpriority" : n,  (numeric) transaction priority now
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (string) parent transaction id
       ... ]
  }, ...
]

Examples
> cryptonite-cli getrawmempool true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawmempool", "params": [true] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `gettxout`,
        native: false,
        source: `\`rpcblockchain.cpp\` (function \`gettxout\`)`,
        signature: `gettxout "txid" n ( includemempool )`,
        descriptionEn: `Returns details about an unspent transaction output.`,
        detail: `Arguments:
1. "txid"       (string, required) The transaction id
2. n              (numeric, required) vout value
3. includemempool  (boolean, optional) Whether to included the mem pool

Result:
{
  "bestblock" : "hash",    (string) the block hash
  "confirmations" : n,       (numeric) The number of confirmations
  "value" : x.xxx,           (ep) The transaction value in XCN
  "pubkey" : "key",        (string)public key hash output pays to
  "version" : n,             (numeric) The version
  "coinbase" : true|false    (boolean) Coinbase or not
}

Examples:

Get unspent transactions
> cryptonite-cli listunspent 

View the details
> cryptonite-cli gettxout "txid" 1

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettxout", "params": ["txid", 1] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `gettxoutsetinfo`,
        native: false,
        source: `\`rpcblockchain.cpp\` (function \`gettxoutsetinfo\`)`,
        signature: `gettxoutsetinfo`,
        descriptionEn: `Returns statistics about the unspent transaction output set. Note this call may take some time.`,
        detail: `Result:
{
  "height":n,                    (numeric) The current block height (index)
  "bestblock": "hex",          (string) the best block hash hex
  "accounts": n,                 (numeric) The number of nonzero accounts
  "total_amount": x.xxx          (ep) The total amount
}

Examples:
> cryptonite-cli gettxoutsetinfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettxoutsetinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `verifychain`,
        native: false,
        source: `\`rpcblockchain.cpp\` (function \`verifychain\`)`,
        signature: `verifychain ( checklevel numblocks )`,
        descriptionEn: `Verifies blockchain database.`,
        detail: `Arguments:
1. checklevel   (numeric, optional, 0-4, default=3) How thorough the block verification is.
2. numblocks    (numeric, optional, default=288, 0=all) The number of blocks to check.

Result:
true|false       (boolean) Verified or not

Examples:
> cryptonite-cli verifychain 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "verifychain", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `balancesat`,
        native: true,
        source: `\`rpcblockchain.cpp\` (function \`balancesat\`)`,
        signature: `balancesat height "address"`,
        descriptionEn: `Returns account-tree (Trie) state for an address as of a particular block height -- a historical snapshot query, not just the current balance.`,
        noteEn: `[CORREGIDO por Claude leyendo la implementacion real en rpcblockchain.cpp:
el bloque "Result" original en el codigo fuente esta mal -- es una copia
pegada de otra funcion (muestra "coinbase"/"version", que esta funcion no
devuelve en absoluto) y la numeracion de "Arguments" esta invertida (decia
"2. height" / "1. address" cuando el orden real de los parametros, segun
"params[0].get_int()" / "params[1].get_str()" en el codigo, es justo al
reves). Lo de abajo es lo que la funcion realmente devuelve.]`,
        detail: `Arguments:
1. height          (numeric, required) block height to query
2. "address"       (string, required) the Cryptonite address to inspect

Result:
{
  "balance" : x.xxx,      (numeric) balance of the address at this height
  "age" : n,               (numeric) blocks since the account was last modified
                            (used to age out withdrawal-limit changes -- see
                            "Withdrawal Limits" in the mini-blockchain paper)
  "limit" : x.xxx,         (numeric) current withdrawal limit on this address
  "futurelimit" : x.xxx    (numeric) queued withdrawal limit that will take
                            effect after the configured delay (setlimit)
}

Examples:
> cryptonite-cli balancesat 12345 "XCNaddressExampleHere"
> curl --user myusername --data-binary \\'{"jsonrpc": "1.0", "id":"curltest", "method": "balancesat", "params": [12345, "XCNaddressExampleHere"] }\\' -H \\'content-type: text/plain;\\' http://127.0.0.1:8332/`,
      },
    ],
  },
  {
    category: `Mining`,
    commands: [
      {
        name: `getblocktemplate`,
        native: false,
        source: `\`rpcmining.cpp\` (function \`getblocktemplate\`)`,
        signature: `getblocktemplate ( "jsonrequestobject" )`,
        descriptionEn: `If the request parameters include a 'mode' key, that is used to explicitly select between the default 'template' request or a 'proposal'. It returns data needed to construct a block to work on. See https://en.bitcoin.it/wiki/BIP_0022 for full specification.`,
        detail: `Arguments:
1. "jsonrequestobject"       (string, optional) A json object in the following spec
     {
       "mode":"template"    (string, optional) This must be set to "template" or omitted
       "capabilities":[       (array, optional) A list of strings
           "support"           (string) client side supported feature, 'longpoll', 'coinbasetxn', 'coinbasevalue', 'proposal', 'serverlist', 'workid'
           ,...
         ]
     }


Result:
{
  "version" : n,                    (numeric) The block version
  "previousblockhash" : "xxxx",    (string) The hash of current highest block
  "transactions" : [                (array) contents of non-coinbase transactions that should be included in the next block
      {
         "data" : "xxxx",          (string) transaction data encoded in hexadecimal (byte-for-byte)
         "hash" : "xxxx",          (string) hash/id encoded in little-endian hexadecimal
         "depends" : [              (array) array of numbers 
             n                        (numeric) transactions before this one (by 1-based index in 'transactions' list) that must be present in the final block if this one is
             ,...
         ],
         "fee": n,                   (numeric) difference in value between transaction inputs and outputs (in Satoshis); for coinbase transactions, this is a negative Number of the total collected block fees (ie, not including the block subsidy); if key is not present, fee is unknown and clients MUST NOT assume there isn't one
         "sigops" : n,               (numeric) total number of SigOps, as counted for purposes of block limits; if key is not present, sigop count is unknown and clients MUST NOT assume there aren't any
         "required" : true|false     (boolean) if provided and true, this transaction must be in the final block
      }
      ,...
  ],
  "coinbaseaux" : {                  (json object) data that should be included in the coinbase's scriptSig content
      "flags" : "flags"            (string) 
  },
  "coinbasevalue" : n,               (numeric) maximum allowable input to coinbase transaction, including the generation award and transaction fees (in Satoshis)
  "coinbasetxn" : { ... },           (json object) information for coinbase transaction
  "target" : "xxxx",               (string) The hash target
  "mintime" : xxx,                   (numeric) The minimum timestamp appropriate for next block time in seconds since epoch (Jan 1 1970 GMT)
  "mutable" : [                      (array of string) list of ways the block template may be changed 
     "value"                         (string) A way the block template may be changed, e.g. 'time', 'transactions', 'prevblock'
     ,...
  ],
  "noncerange" : "00000000ffffffff",   (string) A range of valid nonces
  "sigoplimit" : n,                 (numeric) limit of sigops in blocks
  "sizelimit" : n,                  (numeric) limit of block size
  "curtime" : ttt,                  (numeric) current timestamp in seconds since epoch (Jan 1 1970 GMT)
  "bits" : "xxx",                 (string) compressed target of next block
  "height" : n                      (numeric) The height of the next block
}

Examples:
> cryptonite-cli getblocktemplate 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getmininginfo`,
        native: false,
        source: `\`rpcmining.cpp\` (function \`getmininginfo\`)`,
        signature: `getmininginfo`,
        descriptionEn: `Returns a json object containing mining-related information.`,
        detail: `Result:
{
  "blocks": nnn,             (numeric) The current block
  "currentblocksize": nnn,   (numeric) The last block size
  "currentblocktx": nnn,     (numeric) The last block transaction
  "difficulty": xxx.xxxxx    (numeric) The current difficulty
  "errors": "..."          (string) Current errors
  "generate": true|false     (boolean) If the generation is on or off (see getgenerate or setgenerate calls)
  "genproclimit": n          (numeric) The processor limit for generation. -1 if no generation. (see getgenerate or setgenerate calls)
  "hashespersec": n          (numeric) The hashes per second of the generation, or 0 if no generation.
  "pooledtx": n              (numeric) The size of the mem pool
  "testnet": true|false      (boolean) If using testnet or not
}

Examples:
> cryptonite-cli getmininginfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmininginfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getnetworkhashps`,
        native: false,
        source: `\`rpcmining.cpp\` (function \`getnetworkhashps\`)`,
        signature: `getnetworkhashps ( blocks height )`,
        descriptionEn: `Returns the estimated network hashes per second based on the last n blocks. Pass in [blocks] to override # of blocks, -1 specifies since last difficulty change. Pass in [height] to estimate the network speed at the time when a certain block was found.`,
        detail: `Arguments:
1. blocks     (numeric, optional, default=120) The number of blocks, or -1 for blocks since last difficulty change.
2. height     (numeric, optional, default=-1) To estimate at the time of the given height.

Result:
x             (numeric) Hashes per second estimated

Examples:
> cryptonite-cli getnetworkhashps 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnetworkhashps", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `submitblock`,
        native: false,
        source: `\`rpcmining.cpp\` (function \`submitblock\`)`,
        signature: `submitblock "hexdata" ( "jsonparametersobject" )`,
        descriptionEn: `Attempts to submit new block to network. The 'jsonparametersobject' parameter is currently ignored.`,
        detail: `Arguments
1. "hexdata"    (string, required) the hex-encoded block data to submit
2. "jsonparametersobject"     (string, optional) object of optional parameters
    {
      "workid" : "id"    (string, optional) if the server provided a workid, it MUST be included with submissions
    }

Result:

Examples:
> cryptonite-cli submitblock "mydata"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "submitblock", "params": ["mydata"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
    ],
  },
  {
    category: `Raw transactions`,
    commands: [
      {
        name: `createrawtransaction`,
        native: false,
        source: `\`rpcrawtransaction.cpp\` (function \`createrawtransaction\`)`,
        signature: `createrawtransaction [{"txid":"id","vout":n},...] {"address":amount,...}`,
        descriptionEn: `Create a transaction spending the given inputs and sending to the given addresses. Returns hex-encoded raw transaction. Note that the transaction's inputs are not signed, and it is not stored in the wallet or transmitted to the network.`,
        detail: `Arguments:
1. "inputs"        (string, required) a json object with addresses as keys and amounts as values
    {
      "address": x.xxx   (ep, required) The key is the cryptonite address, the value is the XCN amount
      ,...
    }
2. "outputs"           (string, required) a json object with addresses as keys and amounts as values
    {
      "address": x.xxx   (ep, required) The key is the cryptonite address, the value is the XCN amount
      ,...
    }
3. "lockheight"    (numeric, optional) specific lockheight where transaction becomes valid. default is current chain height
4. "msg"		  (string, optional) message to include in transaction

Result:
"transaction"            (string) hex string of the transaction

Examples
> cryptonite-cli createrawtransaction "{\\"address\\":\\"0.01000000ep\\",\\"address\\":\\"0.01000000ep\\"}" "{\\"address\\":\\"0.01000000ep\\"}"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "createrawtransaction", "params": ["{\\"address\\":\\"0.01000000ep\\",\\"address\\":\\"0.01000000ep\\"}", "{\\"address\\":\\"0.01000000ep\\"}"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `decoderawtransaction`,
        native: false,
        source: `\`rpcrawtransaction.cpp\` (function \`decoderawtransaction\`)`,
        signature: `decoderawtransaction "hexstring"`,
        descriptionEn: `Return a JSON object representing the serialized, hex-encoded transaction.`,
        detail: `Arguments:
1. "txid"      (string, required) The transaction hex string
2. "nrequired :" (string, optional) JSON object with mappings between inputs and the required number of signatures
     {
     "index":"value"
     }

Result:
{
  "hex" : "data",         (string) The serialized, hex-encoded data for 'txid'
  "txid" : "id",          (string) The transaction id (same as provided)
  "version" : n,            (numeric) The version
  "lockheight" : ttt,       (numeric) The lock time
  "vin" : [                 (array of json objects)
     {
       "coinbase" : bool,   (boolean) if input is coinbase account
       "pubkey": "key",   (string) The public key hash of the input
	    "address" : "addr",(string) Cryptonite address representation of public key hash
       "scriptSig": {       (json object) The script
         "hex": "hex",    (string) hex
       },
       "signed": bool,      (boolean) if input signature is valid
     }
     ,...
  ],
  "vout" : [                (array of json objects)
     {
       "value" : x.xxx,     (ep) The value in XCN
       "n" : n,             (numeric) index
       "pubkey": "key",   (string) The public key hash of the input
	    "address" : "addr",(string) Cryptonite address representation of public key hash
     }
     ,...
  ],
  "blockhash" : "hash",   (string) the block hash
  "confirmations" : n,      (numeric) The confirmations
  "time" : ttt,             (numeric) The transaction time in seconds since epoch (Jan 1 1970 GMT)
  "blocktime" : ttt         (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
}

Examples:
> cryptonite-cli decoderawtransaction "hexstring"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "decoderawtransaction", "params": ["hexstring"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getrawtransaction`,
        native: false,
        source: `\`rpcrawtransaction.cpp\` (function \`getrawtransaction\`)`,
        signature: `getrawtransaction "txid" ( verbose )`,
        descriptionEn: `Return the raw transaction data. If verbose=0, returns a string that is serialized, hex-encoded data for 'txid'. If verbose is non-zero, returns an Object with information about 'txid'.`,
        detail: `Arguments:
1. "txid"      (string, required) The transaction id
2. verbose       (numeric, optional, default=0) If 0, return a string, other return a json object

Result (if verbose is not set or set to 0):
"data"      (string) The serialized, hex-encoded data for 'txid'

Result (if verbose > 0):
{
  "hex" : "data",         (string) The serialized, hex-encoded data for 'txid'
  "txid" : "id",          (string) The transaction id (same as provided)
  "version" : n,            (numeric) The version
  "lockheight" : ttt,       (numeric) The lock time
  "vin" : [                 (array of json objects)
     {
       "coinbase" : bool,   (boolean) if input is coinbase account
       "pubkey": "key",   (string) The public key hash of the input
	    "address" : "addr",(string) Cryptonite address representation of public key hash
       "scriptSig": {       (json object) The script
         "hex": "hex",    (string) hex
       },
       "signed": bool,      (boolean) if input signature is valid
     }
     ,...
  ],
  "vout" : [                (array of json objects)
     {
       "value" : x.xxx,     (ep) The value in XCN
       "n" : n,             (numeric) index
       "pubkey": "key",   (string) The public key hash of the input
	    "address" : "addr",(string) Cryptonite address representation of public key hash
     }
     ,...
  ],
  "blockhash" : "hash",   (string) the block hash
  "confirmations" : n,      (numeric) The confirmations
  "time" : ttt,             (numeric) The transaction time in seconds since epoch (Jan 1 1970 GMT)
  "blocktime" : ttt         (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
}

Examples:
> cryptonite-cli getrawtransaction "mytxid"
> cryptonite-cli getrawtransaction "mytxid" 1
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawtransaction", "params": ["mytxid", 1] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `sendrawtransaction`,
        native: false,
        source: `\`rpcrawtransaction.cpp\` (function \`sendrawtransaction\`)`,
        signature: `sendrawtransaction "hexstring" ( allowhighfees )`,
        descriptionEn: `Submits raw transaction (serialized, hex-encoded) to local node and network. Also see createrawtransaction and signrawtransaction calls.`,
        detail: `Arguments:
1. "hexstring"    (string, required) The hex string of the raw transaction`,
      },
      {
        name: `setuprawtransaction`,
        native: true,
        source: `\`rpcrawtransaction.cpp\` (function \`setuprawtransaction\`)`,
        signature: `setuprawtransaction "hexstring"`,
        descriptionEn: `Return a JSON object representing the serialized, hex-encoded transaction that has been templated for multisignature signing`,
        detail: `Arguments:
1. "txhex"      (string, required) The transaction hex string
2. "inputs"     (string, required) JSON object with input id's as keys and multisig descriptions as values
    {
      "index":      (numeric, required) The key is the input index
      "multisigsetup":  (string, required) The value is an array of multisig parameters
      [
        1. nrequired      (numeric, required) The number of required signatures out of the n keys or addresses.
        2. "keys"       (string, required) A json array of keys which are cryptonite addresses or hex-encoded public keys
        [
          "key"    (string) cryptonite address or hex-encoded public key
          ,...
        ]
      ]
      ,...
    }


Examples:
> cryptonite-cli setuprawtransaction "hexstring"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setuprawtransaction", "params": ["hexstring"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `signrawtransaction`,
        native: false,
        source: `\`rpcrawtransaction.cpp\` (function \`signrawtransaction\`)`,
        signature: `signrawtransaction "hexstring" ( [{"txid":"id","vout":n,"scriptPubKey":"hex","redeemScript":"hex"},...] ["privatekey1",...] sighashtype )`,
        descriptionEn: `Sign inputs for raw transaction (serialized, hex-encoded). The second optional argument (may be null) is an array of previous transaction outputs that this transaction depends on but may not yet be in the block chain. The third optional argument (may be null) is an array of base58-encoded private keys that, if given, will be the only keys used to sign the transaction.`,
        detail: `Arguments:
1. "hexstring"     (string, required) The transaction hex string
2. "nrequired :" (string, optional) JSON object with mappings between inputs and the required number of signatures
     {
        "index":"value"
     }
3. "privatekeys"     (string, optional) A json array of base58-encoded private keys for signing
    [                  (json array of strings, or 'null' if none provided)
      "privatekey"   (string) private key in base58-encoding
      ,...
    ]

Result:
{
  "hex": "value",   (string) The raw transaction with signature(s) (hex-encoded string)
  "complete": n       (numeric) if transaction has a complete set of signature (0 if not)
}

Examples:
> cryptonite-cli signrawtransaction "myhex"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signrawtransaction", "params": ["myhex"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
    ],
  },
  {
    category: `Utility functions`,
    commands: [
      {
        name: `createmultisig`,
        native: false,
        source: `\`rpcmisc.cpp\` (function \`createmultisig\`)`,
        signature: `createmultisig nrequired ["key",...]`,
        descriptionEn: `Creates a multi-signature address with n signature of m keys required. It returns a json object with the address and redeemScript.`,
        detail: `Arguments:
1. nrequired      (numeric, required) The number of required signatures out of the n keys or addresses.
2. "keys"       (string, required) A json array of keys which are cryptonite addresses or hex-encoded public keys
     [
       "key"    (string) cryptonite address or hex-encoded public key
       ,...
     ]

Result:
{
  "address":"multisigaddress",  (string) The value of the new multisig address.
}

Examples:

Create a multisig address from 2 addresses
> cryptonite-cli createmultisig 2 "[\\"16sSauSf5pF2UkUwvKGq4qjNRzBZYqgEL5\\",\\"171sgjn4YtPu27adkKGrdDwzRTxnRkBfKV\\"]"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "createmultisig", "params": [2, "[\\"16sSauSf5pF2UkUwvKGq4qjNRzBZYqgEL5\\",\\"171sgjn4YtPu27adkKGrdDwzRTxnRkBfKV\\"]"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `validateaddress`,
        native: false,
        source: `\`rpcmisc.cpp\` (function \`validateaddress\`)`,
        signature: `validateaddress "cryptoniteaddress"`,
        descriptionEn: `Return information about the given bitcoin address.`,
        detail: `Arguments:
1. "cryptoniteaddress"     (string, required) The cryptonite address to validate

Result:
{
  "isvalid" : true|false,         (boolean) If the address is valid or not. If not, this is the only property returned.
  "address" : "cryptoniteaddress", (string) The cryptonite address validated
  "ismine" : true|false,          (boolean) If the address is yours or not
  "pubkey" : "publickeyhex",    (string) The hex value of the raw public key
  "account" : "account"         (string) The account associated with the address, "" is the default account
}

Examples:
> cryptonite-cli validateaddress "1PSSGeFHDnKNxiEyFrD1wcEaHr9hrQDDWc"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "validateaddress", "params": ["1PSSGeFHDnKNxiEyFrD1wcEaHr9hrQDDWc"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `verifymessage`,
        native: false,
        source: `\`rpcmisc.cpp\` (function \`verifymessage\`)`,
        signature: `verifymessage "cryptoniteaddress" "signature" "message"`,
        descriptionEn: `Verify a signed message`,
        detail: `Arguments:
1. "cryptoniteaddress"  (string, required) The cryptonite address to use for the signature.
2. "signature"       (string, required) The signature provided by the signer in base 64 encoding (see signmessage).
3. "message"         (string, required) The message that was signed.

Result:
true|false   (boolean) If the signature is verified or not.

Examples:

Unlock the wallet for 30 seconds
> cryptonite-cli walletpassphrase "mypassphrase" 30

Create the signature
> cryptonite-cli signmessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ" "my message"

Verify the signature
> cryptonite-cli verifymessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ" "signature" "my message"

As json rpc
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "verifymessage", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ", "signature", "my message"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
    ],
  },
  {
    category: `Wallet`,
    commands: [
      {
        name: `addmultisigaddress`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`addmultisigaddress\`)`,
        signature: `addmultisigaddress nrequired ["key",...] ( "account" )`,
        descriptionEn: `Add a nrequired-to-sign multisignature address to the wallet. Each key is a Cryptonite address or hex-encoded public key. If 'account' is specified, assign address to that account.`,
        detail: `Arguments:
1. nrequired        (numeric, required) The number of required signatures out of the n keys or addresses.
2. "keysobject"   (string, required) A json array of cryptonite addresses or hex-encoded public keys
     [
       "address"  (string) cryptonite address or hex-encoded public key
       ...,
     ]
3. "account"      (string, optional) An account to assign the addresses to.

Result:
"cryptoniteaddress"  (string) A cryptonite address associated with the keys.

Examples:

Add a multisig address from 2 addresses
> cryptonite-cli addmultisigaddress 2 "[\\"16sSauSf5pF2UkUwvKGq4qjNRzBZYqgEL5\\",\\"171sgjn4YtPu27adkKGrdDwzRTxnRkBfKV\\"]"

As json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "addmultisigaddress", "params": [2, "[\\"16sSauSf5pF2UkUwvKGq4qjNRzBZYqgEL5\\",\\"171sgjn4YtPu27adkKGrdDwzRTxnRkBfKV\\"]"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `backupwallet`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`backupwallet\`)`,
        signature: `backupwallet "destination"`,
        descriptionEn: `Safely copies wallet.dat to destination, which can be a directory or a path with filename.`,
        detail: `Arguments:
1. "destination"   (string) The destination directory or file

Examples:
> cryptonite-cli backupwallet "backup.dat"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "backupwallet", "params": ["backup.dat"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `dumpprivkey`,
        native: false,
        source: `\`rpcdump.cpp\` (function \`dumpprivkey\`)`,
        signature: `dumpprivkey "cryptoniteaddress"`,
        descriptionEn: `Reveals the private key corresponding to 'cryptoniteaddress'. Then the importprivkey can be used with this output`,
        detail: `Arguments:
1. "cryptoniteaddress"   (string, required) The cryptonite address for the private key

Result:
"key"                (string) The private key

Examples:
> cryptonite-cli dumpprivkey "myaddress"
> cryptonite-cli importprivkey "mykey"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "dumpprivkey", "params": ["myaddress"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `dumpwallet`,
        native: false,
        source: `\`rpcdump.cpp\` (function \`dumpwallet\`)`,
        signature: `dumpwallet "filename"`,
        descriptionEn: `Dumps all wallet keys in a human-readable format.`,
        detail: `Arguments:
1. "filename"    (string, required) The filename

Examples:
> cryptonite-cli dumpwallet "test"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "dumpwallet", "params": ["test"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `encryptwallet`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`encryptwallet\`)`,
        signature: `encryptwallet "passphrase"`,
        descriptionEn: `Encrypts the wallet with 'passphrase'. This is for first time encryption. After this, any calls that interact with private keys such as sending or signing will require the passphrase to be set prior the making these calls. Use the walletpassphrase call for this, and then walletlock call. If the wallet is already encrypted, use the walletpassphrasechange call. Note that this will shutdown the server.`,
        detail: `Arguments:
1. "passphrase"    (string) The pass phrase to encrypt the wallet with. It must be at least 1 character, but should be long.

Examples:

Encrypt you wallet
> cryptonite-cli encryptwallet "my pass phrase"

Now set the passphrase to use the wallet, such as for signing or sending XCN
> cryptonite-cli walletpassphrase "my pass phrase"

Now we can so something like sign
> cryptonite-cli signmessage "cryptoniteaddress" "test message"

Now lock the wallet again by removing the passphrase
> cryptonite-cli walletlock 

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "encryptwallet", "params": ["my pass phrase"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getaccountaddress`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`getaccountaddress\`)`,
        signature: `getaccountaddress "account"`,
        descriptionEn: `Returns the current Cryptonite address for receiving payments to this account.`,
        detail: `Arguments:
1. "account"       (string, required) The account name for the address. It can also be set to the empty string "" to represent the default account. The account does not need to exist, it will be created and a new address created  if there is no account by the given name.

Result:
"cryptoniteaddress"   (string) The account cryptonite address

Examples:
> cryptonite-cli getaccountaddress 
> cryptonite-cli getaccountaddress ""
> cryptonite-cli getaccountaddress "myaccount"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaccountaddress", "params": ["myaccount"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getaccount`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`getaccount\`)`,
        signature: `getaccount "cryptoniteaddress"`,
        descriptionEn: `Returns the account associated with the given address.`,
        detail: `Arguments:
1. "cryptoniteaddress"  (string, required) The cryptonite address for account lookup.

Result:
"accountname"        (string) the account address

Examples:
> cryptonite-cli getaccount "address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaccount", "params": ["address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getaddressesbyaccount`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`getaddressesbyaccount\`)`,
        signature: `getaddressesbyaccount "account"`,
        descriptionEn: `Returns the list of addresses for the given account.`,
        detail: `Arguments:
1. "account"  (string, required) The account name.

Result:
[                     (json array of string)
  "cryptoniteaddress"  (string) a cryptonite address associated with the given account
  ,...
]

Examples:
> cryptonite-cli getaddressesbyaccount "tabby"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressesbyaccount", "params": ["tabby"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getbalance`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`getbalance\`)`,
        signature: `getbalance ( "account" minconf )`,
        descriptionEn: `If account is not specified, returns the server's total available balance. If account is specified, returns the balance in the account. Note that the account "" is not the same as leaving the parameter out. The server total may be different to the balance in the default "" account.`,
        detail: `Arguments:
1. "account"      (string, optional) The selected account, or "*" for entire wallet. It may be the default account using "".
2. minconf          (numeric, optional, default=1) Only include transactions confirmed at least this many times.

Result:
amount              (ep) The total amount in XCN received for this account.

Examples:

The total amount in the server across all accounts
> cryptonite-cli getbalance 

The total amount in the server across all accounts, with at least 6 confirmations
> cryptonite-cli getbalance "*" 6

The total amount in the default account with at least 1 confirmation
> cryptonite-cli getbalance ""

The total amount in the account named tabby with at least 6 confirmations
> cryptonite-cli getbalance "tabby" 6

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbalance", "params": ["tabby", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getnewaddress`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`getnewaddress\`)`,
        signature: `getnewaddress ( "account" )`,
        descriptionEn: `Returns a new Cryptonite address for receiving payments. If 'account' is specified (recommended), it is added to the address book so payments received with the address will be credited to 'account'.`,
        detail: `Arguments:
1. "account"        (string, optional) The account name for the address to be linked to. if not provided, the default account "" is used. It can also be set to the empty string "" to represent the default account. The account does not need to exist, it will be created if there is no account by the given name.

Result:
"cryptoniteaddress"    (string) The new cryptonite address

Examples:
> cryptonite-cli getnewaddress 
> cryptonite-cli getnewaddress ""
> cryptonite-cli getnewaddress "myaccount"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnewaddress", "params": ["myaccount"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getreceivedbyaccount`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`getreceivedbyaccount\`)`,
        signature: `getreceivedbyaccount "account" ( minconf )`,
        descriptionEn: `Returns the total amount received by addresses with <account> in transactions with at least [minconf] confirmations.`,
        detail: `Arguments:
1. "account"      (string, required) The selected account, may be the default account using "".
2. minconf          (numeric, optional, default=1) Only include transactions confirmed at least this many times.

Result:
amount              (ep) The total amount in XCN received for this account.

Examples:

Amount received by the default account with at least 1 confirmation
> cryptonite-cli getreceivedbyaccount ""

Amount received at the tabby account including unconfirmed amounts with zero confirmations
> cryptonite-cli getreceivedbyaccount "tabby" 0

The amount with at least 6 confirmation, very safe
> cryptonite-cli getreceivedbyaccount "tabby" 6

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getreceivedbyaccount", "params": ["tabby", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getreceivedbyaddress`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`getreceivedbyaddress\`)`,
        signature: `getreceivedbyaddress "cryptoniteaddress" ( minconf )`,
        descriptionEn: `Returns the total amount received by the given cryptoniteaddress in transactions with at least minconf confirmations.`,
        detail: `Arguments:
1. "cryptoniteaddress"  (string, required) The cryptonite address for transactions.
2. minconf             (numeric, optional, default=1) Only include transactions confirmed at least this many times.

Result:
amount   (ep) The total amount in XCN received at this address.

Examples:

The amount from transactions with at least 1 confirmation
> cryptonite-cli getreceivedbyaddress "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ"

The amount including unconfirmed transactions, zero confirmations
> cryptonite-cli getreceivedbyaddress "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ" 0

The amount with at least 6 confirmation, very safe
> cryptonite-cli getreceivedbyaddress "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ" 6

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getreceivedbyaddress", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `gettransaction`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`gettransaction\`)`,
        signature: `gettransaction "txid"`,
        descriptionEn: `Get detailed information about in-wallet transaction <txid>`,
        detail: `Arguments:
1. "txid"    (string, required) The transaction id

Result:
{
  "amount" : x.xxx,        (ep) The transaction amount in XCN
  "confirmations" : n,     (numeric) The number of confirmations
  "blockhash" : "hash",  (string) The block hash
  "blockindex" : xx,       (numeric) The block index
  "blocktime" : ttt,       (numeric) The time in seconds since epoch (1 Jan 1970 GMT)
  "txid" : "transactionid",   (string) The transaction id, see also https://blockchain.info/tx/[transactionid]
  "time" : ttt,            (numeric) The transaction time in seconds since epoch (1 Jan 1970 GMT)
  "timereceived" : ttt,    (numeric) The time received in seconds since epoch (1 Jan 1970 GMT)
  "details" : [
    {
      "account" : "accountname",  (string) The account name involved in the transaction, can be "" for the default account.
      "address" : "cryptoniteaddress",   (string) The cryptonite address involved in the transaction
      "category" : "send|receive",    (string) The category, either 'send' or 'receive'
      "amount" : x.xxx                  (ep) The amount in XCN
    }
    ,...
  ],
  "hex" : "data"         (string) Raw data for transaction
}

bExamples
> cryptonite-cli gettransaction "1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettransaction", "params": ["1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getunconfirmedbalance`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`getunconfirmedbalance\`)`,
        signature: `getunconfirmedbalance`,
        descriptionEn: `Returns the server's total unconfirmed balance`,
        detail: ``,
      },
      {
        name: `getwalletinfo`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`getwalletinfo\`)`,
        signature: `getwalletinfo`,
        descriptionEn: `Returns an object containing various wallet state info.`,
        detail: `Result:
{
  "walletversion": xxxxx,     (numeric) the wallet version
  "balance": xxxxxxx,         (ep) the total XCN balance of the wallet
  "txcount": xxxxxxx,         (numeric) the total number of transactions in the wallet
  "keypoololdest": xxxxxx,    (numeric) the timestamp (seconds since GMT epoch) of the oldest pre-generated key in the key pool
  "keypoolsize": xxxx,        (numeric) how many new keys are pre-generated
  "unlocked_until": ttt,      (numeric) the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked
}

Examples:
> cryptonite-cli getwalletinfo 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getwalletinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `importprivkey`,
        native: false,
        source: `\`rpcdump.cpp\` (function \`importprivkey\`)`,
        signature: `importprivkey "cryptoniteprivkey" ( "label" rescan )`,
        descriptionEn: `Adds a private key (as returned by dumpprivkey) to your wallet.`,
        detail: `Arguments:
1. "cryptoniteprivkey"   (string, required) The private key (see dumpprivkey)
2. "label"            (string, optional) an optional label
3. rescan               (boolean, optional, default=true) Rescan the wallet for transactions

Examples:

Dump a private key
> cryptonite-cli dumpprivkey "myaddress"

Import the private key
> cryptonite-cli importprivkey "mykey"

Import using a label
> cryptonite-cli importprivkey "mykey" "testing" false

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importprivkey", "params": ["mykey", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `importwallet`,
        native: false,
        source: `\`rpcdump.cpp\` (function \`importwallet\`)`,
        signature: `importwallet "filename"`,
        descriptionEn: `Imports keys from a wallet dump file (see dumpwallet).`,
        detail: `Arguments:
1. "filename"    (string, required) The wallet file

Examples:

Dump the wallet
> cryptonite-cli dumpwallet "test"

Import the wallet
> cryptonite-cli importwallet "test"

Import using the json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importwallet", "params": ["test"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `keypoolrefill`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`keypoolrefill\`)`,
        signature: `keypoolrefill ( newsize )`,
        descriptionEn: `Fills the keypool.`,
        detail: `Arguments
1. newsize     (numeric, optional, default=100) The new keypool size

Examples:
> cryptonite-cli keypoolrefill 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "keypoolrefill", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `listaccounts`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`listaccounts\`)`,
        signature: `listaccounts ( minconf )`,
        descriptionEn: `Returns Object that has account names as keys, account balances as values.`,
        detail: `Arguments:
1. minconf     (numeric, optional, default=1) Only onclude transactions with at least this many confirmations

Result:
{                      (json object where keys are account names, and values are numeric balances
  "account": x.xxx,  (numeric) The property name is the account name, and the value is the total balance for the account.
  ...
}

Examples:

List account balances where there at least 1 confirmation
> cryptonite-cli listaccounts 

List account balances including zero confirmation transactions
> cryptonite-cli listaccounts 0

List account balances for 6 or more confirmations
> cryptonite-cli listaccounts 6

As json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listaccounts", "params": [6] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
*listsinceblock ( "blockhash" target-confirmations )

Get all transactions in blocks since block [blockhash], or all transactions if omitted

Arguments:
1. "blockhash"   (string, optional) The block hash to list transactions since
2. target-confirmations:    (numeric, optional) The confirmations required, must be 1 or more

Result:
{
  "transactions": [
    "account":"accountname",       (string) The account name associated with the transaction. Will be "" for the default account.
    "address":"cryptoniteaddress",    (string) The cryptonite address of the transaction. Not present for move transactions (category = move).
    "category":"send|receive",     (string) The transaction category. 'send' has negative amounts, 'receive' has positive amounts.
    "amount": x.xxx,          (ep) The amount in XCN. This is negative for the 'send' category, and for the 'move' category for moves 
                                          outbound. It is positive for the 'receive' category, and for the 'move' category for inbound funds.
    "fee": x.xxx,             (ep) The amount of the fee in XCN. This is negative and only available for the 'send' category of transactions.
    "confirmations": n,       (numeric) The number of confirmations for the transaction. Available for 'send' and 'receive' category of transactions.
    "blockhash": "hashvalue",     (string) The block hash containing the transaction. Available for 'send' and 'receive' category of transactions.
    "blockindex": n,`,
      },
      {
        name: `listaddressgroupings`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`listaddressgroupings\`)`,
        signature: `listaddressgroupings`,
        descriptionEn: `Lists groups of addresses which have had their common ownership made public by common use as inputs or as the resulting change in past transactions`,
        detail: `Result:
[
  [
    [
      "cryptoniteaddress",     (string) The cryptonite address
      amount,                 (ep) The amount in XCN
      "account"             (string, optional) The account
    ]
    ,...
  ]
  ,...
]

Examples:
> cryptonite-cli listaddressgroupings 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listaddressgroupings", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `listreceivedbyaccount`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`listreceivedbyaccount\`)`,
        signature: `listreceivedbyaccount ( minconf includeempty )`,
        descriptionEn: `List balances by account.`,
        detail: `Arguments:
1. minconf      (numeric, optional, default=1) The minimum number of confirmations before payments are included.
2. includeempty (boolean, optional, default=false) Whether to include accounts that haven't received any payments.

Result:
[
  {
    "account" : "accountname",  (string) The account name of the receiving account
    "amount" : x.xxx,             (numeric) The total amount received by addresses with this account
    "confirmations" : n           (numeric) The number of confirmations of the most recent transaction included
  }
  ,...
]

Examples:
> cryptonite-cli listreceivedbyaccount 
> cryptonite-cli listreceivedbyaccount 6 true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listreceivedbyaccount", "params": [6, true] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `listreceivedbyaddress`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`listreceivedbyaddress\`)`,
        signature: `listreceivedbyaddress ( minconf includeempty )`,
        descriptionEn: `List balances by receiving address.`,
        detail: `Arguments:
1. minconf       (numeric, optional, default=1) The minimum number of confirmations before payments are included.
2. includeempty  (numeric, optional, dafault=false) Whether to include addresses that haven't received any payments.

Result:
[
  {
    "address" : "receivingaddress",  (string) The receiving address
    "account" : "accountname",       (string) The account of the receiving address. The default account is "".
    "amount" : x.xxx,                  (ep) The total amount in XCN received by the address
    "confirmations" : n                (numeric) The number of confirmations of the most recent transaction included
  }
  ,...
]

Examples:
> cryptonite-cli listreceivedbyaddress 
> cryptonite-cli listreceivedbyaddress 6 true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listreceivedbyaddress", "params": [6, true] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `listsinceblock`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`listsinceblock\`)`,
        signature: `listsinceblock ( "blockhash" target-confirmations )`,
        descriptionEn: `Get all transactions in blocks since block [blockhash], or all transactions if omitted`,
        detail: `Arguments:
1. "blockhash"   (string, optional) The block hash to list transactions since
2. target-confirmations:    (numeric, optional) The confirmations required, must be 1 or more

Result:
{
  "transactions": [
    "account":"accountname",       (string) The account name associated with the transaction. Will be "" for the default account.
    "address":"cryptoniteaddress",    (string) The cryptonite address of the transaction. Not present for move transactions (category = move).
    "category":"send|receive",     (string) The transaction category. 'send' has negative amounts, 'receive' has positive amounts.
    "amount": x.xxx,          (ep) The amount in XCN. This is negative for the 'send' category, and for the 'move' category for moves 
                                          outbound. It is positive for the 'receive' category, and for the 'move' category for inbound funds.
    "fee": x.xxx,             (ep) The amount of the fee in XCN. This is negative and only available for the 'send' category of transactions.
    "confirmations": n,       (numeric) The number of confirmations for the transaction. Available for 'send' and 'receive' category of transactions.
    "blockhash": "hashvalue",     (string) The block hash containing the transaction. Available for 'send' and 'receive' category of transactions.
    "blockindex": n,          (numeric) The block index containing the transaction. Available for 'send' and 'receive' category of transactions.
    "blocktime": xxx,         (numeric) The block time in seconds since epoch (1 Jan 1970 GMT).
    "txid": "transactionid",  (string) The transaction id (see https://blockchain.info/tx/[transactionid]. Available for 'send' and 'receive' category of transactions.
    "time": xxx,              (numeric) The transaction time in seconds since epoch (Jan 1 1970 GMT).
    "timereceived": xxx,      (numeric) The time received in seconds since epoch (Jan 1 1970 GMT). Available for 'send' and 'receive' category of transactions.
    "comment": "...",       (string) If a comment is associated with the transaction.
    "to": "...",            (string) If a comment to is associated with the transaction.
  ],
  "lastblock": "lastblockhash"     (string) The hash of the last block
}

Examples:
> cryptonite-cli listsinceblock 
> cryptonite-cli listsinceblock "000000000000000bacf66f7497b7dc45ef753ee9a7d38571037cdb1a57f663ad" 6
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listsinceblock", "params": ["000000000000000bacf66f7497b7dc45ef753ee9a7d38571037cdb1a57f663ad", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
Invalid parameter*transactionslastblockgettransaction "txid"

Get detailed information about in-wallet transaction <txid>

Arguments:
1. "txid"    (string, required) The transaction id

Result:
{
  "amount" : x.xxx,        (ep) The transaction amount in XCN
  "confirmations" : n,`,
      },
      {
        name: `listtransactions`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`listtransactions\`)`,
        signature: `listtransactions ( "account" count from )`,
        descriptionEn: `Returns up to 'count' most recent transactions skipping the first 'from' transactions for account 'account'.`,
        detail: `Arguments:
1. "account"    (string, optional) The account name. If not included, it will list all transactions for all accounts.
                                     If "" is set, it will list transactions for the default account.
2. count          (numeric, optional, default=10) The number of transactions to return
3. from           (numeric, optional, default=0) The number of transactions to skip

Result:
[
  {
    "account":"accountname",       (string) The account name associated with the transaction. 
                                                It will be "" for the default account.
    "address":"cryptoniteaddress",    (string) The cryptonite address of the transaction. Not present for 
                                                move transactions (category = move).
    "category":"send|receive|move", (string) The transaction category. 'move' is a local (off blockchain)
                                                transaction between accounts, and not associated with an address,
                                                transaction id or block. 'send' and 'receive' transactions are 
                                                associated with an address, transaction id and block details
    "amount": x.xxx,          (ep) The amount in XCN. This is negative for the 'send' category, and for the
                                         'move' category for moves outbound. It is positive for the 'receive' category,
                                         and for the 'move' category for inbound funds.
    "fee": x.xxx,             (ep) The amount of the fee in XCN. This is negative and only available for the 
                                         'send' category of transactions.
    "confirmations": n,       (numeric) The number of confirmations for the transaction. Available for 'send' and 
                                         'receive' category of transactions.
    "blockhash": "hashvalue", (string) The block hash containing the transaction. Available for 'send' and 'receive'
                                          category of transactions.
    "blockindex": n,          (numeric) The block index containing the transaction. Available for 'send' and 'receive'
                                          category of transactions.
    "txid": "transactionid", (string) The transaction id (see https://blockchain.info/tx/[transactionid]. Available 
                                          for 'send' and 'receive' category of transactions.
    "time": xxx,              (numeric) The transaction time in seconds since epoch (midnight Jan 1 1970 GMT).
    "timereceived": xxx,      (numeric) The time received in seconds since epoch (midnight Jan 1 1970 GMT). Available 
                                          for 'send' and 'receive' category of transactions.
    "comment": "...",       (string) If a comment is associated with the transaction.
    "otheraccount": "accountname",  (string) For the 'move' category of transactions, the account the funds came 
                                          from (for receiving funds, positive amounts), or went to (for sending funds,
                                          negative amounts).
  }
]

Examples:

List the most recent 10 transactions in the systems
> cryptonite-cli listtransactions 

List the most recent 10 transactions for the tabby account
> cryptonite-cli listtransactions "tabby"

List transactions 100 to 120 from the tabby account
> cryptonite-cli listtransactions "tabby" 20 100

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listtransactions", "params": ["tabby", 20, 100] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
*`,
      },
      {
        name: `listbalances`,
        native: true,
        source: `\`rpcrawtransaction.cpp\` (function \`listbalances\`)`,
        signature: `listbalances ( minconf ["address",...] )`,
        descriptionEn: `Returns array of available spending balance with at least minconf confirmations. Results are an array of Objects, each of which has: {address, ours, account, balance}`,
        detail: `Arguments:
1. minconf          (numeric, optional, default=1) The minimum confirmationsi to filter
2. "addresses"    (string) A json array of cryptonite addresses to filter
    [
      "address"   (string) cryptonite address
      ,...
    ]

Result
[                   (array of json object)
  {
    "address" : "address",  (string) the cryptonite address
    "ours"    : true/false,   (bool) is the account belongs to the local wallet
    "account" : "account",  (string,null) The associated account, or "" for the default account
    "balance" : x.xxx,        (ep) the account balance in XCN
  }
  ,...
]

Examples
> cryptonite-cli listbalances 
> cryptonite-cli listbalances 6 "[\\"1PGFqEzfmQch1gKD3ra4k18PNj3tTUUSqg\\",\\"1LtvqCaApEdUGFkpKMM4MstjcaL4dKg8SP\\"]"`,
      },
      {
        name: `move`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`movecmd\`)`,
        signature: `move "fromaccount" "toaccount" amount ( minconf "comment" )`,
        descriptionEn: `Move a specified amount from one account in your wallet to another.`,
        detail: `Arguments:
1. "fromaccount"   (string, required) The name of the account to move funds from. May be the default account using "".
2. "toaccount"     (string, required) The name of the account to move funds to. May be the default account using "".
3. minconf           (numeric, optional, default=1) Only use funds with at least this many confirmations.
4. "comment"       (string, optional) An optional comment, stored in the wallet only.

Result:
true|false           (boolean) true if successfull.

Examples:

Move 0.01 XCN from the default account to the account named tabby
> cryptonite-cli move "" "tabby" "0.01000000ep"

Move 0.01 XCN timotei to akiko with a comment and funds have 6 confirmations
> cryptonite-cli move "timotei" "akiko" "0.01000000ep" 6 "happy birthday!"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "move", "params": ["timotei", "akiko", "0.01000000ep", 6, "happy birthday!"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `sendfrom`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`sendfrom\`)`,
        signature: `sendfrom "fromaccount" "tocryptoniteaddress" amount ( minconf "msg" )`,
        descriptionEn: `Sent an amount from an account to a cryptonite address. The amount is a real and is rounded to the nearest 0.00000001.`,
        detail: `Arguments:
1. "fromaccount"         (string, required) The name of the account to send funds from. May be the default account using "".
2. "tocryptoniteaddress" (string, required) The cryptonite address to send funds to.
3. amount                  (ep, required) The amount in XCN. (transaction fee is added on top).
4. minconf                 (numeric, optional, default=1) Only use funds with at least this many confirmations.
5. "msg"                 (string, optional) A comment used to store what the transaction is for. 

Result:
"transactionid"          (string) The transaction id. (view at https://blockchain.info/tx/[transactionid])

Examples:

Send 0.01 XCN from the default account to the address, must have at least 1 confirmation
> cryptonite-cli sendfrom "" "address" "0.01000000ep"

Send 0.01 from the tabby account to the given address, funds must have at least 6 confirmations
> cryptonite-cli sendfrom "tabby" "address" "0.01000000ep" 6 "donation" 

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendfrom", "params": ["tabby", "address", "0.01000000ep", 6, "donation"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `sendmany`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`sendmany\`)`,
        signature: `sendmany "fromaccount" {"address":amount,...} ( minconf "msg" )`,
        descriptionEn: `Send multiple times. Amounts are ep numbers.`,
        detail: `Arguments:
1. "fromaccount"            (string, required) The account to send the funds from, can be "" for the default account
2. "amounts"                (string, required) A json object with addresses and amounts
    {
      "address":"amount"  (ep) The cryptonite address is the key, the numeric amount in XCN is the value
      ,...
    }
3. minconf                    (numeric, optional, default=1) Only use the balance confirmed at least this many times.
4. "msg"                    (string, optional) A message to include in transaction

Result:
"transactionid"             (string) The transaction id for the send. Only 1 transaction is created regardless of 
                                    the number of addresses. See https://blockchain.info/tx/[transactionid]

Examples:

Send two amounts to two different addresses:
> cryptonite-cli sendmany "tabby" "{\\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ\\":"0.01000000ep",\\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\\":"0.02000000ep"}"

Send two amounts to two different addresses setting the confirmation and comment:
> cryptonite-cli sendmany "tabby" "{\\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ\\":"0.01000000ep",\\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\\":"0.02000000ep"}" 6 "testing"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendmany", "params": ["tabby", "{\\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ\\":"0.01000000ep",\\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\\":"0.02000000ep"}", 6, "testing"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `sendtoaddress`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`sendtoaddress\`)`,
        signature: `sendtoaddress "cryptoniteaddress" amount ( "msg" )`,
        descriptionEn: `Sent an amount to a given address. The amount is a real and is rounded to the nearest 0.00000001`,
        detail: `Arguments:
1. "cryptoniteaddress"  (string, required) The cryptonite address to send to.
2. "amount"      (ep, required) The amount in XCN to send. eg 0.1
3. "msg"     (string, optional) A comment used to store what the transaction is for. 

Result:
"transactionid"  (string) The transaction id. (view at https://blockchain.info/tx/[transactionid])

Examples:
> cryptonite-cli sendtoaddress "address" "0.10000000ep"
> cryptonite-cli sendtoaddress "address" "0.10000000ep" "donation" 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendtoaddress", "params": ["address", "0.10000000ep", "donation"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `setaccount`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`setaccount\`)`,
        signature: `setaccount "cryptoniteaddress" "account"`,
        descriptionEn: `Sets the account associated with the given address.`,
        detail: `Arguments:
1. "cryptoniteaddress"  (string, required) The cryptonite address to be associated with an account.
2. "account"         (string, required) The account to assign the address to.
3. "create"	    (bool, optional) Set if want to disable address creation on source.

Examples:
> cryptonite-cli setaccount "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ" "tabby"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setaccount", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ", "tabby"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `settxfee`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`settxfee\`)`,
        signature: `settxfee amount`,
        descriptionEn: `Set the transaction fee per kB.`,
        detail: `Arguments:
1. amount         (ep, required) The transaction fee in XCN/kB rounded to the nearest 0.00000001

Result
true|false        (boolean) Returns true if successful

Examples:
> cryptonite-cli settxfee 0.000010000ep
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "settxfee", "params": [0.000010000ep] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `signmessage`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`signmessage\`)`,
        signature: `signmessage "cryptoniteaddress" "message"`,
        descriptionEn: `Sign a message with the private key of an address`,
        detail: `Arguments:
1. "cryptoniteaddress"  (string, required) The cryptonite address to use for the private key.
2. "message"         (string, required) The message to create a signature of.

Result:
"signature"          (string) The signature of the message encoded in base 64

Examples:

Unlock the wallet for 30 seconds
> cryptonite-cli walletpassphrase "mypassphrase" 30

Create the signature
> cryptonite-cli signmessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ" "my message"

Verify the signature
> cryptonite-cli verifymessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ" "signature" "my message"

As json rpc
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signmessage", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XZ", "my message"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `walletlock`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`walletlock\`)`,
        signature: `walletlock`,
        descriptionEn: `Removes the wallet encryption key from memory, locking the wallet. After calling this method, you will need to call walletpassphrase again before being able to call any methods which require the wallet to be unlocked.`,
        detail: `Examples:

Set the passphrase for 2 minutes to perform a transaction
> cryptonite-cli walletpassphrase "my pass phrase" 120

Perform a send (requires passphrase set)
> cryptonite-cli sendtoaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 1.0

Clear the passphrase since we are done before 2 minutes is up
> cryptonite-cli walletlock 

As json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "walletlock", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `walletpassphrasechange`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`walletpassphrasechange\`)`,
        signature: `walletpassphrasechange "oldpassphrase" "newpassphrase"`,
        descriptionEn: `Changes the wallet passphrase from 'oldpassphrase' to 'newpassphrase'.`,
        detail: `Arguments:
1. "oldpassphrase"      (string) The current passphrase
2. "newpassphrase"      (string) The new passphrase

Examples:
> cryptonite-cli walletpassphrasechange "old one" "new one"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "walletpassphrasechange", "params": ["old one", "new one"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `walletpassphrase`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`walletpassphrase\`)`,
        signature: `walletpassphrase "passphrase" timeout`,
        descriptionEn: `Stores the wallet decryption key in memory for 'timeout' seconds. This is needed prior to performing transactions related to private keys such as sending XCN`,
        detail: `Arguments:
1. "passphrase"     (string, required) The wallet passphrase
2. timeout            (numeric, required) The time to keep the decryption key in seconds.

Note:
Issuing the walletpassphrase command while the wallet is already unlocked will set a new unlock
time that overrides the old one.

Examples:

unlock the wallet for 60 seconds
> cryptonite-cli walletpassphrase "my pass phrase" 60

Lock the wallet again (before 60 seconds)
> cryptonite-cli walletlock 

As json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "walletpassphrase", "params": ["my pass phrase", 60] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `resendwallet`,
        native: false,
        source: `\`rpcwallet.cpp\` (function \`resendwallet\`)`,
        signature: `resendwallet`,
        descriptionEn: `Cause all unconfirmed transactions in wallet to be resent`,
        detail: `Examples:
> cryptonite-cli resendwallet 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "resendwallet", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `setlimit`,
        native: true,
        source: `\`rpcwallet.cpp\` (function \`setlimit\`)`,
        signature: `setlimit`,
        descriptionEn: `Update the transaction limit field on an address`,
        detail: `Arguments:
1. "limit"         (ep, required) The new limit for the address
2. "cryptoniteaddress"  (string, required) The cryptonite address to update.

Result:
"transactionid"          (string) The transaction id for the send. Only 1 transaction is created regardless of 
                                    the number of addresses. See https://blockchain.info/tx/[transactionid]

Examples:
> cryptonite-cli setlimit "1.00000000ep" "address"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setlimit", "params": ["1.00000000ep", "address"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
    ],
  },
  {
    category: `Wallet-enabled mining`,
    commands: [
      {
        name: `getgenerate`,
        native: false,
        source: `\`rpcmining.cpp\` (function \`getgenerate\`)`,
        signature: `getgenerate`,
        descriptionEn: `Return if the server is set to generate coins or not. The default is false. It is set with the command line argument -gen (or cryptonite.conf setting gen) It can also be set with the setgenerate call.`,
        detail: `Result
true|false      (boolean) If the server is set to generate coins or not

Examples:
> cryptonite-cli getgenerate 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getgenerate", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `gethashespersec`,
        native: false,
        source: `\`rpcmining.cpp\` (function \`gethashespersec\`)`,
        signature: `gethashespersec`,
        descriptionEn: `Returns a recent hashes per second performance measurement while generating. See the getgenerate and setgenerate calls to turn generation on and off.`,
        detail: `Result:
n            (numeric) The recent hashes per second when generation is on (will return 0 if generation is off)

Examples:
> cryptonite-cli gethashespersec 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gethashespersec", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `getwork`,
        native: false,
        source: `\`rpcmining.cpp\` (function \`getwork\`)`,
        signature: `getwork ( "data" )`,
        descriptionEn: `If 'data' is not specified, it returns the formatted hash data to work on. If 'data' is specified, tries to solve the block and returns true if it was successful.`,
        detail: `Arguments:
1. "data"       (string, optional) The hex encoded data to solve
2. "hash"       (boolean, optional) Return the hash of not accepted block instead of False

Result (when 'data' is not specified):
{
  "data" : "xxxxx",      (string) The block data
  "target" : "xxxx"      (string) The little endian hash target
}

Result (when 'data' is specified):
true|false       (boolean) If solving the block specified in the 'data' was successfull

Examples:
> cryptonite-cli getwork 
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getwork", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
      {
        name: `setgenerate`,
        native: false,
        source: `\`rpcmining.cpp\` (function \`setgenerate\`)`,
        signature: `setgenerate generate ( genproclimit )`,
        descriptionEn: `Set 'generate' true or false to turn generation on or off. Generation is limited to 'genproclimit' processors, -1 is unlimited. See the getgenerate call for the current setting.`,
        detail: `Arguments:
1. generate         (boolean, required) Set to true to turn on generation, off to turn off.
2. genproclimit     (numeric, optional) Set the processor limit for when generation is on. Can be -1 for unlimited.
                    Note: in -regtest mode, genproclimit controls how many blocks are generated immediately.

Examples:

Set the generation on with a limit of one processor
> cryptonite-cli setgenerate true 1

Check the setting
> cryptonite-cli getgenerate 

Turn off generation
> cryptonite-cli setgenerate false

Using json rpc
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setgenerate", "params": [true, 1] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/`,
      },
    ],
  },
];