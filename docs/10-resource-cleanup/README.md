# Resource clean up

This page provides instructions for cleaning up the resources created during the preceding modules.

## Resource Cleanup Instructions

1. Delete Cognito User pool domain that you created if you created one in **Module 1: Auth**

	<details>
	<summary><strong>Click here to expand for detailed instructions </strong></summary><p>
	
	1. Go to the [Cognito Console](https://console.aws.amazon.com/cognito/home)
	1. Go to **Manage User Pools**
	1. Choose `CustomizeUnicorns-users` user pool
	1. Go to **Domain name** under **App integration**
	1. Click **Delete domain** 
	1. Confirm the deletion

	</details>

1. Delete API Gateway Usage plan if you created one in **Module 5: Usage Plans**

	<details>
	<summary><strong>Click here to expand for detailed instructions </strong></summary><p>
	
	1. Go to the [API Gateway Console](https://console.aws.amazon.com/apigateway/home)
	1. Go to **Usage plans**
	1. Go to the `Basic` Usage Plan
	1. In the **Details** tab under **Associated API Stages**, remove the `CustomizeUnicorns` API
	1. On the upper right hand corner, click on **Actions** and choose **Delete Usage Plan**
 
	</details>


1. Delete the secret from AWS Secrets Manager if you created one in **Module 2: Secrets**

	<details>
	<summary><strong>Click here to expand for detailed instructions </strong></summary><p>
	
	1. Go to the [Secrets Manager Console](https://console.aws.amazon.com/secretsmanager/home)
	1. Select the `secure-serverless-db-secret` secret
	1. In **Actions** select **Delete secret** 
	1. Enter `7` (minimum waiting period) for waiting period and click **Schedule deletion**

	</details>

1. Delete the AWS WAF if you created one in **Module 6: WAF**

1. Delete `CustomizeUnicorns` CloudFormation stack

	<details>
	<summary><strong>Click here to expand for detailed instructions </strong></summary><p>
	
	1. Go to the [CloudFormation Console](https://console.aws.amazon.com/cloudformation/home)
	1. Select the `CustomizeUnicorns` Stack
	1. Under **Actions**, choose **Delete Stack**
	
	</details>

1. Empty the deployment s3 bucket:
	
	<details>
	<summary><strong>Click here to expand for detailed instructions </strong></summary><p>
	1. Go to the [S3 Console](https://console.aws.amazon.com/s3/home)
	1. Search for bucket starting with `secure-serverless-deploymentss3bucket`
	1. Click on the checkmark for the bucket and click on the **Empty** button

		![](images/empty-s3-bucket.png)
	
	1. Type in the bucket name to confirm the empty operation 
	</details>
	
1. Delete the `Secure-Serverless` resource setup CloudFormation stack

6. CloudWatch Logs
AWS Lambda automatically creates a new log group per function in Amazon CloudWatch Logs and writes logs to it when your function is invoked. You should delete the log group for the lambda functions. (You can search for log groups starting with `/aws/lambda/CustomizeUnicorn` prefix. 
