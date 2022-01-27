import { createElement } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';
import WiredOpportunities from '../wiredOpportunities';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

// Realistic data with a list of Opps
const mockGetOppList = require('./data/getOppList.json');
  
// An empty list of records to verify the component does something reasonable
// when there is no data to display
const mockGetOppListNoRecords = require('./data/getOppListNoRecords.json');
  
// Register as Apex wire adapter. Some tests verify that provisioned values trigger desired behavior.
const getOppListAdapter = registerApexTestWireAdapter(getOpportunities);

// Mock data for combobox options
const mockGetComboBoxList = require('./data/getComboBoxList.json');

describe('c-wired-opportunities', () => {
	afterEach(() => {
	  // The jsdom instance is shared across test cases in a single file so reset the DOM
	  while(document.body.firstChild) {
		document.body.removeChild(document.body.firstChild);
	  }

	  // Prevent data saved on mocks from leaking between tests
	  jest.clearAllMocks();
	});

	it('renders 3 records', () => {
		const element = createElement('c-wired-opportunities', {
		  is: WiredOpportunities
		});

		document.body.appendChild(element);

		// Emit data from @wire
		getOppListAdapter.emit(mockGetOppList);
        
		return Promise.resolve().then(() => {
		  // Select elements for validation
		  const oppTable = element.shadowRoot.querySelector("lightning-datatable");
		  expect(oppTable.data.length).toBe(mockGetOppList.length);
		});

		//debug
		expect(element.test.length).toBe(3);
	});

	it('renders 0 records', () => {
		const element = createElement('c-wired-opportunities', {
		  is: WiredOpportunities
		});

		document.body.appendChild(element);

		// Emit data from @wire
		getOppListAdapter.emit(mockGetOppListNoRecords);
        
		return Promise.resolve().then(() => {
		  // Select elements for validation
		  const oppTable = element.shadowRoot.querySelector("lightning-datatable");
		  expect(oppTable.data.length).toBe(mockGetOppListNoRecords.length);
		});
	});

	it('renders correct data', () => {
		const element = createElement('c-wired-opportunities', {
		  is: WiredOpportunities
		});

		document.body.appendChild(element);

		// Emit data from @wire
		getOppListAdapter.emit(mockGetOppList);
        
		return Promise.resolve().then(() => {
		  // Select elements for validation
		  const oppTable = element.shadowRoot.querySelector("lightning-datatable");
		  expect(oppTable.data[0].Id).toBe(mockGetOppList[0].Id);
		  expect(oppTable.data[0].Name).toBe(mockGetOppList[0].Name);
		  expect(oppTable.data[0].StageName).toBe(mockGetOppList[0].StageName);
		  expect(oppTable.data[0].CloseDate).toBe(mockGetOppList[0].CloseDate);
		  expect(oppTable.data[1].Id).toBe(mockGetOppList[1].Id);
		  expect(oppTable.data[1].Name).toBe(mockGetOppList[1].Name);
		  expect(oppTable.data[1].StageName).toBe(mockGetOppList[1].StageName);
		  expect(oppTable.data[1].CloseDate).toBe(mockGetOppList[1].CloseDate);
		  expect(oppTable.data[2].Id).toBe(mockGetOppList[2].Id);
		  expect(oppTable.data[2].Name).toBe(mockGetOppList[2].Name);
		  expect(oppTable.data[2].StageName).toBe(mockGetOppList[2].StageName);
		  expect(oppTable.data[2].CloseDate).toBe(mockGetOppList[2].CloseDate);
		});
	});

	it('ComboBox has 11 options', () => {
		const element = createElement('c-wired-opportunities', {
		  is: WiredOpportunities
		});

		document.body.appendChild(element);
        
		return Promise.resolve().then(() => {
			// Select elements for validation
			const comboBox = element.shadowRoot.querySelector("lightning-combobox");
			expect(comboBox.options.length).toBe(mockGetComboBoxList.length);
		});
	});
});