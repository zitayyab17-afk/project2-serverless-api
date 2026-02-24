terraform {
  backend "s3" {
    bucket         = "project2-terraform-state-file"             # your S3 bucket name
    key            = "project2-serverless-api/terraform.tfstate" # path inside bucket
    region         = "eu-west-2"
    dynamodb_table = "project2-terraform-lock"
    encrypt        = true
  }
}
