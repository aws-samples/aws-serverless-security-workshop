#!/bin/bash

# Cloud9 Bootstrap Script
# updated 12/6/2022 
# Tested on Amazon Linux 2
# Checks for AWS Event or Cloudformation setup
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
    export stack_name=$(aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE --query 'StackSummaries[].StackName'| grep 'mod\|"Secure-Serverless"' | sed 's/[",\,]//g') 
    
    if [ "$stack_name" = "" ];
        then
            echo "Stack Set missing.  Check out running the stack set in the instructions."
            exit 0
        else
            echo $stack_name
    fi
}


function setclustername() {
    _logger "[+] Setting Auora Cluster name"
    sed -i "s/secure-aurora-cluster.cluster-xxxxxxx.xxxxxxx.rds.amazonaws.com/$AuroraEndpoint/g" /Workshop/src/app/dbUtils.js
}

function setregion() {
    _logger "[+] Setting region"
    #echo export REGION=$(aws ec2 describe-availability-zones --output text --query 'AvailabilityZones[0].[RegionName]') >> ~/.bashrc
    ##echo export "REGION=$(curl --silent http://169.254.169.254/latest/dynamic/instance-identity/document | jq -r .region)" >> ~/.bashrc
    export "REGION=$(aws ec2 describe-availability-zones --output text --query 'AvailabilityZones[0].[RegionName]')" >> ~/.bashrc
    echo "REGION=$(aws ec2 describe-availability-zones --output text --query 'AvailabilityZones[0].[RegionName]')" >>/Workshop/scratch.txt
}

function checkfile(){
        #check for file
    export FILE=/Workshop/src/app/dbUtils.js
    if [ -f $FILE ];
    then
        echo "Files cloned from Git!"
    else
        echo "Missing files. Please be sure to clone the file from Git: git clone https://github.com/aws-samples/aws-serverless-security-workshop.git"
        exit 0
    fi
}

function setcfoutput() {
    
    # load outputs to env vars
    _logger "[+] get Cloudformation outputs and set variables"
    for output in $(aws cloudformation describe-stacks --stack-name $stack_name --query 'Stacks[].Outputs[].OutputKey' --output text)
    do
        export $output=$(aws cloudformation describe-stacks --stack-name $stack_name --query 'Stacks[].Outputs[?OutputKey==`'$output'`].OutputValue' --output text)
        echo "$output=$(aws cloudformation describe-stacks --stack-name $stack_name --query 'Stacks[].Outputs[?OutputKey==`'$output'`].OutputValue' --output text)" >> ~/.bashrc
        echo "$output=$(aws cloudformation describe-stacks --stack-name $stack_name --query 'Stacks[].Outputs[?OutputKey==`'$output'`].OutputValue' --output text)" >> /Workshop/scratch.txt
        #eval "echo $output : \"\$$output\"" 
    done
    
}

function deployapp() {
    _logger "[+] Deploying app"
    cd /Workshop/src/app
    export UV_USE_IO_URING=0
    npm install
    cd  /Workshop/src
    sam deploy --stack-name CustomizeUnicorns --s3-bucket $DeploymentS3Bucket --region $REGION --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND || true
    cd  /Workshop/

}

function getapiurl(){
    sam_stack_name="CustomizeUnicorns"
    echo " " >> /Workshop/scratch.txt
    echo "-------------------------------------------" >> /Workshop/scratch.txt
    echo "API Gateway URL:" >> /Workshop/scratch.txt
    echo "$(aws cloudformation describe-stacks --stack-name $sam_stack_name --query 'Stacks[].Outputs[].OutputValue' --output text)" >> /Workshop/scratch.txt

}

function main() {
    install_utility_tools
    checkfile
    setstackname
    setcfoutput
    setclustername
    setregion
    deployapp
    getapiurl
    
    exec ${SHELL}
}

main