/*
* this is mostly to keep azures load balancer in check
*/

class ComparisonProgress {
    _progressValue = 0;

    get progressValue() {
        return this._progressValue;
    }

    set progressValue(progressValue){
        this._progressValue = progressValue;
    }

    increaseProgressValue(value) {
        let newVal = this._progressValue + value;
        this._progressValue = newVal;
    }

}

module.exports = ComparisonProgress;