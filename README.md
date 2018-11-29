# Serverless Security Workshop

In this workshop, you will learn techniques to secure a serverless application built with AWS Lambda, Amazon API Gateway and RDS Aurora. We will cover AWS services and features you can leverage to improve the security of a serverless applications in 5 domains: 

1. identity & access management
1. infrastructure
1. data
1. code
1. logging & monitoring

You'll start by deploying a simple serverless application that allows third party companies to submit unicorn customizations. This will help Wild Rydes receive ad revenue and allow  third party companies to market their brand leveraging Wild Rydes's popularity. 

The simple serverless application has the below architecture to start with:

![architecture-diagram](docs/00-initial-setup/images/00-base-architecture.png)

However, this simple serverless application is not very secure, and we need your help to implement measures to protect this serverless API from attackers. 

By following different modules covering various aspects of security, you will help improve the security of the simple serverless application. 

## Presentation Slides
You can find the presentation slides in the `slides` branch of this git repo, under the `presentation/` folder

## Workshop Modules

**Note**: The workshop is designed so you don't have to complete all the modules in order, with the exception of module 0: <span style="color:red;font-weight:bold"> You must start with module 0 before you work on other modules!</span>

Click on the link to module 0 below to get started deploying the simple serverless application that you will spend the rest of the workshop securing! 

<a href="docs/00-initial-setup/"><img src="docs/images/module0.png" alt="module 1" height="90" width="140" width="150" width="185"></a>

Here's an overview of the modules in this workshop and how they map to different areas of security:

<table style="text-align:center width:100%" align="center" >
  <tr>
    <th rowspan="3" width="20%"> 
    	Identity & Access ⚔ <br> 
    	<a href="docs/01-add-authentication/"><img src="docs/images/moduel1.png" alt="module 1" height="90" width="140" width="150" width="185"></a>
	 </th>
    <th width="60%">
    	<span style="font-weight:bold">Code 🏰</span> <br> 
    	<a href="docs/02-add-secrets-manager/"><img src="docs/images/module2.png" alt="module 2" height="90" width="140" width="150" width="185"></a>
    	<a href="docs/03-input-validation/"><img src="docs/images/module3.png" alt="module 3" height="90" width="140" width="150" width="185"></a>
    	<a href="docs/07-dependency-vulnerability/"><img src="docs/images/module7.png" alt="module 3" height="90" width="140" width="150" width="185" ></a>
    </th>
    <th width="20%" colspan="3" rowspan="3">Logging & Monitoring 🕶
    	<a href="docs/08-xray/"><img src="docs/images/module8.png" alt="module 3" height="90" width="140" width="150" width="185"></a>
</th>
  </tr>
  <tr >
    <td align="center" width="60%">
    	<span style="font-weight:bold">Data 🏆</span><br> 	    
    	<a href="docs/04-ssl-in-transit/"><img src="docs/images/module4.png" alt="module 4" height="90" width="140" width="150" width="185"></a>
    </td>
  </tr>
  <tr>
    <td align="center" width="60%"><span style="font-weight:bold">Infrastructure 🛡</span><br> 
 		<a href="docs/05-usage-plan/"><img src="docs/images/module5.png" alt="module 5" height="90" width="140" width="150" width="185"></a>
  		<a href="docs/06-waf/"><img src="docs/images/module6.png" alt="module 6" height="90" width="140" width="150" width="185"></a>
	</td>
    </tr>
</table>

## Resource cleanup

Click below to go to the resource cleanup steps: 


<a href="docs/10-resource-cleanup/"><img src="docs/images/cleanup.png" alt="module 2" height="90" width="140" width="150" width="185"></a>



## License Summary

The documentation is made available under the Creative Commons Attribution-ShareAlike 4.0 International License. See the LICENSE file.

The sample 
within this documentation is made available under a modified MIT license. See the LICENSE-SAMPLECODE file.
