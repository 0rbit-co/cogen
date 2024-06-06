-- Load the JSON library
local json = require('json')

-- Constants
_0RBIT = "BaMK1dfayo75s3q1ow6AO64UDpD9SEFbeE8xYrY2fyQ"
_0RBT_TOKEN = "BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc"
FEE_AMOUNT = "1000000000000" -- 1 $0RBT

-- Table to store responses
RESPONSE_TABLE = RESPONSE_TABLE or {}

-- Handler to post a topic
/*
    @dev 0xSarthak13
    This handler is triggered when an action with the tag "Post-Topic" is received.
    It constructs a request body with the provided Topic and Process ID,
    and sends a transfer to the 0rbit contract with the request details and fee.
    The URL, action, and request body are included as Forwarded Tags in the Transfer.
*/
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

-- Handler to receive a response from 0rbit
/*
    @dev 0xSarthak13
    This handler is triggered when an action with the tag "Receive-Response" is received.
    It decodes the JSON response data received from the 0rbit service
    and stores it in the RESPONSE_TABLE using the Process ID as the key.
*/
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

-- Handler to get a response
/*
    @dev 0xSarthak13
    This handler is triggered when an action with the tag "Get-Response" is received.
    It replies with the data stored in the RESPONSE_TABLE for the corresponding Process ID.
*/
Handlers.add(
    "GetResponse",
    Handlers.utils.hasMatchingTag("Action", "Get-Response"),
    function(msg)
        Handlers.utils.reply(RESPONSE_TABLE)(msg)
    end
)
