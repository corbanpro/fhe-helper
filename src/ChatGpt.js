export async function getChatGPTResponse(prompt) {
  console.log(prompt);
  const res = await fetch("https://ibxyo7w422jufs5mdf2wqa3tki0sbiyf.lambda-url.us-east-1.on.aws/", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  }).then((response) => response.json());
  return res.message;
}
