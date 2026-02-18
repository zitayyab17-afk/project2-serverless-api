import { DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-west-2" });
const tableName = "ProductTable"; // your existing table

export const handler = async (event) => {
  console.log("EVENT RECEIVED:", JSON.stringify(event, null, 2));

  // Safely get HTTP method
  const method = event.httpMethod || event.requestContext?.http?.method || "GET";

  try {
    if (method === "POST") {
      const body = event.body ? JSON.parse(event.body) : {};
      const productId = body.productId || "defaultId";
      const productName = body.productName || "defaultName";

      const params = {
        TableName: tableName,
        Item: {
          productId: { S: productId },
          productName: { S: productName },
        },
      };

      await client.send(new PutItemCommand(params));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Product added!" }),
      };

    } else if (method === "GET") {
      const result = await client.send(new ScanCommand({ TableName: tableName }));

      const cleanItems = result.Items.map(item => ({
        productId: item.productId.S,
        productName: item.productName.S,
      }));

      return {
        statusCode: 200,
        body: JSON.stringify(cleanItems),
      };

    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Unsupported method" }),
      };
    }
  } catch (err) {
    console.error("ERROR:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error: err.message }),
    };
  }
};
