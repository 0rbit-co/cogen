-- https://ai-blog-ad8c.onrender.com
-- Send({
--     Target = "BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc",
--     Action = "Transfer",
--     Recipient = "4_jJUtiNjq5Xrg8OMrEDo-_bud7p5vbSJh1e69VJ76U",
--     Quantity = "1000000000000",
--     ["X-Url"] = "https://ai-blog-ad8c.onrender.com/generate",
--     ["X-Action"] = "Post-Real-Data",
--     ["X-Body"] = json.encode({})
-- })
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
        local title = msg.Tags.Topic
        local processID = msg.Tags.Process
        local body = {
            topic = title,
            pid = processID
        }
        Send({
            Target = _0RBT_TOKEN,
            Action = "Transfer",
            Recipient = _0RBIT,
            Quantity = FEE_AMOUNT,
            ["X-Url"] = url,
            ["X-Action"] = "Post-Real-Data",
            ["X-Body"] = json.encode(body)
        })
    end
)

Handlers.add(
    "ReceiveResponse",
    Handlers.utils.hasMatchingTag("Action", "Receive-Response"),
    function(msg)
        local res = json.decode(msg.Data)
        print("Received response from AI: " .. type(res))
        for key, value in pairs(res) do
            print(key .. ": " .. tostring(value))
        end
        print("Done")
    end
)
