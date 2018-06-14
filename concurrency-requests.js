function simpleRequest(callback) {
    setTimeout(() => {
      callback();
    }, Math.random()*1000);
}

function loadBalancer(concurrency) {
    this.concurrency = concurrency;
    this.requestPool = [];
    this.activeRequests = 0;
}

loadBalancer.prototype.newRequest = function(request) {
    this.requestPool.push(request);
    while (this.requestPool.length > 0) {
        if (this.activeRequests < this.concurrency) {
            let curr = this.requestPool.shift();
            let done = () => { 
                this.activeRequests--;
            };
            curr(done);
        }
    }
}