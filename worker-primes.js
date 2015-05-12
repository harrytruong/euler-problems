// main PrimeSieve class
var PrimeSieve = function (){
    this.sieve = [];
    this.low = 3;
    this.high = 100;
}

// initialize sieve container
PrimeSieve.prototype.init = function(range){
    this.sieve = [];
    this.low = range[0]; 
    this.high = range[1];
};

// update sieve by marking new number
PrimeSieve.prototype.mark = function(nums){
    if (! (nums instanceof Array)) nums = [nums];
    
    var sieve = this.sieve
      , low = +this.low
      , high = +this.high;
    for (var i in nums){
        var n = +(nums[i]);
        for (var i = Math.ceil(low / n) * n; i < high; i += n){
            sieve[i] = true;
        }
    };
};

// find primes
// var primes = [];
PrimeSieve.prototype.findPrimes = function(){
    var sieve = this.sieve
      , low = this.low
      , high = this.high;
    
    var primes = [];
    for (var i = low & 1 ? low : low+1; i < high; i += 2){
        if (sieve[i] !== true){
            primes.push(i);
            this.mark(i);
        }
    }
    
    self.postMessage({prime: primes});
};

// test for sieve marking
PrimeSieve.prototype.test = function(n){
    var n = n - this.low;
    return this.sieve[n] !== true;
};

// return current status
PrimeSieve.prototype.status = function(){
    return {
        sieve: this.sieve
      , low: this.low
      , high: this.high
    };
};

// initialize new PrimeSieve
var primeSieve = new PrimeSieve();

// catch incoming input, proxy to method
self.addEventListener('message', function(e) {
    for (var k in e.data) if (primeSieve[k]) {
        var res = primeSieve[k](e.data[k])
          , reply = {};
        reply[k] = res;
        if (res !== undefined) self.postMessage(reply);
    }
}, false);