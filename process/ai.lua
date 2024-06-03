local json = require('json')

_0RBIT = "BaMK1dfayo75s3q1ow6AO64UDpD9SEFbeE8xYrY2fyQ"
_0RBT_TOKEN = "BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc"
FEE_AMOUNT = "1000000000000" -- 1 $0RBT

RESPONSE_TABLE = RESPONSE_TABLE or {}

Handlers.add(
    "PostTopic",
    Handlers.utils.hasMatchingTag("Action", "Post-Topic"),
    function(msg)
        local url = "https://ai-blog-ad8c.onrender.com/generate"
        local title = msg.Topic
        local processID = msg.From
        local body = {
            topic = title,
            pid = processID
        }
        RESPONSE_TABLE[processID] = nil
        Send({
            Target = _0RBT_TOKEN,
            Action = "Transfer",
            Recipient = _0RBIT,
            Quantity = FEE_AMOUNT,
            ["X-Url"] = url,
            ["X-Action"] = "Post-Real-Data",
            ["X-Body"] = json.encode(body)
        })
        print(Colors.red .. "Sent POST Request to 0rbit💫")
    end
)

Handlers.add(
    "ReceiveResponse",
    Handlers.utils.hasMatchingTag("Action", "Receive-Response"),
    function(msg)
        local res = json.decode(msg.Data)
        print(res)

        RESPONSE_TABLE[res.process] = res.data

        print(Colors.red .. "Received Response from 0rbit💫")
    end
)

Handlers.add(
    "GetResponse",
    Handlers.utils.hasMatchingTag("Action", "Get-Response"),
    function(msg)
        Handlers.utils.reply(RESPONSE_TABLE)(msg)
    end
)
