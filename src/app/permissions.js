const AWS = require("aws-sdk")
const client = new AWS.VerifiedPermissions()
const policyStoreId = process.env.AVP_POLICY_STORE_ID
const policyTemplateId = process.env.AVP_POLICY_TEMPLATE_ID

// define all actions for readbility 
const ACTIONS = {
    'GET:/customizations/{id}': 'GetUnicorn',
    'DELETE:/customizations/{id}': 'DeleteUnicorn'
}

module.exports = {
    
    isAuthorized: async function (principal, action, httpMethod, resource, entities = null) {
        action = ACTIONS[httpMethod + ':' + action] || "unknown_action"
        var params = {
            policyStoreId: policyStoreId,
            principal: {
                    entityId: principal,
                    entityType: 'WildRydes::User'
            },
            action: {
                    actionId: action,
                    actionType: 'WildRydes::Action'
            },
            resource: {
                    entityId: resource,
                    entityType: 'WildRydes::Unicorn'
            }
        }
        console.log('AVP params:' + JSON.stringify(params))
        
        const response = await client.isAuthorized(params).promise()
        console.log('AVP response:' + JSON.stringify(response))
        
        if (response['decision'] === 'ALLOW') {
            return true
        }
        return false
    },
    
    createTemplateLinkedPolicy: async function(principal, resource) {
        var params = {
            definition: {
                templateLinked: {
                    policyTemplateId: policyTemplateId,
                    principal: {
                        entityId: principal,
                        entityType: 'WildRydes::User'
                    },
                    resource: {
                        entityId: resource.toString(),
                        entityType: 'WildRydes::Unicorn'
                    }
                }
            },
            policyStoreId: policyStoreId
        }
        
        console.log('AVP params:' + JSON.stringify(params))
        const response = client.createPolicy(params).promise()
        console.log('AVP response:' + JSON.stringify(response))
        return response
    },
    
    listPolicies: async function (principal, resource = null) {
        var params = {
            policyStoreId: policyStoreId,
            filter: {
                policyTemplateId: policyTemplateId,
                policyType: "TEMPLATE_LINKED",
                principal: {
                    identifier: {
                        entityId: principal,
                        entityType: 'WildRydes::User'
                    }
                }
            }
        }
        
        if (resource) {
            params['filter']['resource'] = {
                identifier: {
                        entityId: resource.toString(),
                        entityType: 'WildRydes::Unicorn'
                }
            }
        }

        console.log('AVP params:' + JSON.stringify(params))
        const response = await client.listPolicies(params).promise()
        console.log('AVP response:' + JSON.stringify(response))
        return response
    },
    
    deletePolicy: async function(principal, resource) {
        const policies = await module.exports.listPolicies(principal, resource)
        var response = {}
        
        if ('policies' in policies && policies['policies'].length > 0) {
            var policyId = policies['policies'][0]['policyId']
    
            var params = {
                policyStoreId: policyStoreId,
                policyId: policyId
            }
            
            console.log('AVP params:' + JSON.stringify(params))
            response = client.deletePolicy(params).promise()
            console.log('AVP response:' + JSON.stringify(response))
        }
        else {
            console.log('No AVP policies found')
        }
        
        return response
    }
}



