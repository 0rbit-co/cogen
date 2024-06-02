import { createDataItemSigner, message, dryrun } from "@permaweb/aoconnect";

export const createMessage = async (topic: string) => {
  try {
    const msg = await message({
      process: "CB0wY0UgCwnD4t8o_x7pbiICrVk01gCtvUe6mXDFJeA",
      signer: createDataItemSigner(window.arweaveWallet),
      tags: [
        { name: "Action", value: "Post-Topic" },
        { name: "Topic", value: topic },
      ],
    });
    console.log("msg: ", msg);
    return msg;
  } catch (error) {
    console.error("Error creating message: ", error);
    throw error;
  }
};

export const executeDryrun = async (msg: any) => {
  try {
    let Messages = await dryrun({
      message: msg,
      process: "CB0wY0UgCwnD4t8o_x7pbiICrVk01gCtvUe6mXDFJeA",
      tags: [{ name: "Action", value: "Get-Response" }],
    });

    console.log("Messages: ", Messages);
    console.log("Length of Tags: ", Messages.Messages[0].Tags.length);

    await window.arweaveWallet.connect(["ACCESS_ADDRESS"]);
    const userAddress = await window.arweaveWallet.getActiveAddress();
    console.log("Your wallet address is", userAddress);

    for (let i = 0; i < Messages.Messages[0].Tags.length; i++) {
      // console.log(i, " : ", Messages.Messages[0].Tags[i].name);
      if (userAddress === Messages.Messages[0].Tags[i].name) {
        return Messages.Messages[0].Tags[i].value;
      }
    }
    return "Error";
  } catch (error) {
    console.error("Error in dryrun execution: ", error);
    throw error;
  }
};