import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

// Create a Secrets Manager client
const client = new SecretsManagerClient({ region: "us-east-1" }); // Replace with your region

export const getOpenaiApiKeySecret = async () => {
  try {
    const command = new GetSecretValueCommand({ SecretId: "openai/apikey" });
    const data = await client.send(command);
    return JSON.parse(data.SecretString)["openai-api-key"];
  } catch (err) {
    console.error("Error fetching secret:", err);
    throw err;
  }
};
