import { getOpenaiApiKeySecret } from "./getApiKey.js";
import { makeApiRequest } from "./makeApiRequest.js";

async function handler(event) {
  const apiKey = await getOpenaiApiKeySecret();
  const body = JSON.parse(event.body || "{}");
  const prompt = body.prompt || "You are a helpful assistant.";
  const apiResponse = await makeApiRequest(apiKey, prompt);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: apiResponse,
    }),
  };

  return response;
}

export { handler };
