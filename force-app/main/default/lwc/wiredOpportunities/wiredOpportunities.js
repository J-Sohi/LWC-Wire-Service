import { api, LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';

const columns = [
	{ label: 'Opportunity Name', fieldName: 'Name' },
	//{ label: 'Account Name', fieldName: 'Account.Name', type: 'text'},
    { label: 'Stage', fieldName: 'StageName', type: 'Picklist' },
    { label: 'Amount', fieldName: 'Amount', type: 'Currency' },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date' },
	//{ label: 'Account Name', fieldName: 'AccountId'},
	//{ label: 'Stage', fieldName: 'StageName', type: 'phone' },
	//{ label: 'Balance', fieldName: 'amount', type: 'currency' },
	//{ label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
];

export default class WiredOpportunities extends LightningElement {
	stage = '';
	columns = columns;

	@wire(getOpportunities, { stage: '$stage' })
    opps;

	get options() {
        return [
            { label: 'Prospecting', value: 'Prospecting' },
            { label: 'Qualification', value: 'Qualification' },
            { label: 'Needs Analysis', value: 'Needs Analysis' },
			{ label: 'Value Proposition', value: 'Value Proposition' },
			{ label: 'Id. Decision Makers', value: 'Id. Decision Makers' },
			{ label: 'Perception Analysis', value: 'Perception Analysis' },
			{ label: 'Proposal/Price Quote', value: 'Proposal/Price Quote' },
			{ label: 'Negotiation/Review', value: 'Negotiation/Review' },
			{ label: 'Closed Won', value: 'Closed Won' },
			{ label: 'Closed Lost', value: 'Closed Lost' },
			{ label: 'All', value: 'All' },
        ];
    }
	
	handleChange(event) {
        this.stage = event.detail.value;
    }
}
