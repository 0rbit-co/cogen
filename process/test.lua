local json = require('json')

Handlers.add(
    "ReceiveResponse",
    Handlers.utils.hasMatchingTag("Action", "Receive-Response"),
    function(msg)
        local res = '{"message": "Hello, world!", "status": 200}'
        local decoded = json.decode(res)
        print("Received response from AI (type): " .. type(res))
        print("Received response from AI (decoded): " .. type(decoded))
        print(msg.Timestamp)

        -- Print the contents of the decoded table
        for key, value in pairs(decoded) do
            print(key .. ": " .. tostring(value))
        end
    end
)
