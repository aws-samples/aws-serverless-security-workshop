# Module 6: WAF 

AWS WAF is a web application firewall that helps protect your web applications from common web exploits that could affect application availability, compromise security, or consume excessive resources. For example, you can reject requests that matches **SQL injection** and **Cross-Site Scripting (XSS)**. Additionally, you can filter web requests based on **IP address**, **geographic area**, **request size**, and/or string or **regular expression** patterns using the rules. You can put these conditions on HTTP headers or body of the request itself, allowing you to create complex rules to block attacks from specific user-agents, bad bots, or content scrapers. You can also take advantage of **Managed Rules** from **AWS Marketplace** to get immediate protections for your APIs from common threats, such as OWASP Top 10 security risks and Common Vulnerabilities and Exposures (CVE).


In this module, you will create a WAF ACL and attach it to the API Gateway we created.

### Module 6A: Create a WAF ACL 

1. Go to the [AWS WAF Console](https://console.aws.amazon.com/waf/home)

1. Click on **Create web ACL**

1. In Step 1 of the ACL creation wizard, fill in:

	* **Web ACL Name**: `ProtectUnicorn`
	* **CloudWatch metric name**: this should be automatically populated for you
	* **Region**: select the AWS region you chose for previous steps of the workshop
	* **Resource type to associate with web ACL**: Pick `API Gateway`
	* **Amazon API Gateway API**: Pick the API Gateway we deployed previously, `CustomizeUnicorns`
	* **Stage**: select `dev`

	![screenshot](images/web-acl-name.png)
	
	and click **Next**

### Module 6B: Create WAF conditions

1. Next you will create 2 different conditions. Let's start with a condition to restrict the maximum size of request body: 

	* Go to **Size constraint conditions** section, click **Create condition**
	* Give the condition a name, like `LargeBodyMatch`
	* In Filter settings, add a filer on 
		*  	**Part of the request to filter on**: body
		*  **Comparison operator**: Greater than
		*  **Size (Bytes)**: 3000
	* Click **Add filter**  
	* After the filter is added to the condition, click **Create**

	![screenshot](images/large-body-condition.png)
	

1. Next, let's add a SQL injection condition. 

	* Go to **SQL injection match conditions** section, click **Create condition**
	* Give the condition a name, like `SQLinjectionMatch`
	* Here, we want to add multiple rules to inspect multiple aspects of the request: request body, request URI and query strings 
	* In the **Filter settings**, add 4 filters:

		<table>
		  <tr>
		    <th></th>
		    <th>Part of the request to filter on</th>
		    <th>Transformation</th>
		  </tr>
		  <tr>
		    <td>1</td>
		    <td>Body</td>
		    <td>None</td>
		  </tr>
		  <tr>
		    <td>2</td>
		    <td>Body</td>
		    <td>URL decode</td>
		  </tr>
		  <tr>
		    <td>3</td>
		    <td>URI</td>
		    <td>URL decode</td>
		  </tr>
		  <tr>
		    <td>4</td>
		    <td>Query string</td>
		    <td>URL decode</td>
		  </tr>
		</table>
	* Click **Create**
	
	![screenshot](images/sql-condition.png)

### Module 6C: Create WAF rules


1.  Next, we create **Rules** that are composed of one or more **Conditions**. Let's start by creating a rule based on the request body size condition:

	* Click **Create Rule** 
	* Give it a name, like `LargeBodyMatchRule`
	* For 	**Rule type**, keep `Regular rule`
	* In Add conditions section, select 
		* 	`does`
		*  `match at least one of the filters in the size constraint condition `
		*  `LargeBodyMatch`  -- the name of the condition we created for large request body in 6B 


	![screenshot](images/large-body-rule.png)
	
1. Next, we create the rule for SQL injection. 

	* Click **Create Rule** 
	* Give it a name, like `SQLinjectionRule`
	* For **Rule type**, keep `Regular rule`
	* In Add conditions section, select 
		* 	`does`
		*  `match at least one of the filters in the SQL injection match condition `
		*  `SQlInjectionMatch`  -- the name of the condition we created for SQL injection in 6B 
	*  Click **Add condition** 
	*  Then click **Create**

	![screenshot](images/sql-rule.png)

1. Lastly, we can create a rate-based rule that prevents an overwhelming number of requests (either valid or invalid) from flooding our API:

	* Click **Create Rule** 
	* Give it a name, like `RequestFloodRule`
	* For **Rule type**, select `Rate-based rule`
	* For **Rate limit**, use `2000` 
	*  Click **Add condition** 
	*  Then click **Create**

	![screenshot](images/request-flood-rule.png)
	
1. You should now see 3 rules in like below. Ensure you select `Block` if the request matches any of the rules. 
 
	For **Default action**, select `Allow all requests that don't match any rules`

	![screenshot](images/list-rules.png)

1. Click **Review and create** 

1. In the next page, review the configuration and click **Confirm and Create** 	
	
	![screenshot](images/review-acl.png)

You have now added a WAF to our API gateway stage! 

### Module 6D: Test requests with WAF protection 

## Next Step 

Return to the workshop [landing page](../../README.md) to pick another module.
