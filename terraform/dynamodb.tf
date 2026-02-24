resource "aws_dynamodb_table" "products" {
  name         = "ProductTable"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "productId"

  attribute {
    name = "productId"
    type = "S"
  }

  tags = {
    Name = "ProductTable-Terraform"
  }
}
