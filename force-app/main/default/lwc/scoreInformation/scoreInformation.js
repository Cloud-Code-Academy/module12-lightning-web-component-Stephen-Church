import { LightningElement, api } from 'lwc';

    const numberOfQuestions = 60;

export default class ScoreInformation extends LightningElement {

    @api attemptid;
    @api overallscore = 0;
    @api developerfundamentalsscore = 0;
    @api processautomationandlogicscore = 0
    @api userinterfacescore = 0;
    @api testingdebuggingdeploymentscore = 0;

    handleDeleteAttempt(){
        const deleteAttempt = new CustomEvent('deleteattempt',{
            detail: this.attemptid
        });
        this.dispatchEvent(deleteAttempt);
    }

}