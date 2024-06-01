-- https://ai-blog-ad8c.onrender.com/generate
local json = require('json')
Send({
    Target = "BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc",
    Action = "Transfer",
    Recipient = "4_jJUtiNjq5Xrg8OMrEDo-_bud7p5vbSJh1e69VJ76U",
    Quantity = "1000000000000",
    ["X-Url"] = "https://g8way.0rbit.co/graphql",
    ["X-Action"] = "Post-Real-Data",
    ["X-Body"] = json.encode({
        query = [[
            query {
                transactions(
                    owners: ["vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI"]
                ) {
                    edges {
                        node {
                            id
                        }
                    }
                }
            }
        ]]
    })

})
