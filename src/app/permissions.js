import { VerifiedPermissionsClient, IsAuthorizedCommand, CreatePolicyCommand, ListPoliciesCommand, DeletePolicyCommand } from "@aws-sdk/client-verifiedpermissions"; // ES Modules import

const clientIsAuth = new VerifiedPermissionsClient({});
const clientCreatePolicy = new VerifiedPermissionsClient({});
const clientListPolicies = new VerifiedPermissionsClient({});
const clientDeletePolicy = new VerifiedPermissionsClient({});

const policyStoreId = process.env.AVP_POLICY_STORE_ID
const policyTemplateId = process.env.AVP_POLICY_TEMPLATE_ID

// define all actions for readbility 
const ACTIONS = {
    'GET:/customizations/{id}': 'GetUnicorn',
    'DELETE:/customizations/{id}': 'DeleteUnicorn'
}

export const permissions = {
    
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
        
        const command = new IsAuthorizedCommand(params);
        const response = await clientIsAuth.send(command);
        
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
        };
        
        console.log('AVP params:' + JSON.stringify(params));
        const commandCreatePol = new CreatePolicyCommand(params);
        const responseCreatePol = await clientCreatePolicy.send(commandCreatePol);
        console.log('AVP response:' + JSON.stringify(responseCreatePol));
        return responseCreatePol;
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
        const commandListPol = new ListPoliciesCommand(params);
        const responseListPol = await clientListPolicies.send(commandListPol);
        console.log('AVP response:' + JSON.stringify(responseListPol))
        return responseListPol
    },
    
    deletePolicy: async function(principal, resource) {
        const policies = await this.listPolicies(principal, resource);
        var responseDeletePolicy = {}
        
        if ('policies' in policies && policies['policies'].length > 0) {
            var policyId = policies['policies'][0]['policyId']
    
            var params = {
                policyStoreId: policyStoreId,
                policyId: policyId
            }
            
            console.log('AVP params:' + JSON.stringify(params))
            const commandDeletePolicy = new DeletePolicyCommand(params);
            responseDeletePolicy = await clientDeletePolicy.send(commandDeletePolicy);
            console.log('AVP response:' + JSON.stringify(responseDeletePolicy))
        }
        else {
            console.log('No AVP policies found')
        }
        
        return responseDeletePolicy;
    }
}



