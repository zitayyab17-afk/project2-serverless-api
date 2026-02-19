terraform {
  backend "s3" {
    bucket         = "project2-terraform-state-file" 
    key            = "project2-serverless-api/terraform.tfstate"
    region         = "eu-west-2"            
    dynamodb_table = "project2-terraform-lock"
    encrypt        = true
  }
}
