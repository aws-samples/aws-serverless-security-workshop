#!/bin/bash

# Cloud9 Bootstrap Script
#
# Tested on Amazon Linux 2
#
# 1. Installs JQ
# 2. Creates Environment Variables
# 3. NPM Installs and Deploys Application
#
# Usually takes less than one minute to complete

set -euxo pipefail

RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

function _logger() {
    echo -e "$(date) ${YELLOW}[*] $@ ${NC}"
}

function install_utility_tools() {
    _logger "[+] Installing jq"
    sudo yum install -y jq
}

function setstackname() {
    _logger "[+] Setting StackName"
    export stack_name=$(aws cloudformation list-stacks --query 'StackSummaries[].StackName'| grep mod | sed 's/"//g')
    echo $stack_name
}


function setclustername() {
    _logger "[+] Setting Auora Cluster name"
    sed -i "s/secure-aurora-cluster.cluster-xxxxxxx.xxxxxxx.rds.amazonaws.com/$AuroraEndpoint/g" /home/ec2-user/environment/aws-serverless-security-workshop/src/app/dbUtils.js
}

function setregion() {
    _logger "[+] Setting region"
    echo export "REGION=$(curl --silent http://169.254.169.254/latest/dynamic/instance-identity/document | jq -r .region)" >> ~/.bashrc
    echo  "REGION=$(curl --silent http://169.254.169.254/latest/dynamic/instance-identity/document | jq -r .region)" >>/home/ec2-user/environment/aws-serverless-security-workshop/scratch.txt
}

function setcfoutput() {
    # load outputs to env vars
    _logger "[+] get Cloudformation outputs and set variables"
    for output in $(aws cloudformation describe-stacks --stack-name $stack_name --query 'Stacks[].Outputs[].OutputKey' --output text)
    do
        export $output=$(aws cloudformation describe-stacks --stack-name $stack_name --query 'Stacks[].Outputs[?OutputKey==`'$output'`].OutputValue' --output text)
        echo "$output=$(aws cloudformation describe-stacks --stack-name $stack_name --query 'Stacks[].Outputs[?OutputKey==`'$output'`].OutputValue' --output text)" >> ~/.bashrc
        echo "$output=$(aws cloudformation describe-stacks --stack-name $stack_name --query 'Stacks[].Outputs[?OutputKey==`'$output'`].OutputValue' --output text)" >> /home/ec2-user/environment/aws-serverless-security-workshop/scratch.txt
        #eval "echo $output : \"\$$output\"" 
    done
    
}

function deployapp() {
    _logger "[+] Deploying app"
    cd ~/environment/aws-serverless-security-workshop/src/app
    npm install
    cd  ~/environment/aws-serverless-security-workshop/src
    sam deploy --stack-name CustomizeUnicorns --s3-bucket $DeploymentS3Bucket --capabilities CAPABILITY_IAM || true
    cd  ~/environment/aws-serverless-security-workshop/

}

function getapiurl(){
    sam_stack_name="CustomizeUnicorns"
    echo " " >> /home/ec2-user/environment/aws-serverless-security-workshop/scratch.txt
    echo "-------------------------------------------" >> /home/ec2-user/environment/aws-serverless-security-workshop/scratch.txt
    echo "API Gateway URL:" >> /home/ec2-user/environment/aws-serverless-security-workshop/scratch.txt
    echo "$(aws cloudformation describe-stacks --stack-name $sam_stack_name --query 'Stacks[].Outputs[].OutputValue' --output text)" >> /home/ec2-user/environment/aws-serverless-security-workshop/scratch.txt

}

function main() {
    install_utility_tools
    setstackname
    setcfoutput
    setclustername
    deployapp
    getapiurl
    
    exec ${SHELL}
}

main
