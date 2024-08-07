import { LightningElement } from 'lwc';

    const passingScore = 68;
    const developerFundamentalsWeighting = 23;
    const processAutomationAndLogicWeighting = 30;
    const userInterfaceWeighting = 25;
    const testingDebuggingDeploymentWeighting = 22;
    const labelClosing = "% of the exam. What was your section score?";

export default class Pd1Calculator extends LightningElement {

    developerFundamentalsLabel;
    processAutomationAndLogicLabel;
    userInterfaceLabel;
    testingDebuggingAndDeploymentLabel;

    developerFundamentalsScore = 0;
    processAutomationAndLogicScore = 0;
    userInterfaceScore = 0;
    testingDebuggingDeploymentScore = 0;
    examScore = 0;
    examPassed = false;
    examFailed = false;

    invalidScore = false;

    attemptHistory = [];

    currentHistoryId = 0;

    connectedCallback(){
        this.currentHistoryId = this.attemptHistory.length;
        this.developerFundamentalsLabel = 
            "Developer Fundamentals is " + developerFundamentalsWeighting + labelClosing;
        this.processAutomationAndLogicLabel = 
            "Process Automation and Logic is " + processAutomationAndLogicWeighting + labelClosing;
        this.userInterfaceLabel = 
            "User Interface is " + userInterfaceWeighting + labelClosing;
        this.testingDebuggingAndDeploymentLabel = 
            "Testing, debugging and deployment is " + testingDebuggingDeploymentWeighting + labelClosing;
    }

    handleChange(event){
        const sectionName = event.target.name;
        let newValue = Number(event.target.value);
        switch (sectionName){
            case 'developerFundamentalsScore':
                this.developerFundamentalsScore = newValue;
                break;
            case 'processAutomationAndLogicScore':
                this.processAutomationAndLogicScore = newValue;
                break;
            case 'userInterfaceScore':
                this.userInterfaceScore = newValue;
                break;
            default:
                this.testingDebuggingDeploymentScore = newValue;
        }
    }

    calculateScore(){
        this.invalidScore = false;
        if (this.developerFundamentalsScore > 100 || this.processAutomationAndLogicScore > 100 || this.userInterfaceScore > 100 || this.testingDebuggingDeploymentScore > 100) {
            this.invalidScore = true;
            return;
        }
        
        this.examPassed = false;
        this.examFailed = false;
        
        let weightedDeveloperFundamentalsScore = 
            Number(developerFundamentalsWeighting / 100) * this.developerFundamentalsScore;
        let weightedProcessAutomationAndLogicScore = 
            Number(processAutomationAndLogicWeighting / 100) * this.processAutomationAndLogicScore;
        let weightedUserInterfaceScore = 
            Number(userInterfaceWeighting / 100) * this.userInterfaceScore;
        let weightedTestingDebuggingDeploymentScore = 
            Number(testingDebuggingDeploymentWeighting / 100) * this.testingDebuggingDeploymentScore;
        
        this.examScore =
            weightedDeveloperFundamentalsScore + 
            weightedProcessAutomationAndLogicScore + 
            weightedUserInterfaceScore + 
            weightedTestingDebuggingDeploymentScore;

        if (this.examScore >= passingScore) {
            this.examPassed = true;
            this.attemptHistory = [];
            this.currentHistoryId = 0;
        } else {
            this.examFailed = true;
            this.addAttemptHistory();
        }
    }

    addAttemptHistory(){
        this.currentHistoryId ++;
        const attempt = {
            Id: this.currentHistoryId, 
            overallScore: this.examScore,
            developerFundamentalsScore: this.developerFundamentalsScore,
            processAutomationAndLogicScore: this.processAutomationAndLogicScore,
            userInterfaceScore: this.userInterfaceScore,
            testingDebuggingDeploymentScore: this.testingDebuggingDeploymentScore        
        }
        this.attemptHistory = [...this.attemptHistory, attempt];
    }

    deleteAttemptHandler(Event){
        let attemptId = Event.detail;
        this.attemptHistory = this.attemptHistory.filter(attempt => attempt.Id != attemptId);
        if (this.attemptHistory.length === 0) {
            this.examFailed = false;
        }
    }
}