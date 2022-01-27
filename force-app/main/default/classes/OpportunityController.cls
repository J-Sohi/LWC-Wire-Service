public with sharing class OpportunityController {
    static Opportunity[] oppList = [SELECT Name, Account.Name, StageName, Amount, CloseDate FROM Opportunity];

    public OpportunityController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities(String stage) {
        Opportunity[] oppByStage = new List<Opportunity>();
        
        if(stage == 'All'){
            return oppList;
        }
        else{
            for(Opportunity op:oppList){
                if(op.StageName == stage){
                    oppByStage.add(op);
                }
            }

        }

        // if(stage == 'All'){
        //     oppByStage = [SELECT Name, Account.Name, StageName, Amount, CloseDate FROM Opportunity];
        // }
        // else{
        //     oppByStage = [SELECT Name, Account.Name, StageName, Amount, CloseDate FROM Opportunity WHERE StageName =:stage];
        // }
        
        return oppByStage;
    }
}
