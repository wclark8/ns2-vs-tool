/*
* this is mostly to keep azures load balancer in check
*/

class ComparisonProgress {
    _progressValue = 0;
    _comparisonComplete = false;
    _comparisonID;

    get progressValue() {
        return this._progressValue;
    }

    set progressValue(progressValue){
        this._progressValue = progressValue;
    }

    get comparisonComplete() {
        return this._comparisonComplete;
    }

    set comparisonComplete(comparisonComplete) {
        this._comparisonComplete = comparisonComplete;
    }

    get comparisonID() {
        return this._comparisonID;
    }

    set comparisonID(comparisonID) {
        this._comparisonID = comparisonID;
    }

    increaseProgressValue(value) {
        let newVal = this._progressValue + value;
        this._progressValue = newVal;
    }

}

module.exports = ComparisonProgress;