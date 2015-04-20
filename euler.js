
// helper to generate primes 
// (tweaked from problem #26)
function generatePrimes(limit){
    var sieve = [], primes = [];
    for (var p = 2; p < limit; p++){
        if (! sieve[p]) { // check against sieve
            primes.push(p); // save and mark this prime
            for (var ps = p; ps < limit; ps += p) sieve[ps] = true; 
        }
    }
    return primes;
};

// helper to generate pythagorean triplets 
// (tweaked from problem #9)
function generatePyTriples(rLimit){
    var triples = []
      , r = 2;
    
    // http://bit.ly/1NjcDfw
    function givenEvenIntegerR(r){
        var key = r * r / 2
          , pairs = [];
        
        // find factor-pairs for key
        var i = 1, limit = Math.sqrt(key);
        while (i < limit){
            if (key % i == 0) pairs.push([i, key/i]);
            i++;
        }
        
        // reduce factor-pairs into py triples
        return _.map(pairs, function(n){
            return [r+n[0], r+n[1], r+n[0]+n[1]];
        });
    };
    
    while (r < rLimit){
        triples = triples.concat(givenEvenIntegerR(r));
        r += 2; 
    }
    
    return triples;
};

var answers = [


    function(){ // 1. Multiples of 3 and 5
    
        // brute force solution
        var sum = 0, i = 1;
        while (i < 1000){
            if (i % 3 == 0 || i % 5 == 0) sum += i;
            i++;
        }

        print(sum);
    },

    function(){ // 2. Even Fibonacci numbers
        
        // brute force (optimized) solution
        var fib = [1, 2], sumEven = 0;
        while (fib[1] < 4000000){
            sumEven += (fib[1] % 2 == 0) ? fib[1] : 0;
            fib.push(fib[0]+fib[1]); 
            fib.shift(); 
        }

        print(sumEven);
    },

    function(){ // 3. Largest prime factor
        
        // brute force solution
        var i = 600851475143
          , primes = []
          , factor = 2;
        
        while (factor <= i){
            if (i % factor == 0) {
                primes.push(factor); 
                i = i / factor;
                continue;
            }
            factor++;
        }
        
        print(_.max(primes));
    },

    function(){ // 4. Largest palindrome product
        
        // brute force solution
        var n1 = 999
          , n2 = 999
          , palindromes = []
          , palindromesN = [];
          
        var limit = 1;
        while (n1 > limit){
        
            // check for palindrome
            var pal = ''+(n1 * n2);
            if (pal == pal.split('').reverse().join('')) {
                palindromes.push(+pal);
                palindromesN.push([n1, n2]);
                n2--; limit = n1; n1 = n2;
                continue;
            }
            
            n1--; 
            if (n1 == limit) {n2--; n1 = n2;}
        }
        
        print(_.max(palindromes));
    },

    function(){ // 5. Smallest multiple
        
        // reduced range set (1-20 = 11-20)
        var factors = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11];
        var smallestMult = factors[0];
        while (
        
            // this is ugly, but shrug.
            smallestMult % factors[1] != 0 || 
            smallestMult % factors[2] != 0 || 
            smallestMult % factors[3] != 0 || 
            smallestMult % factors[4] != 0 || 
            smallestMult % factors[5] != 0 || 
            smallestMult % factors[6] != 0 || 
            smallestMult % factors[7] != 0 || 
            smallestMult % factors[8] != 0 || 
            smallestMult % factors[9] != 0
        ){
            smallestMult += factors[0];
        }
        
        print(smallestMult);
    },

    function(){ // 6. Sum square difference
        
        // plain and simple
        var nums = _.range(1, 101)
          , sumSq = _.reduce(nums, function(m, n){return m + n*n;}, 0)
          , sqSum = Math.pow(_.reduce(nums, function(m, n){return m + n;}, 0), 2);
        
        print(sqSum - sumSq);
    },

    function(){ // 7. 10001st prime
        
        var primes = [2, 3, 5, 7, 11, 13, 17, 19]; //...
        
        // helper to evaluate prime-ness
        function isPrime(n){
           for (var i in primes) if (n % primes[i] == 0) return false;
           return true;
        }
        
        // wheee -- takes few secs to compute.
        var p = primes[primes.length - 1] + 1;
        while (primes.length < 10001){
            if (isPrime(p)) primes.push(p);
            p++;
        }
        
        print(primes[10000]); // 10001th
    },

    function(){ // 8. Largest product in a series
        
        var series = 
            '73167176531330624919225119674426574742355349194934' + 
            '96983520312774506326239578318016984801869478851843' + 
            '85861560789112949495459501737958331952853208805511' + 
            '12540698747158523863050715693290963295227443043557' + 
            '66896648950445244523161731856403098711121722383113' + 
            '62229893423380308135336276614282806444486645238749' + 
            '30358907296290491560440772390713810515859307960866' + 
            '70172427121883998797908792274921901699720888093776' + 
            '65727333001053367881220235421809751254540594752243' + 
            '52584907711670556013604839586446706324415722155397' + 
            '53697817977846174064955149290862569321978468622482' + 
            '83972241375657056057490261407972968652414535100474' + 
            '82166370484403199890008895243450658541227588666881' + 
            '16427171479924442928230863465674813919123162824586' + 
            '17866458359124566529476545682848912883142607690042' + 
            '24219022671055626321111109370544217506941658960408' + 
            '07198403850962455444362981230987879927244284909188' + 
            '84580156166097919133875499200524063689912560717606' + 
            '05886116467109405077541002256983155200055935729725' + 
            '71636269561882670428252483600823257530420752963450'
          , products = [];
        
        var i = 0;
        while (i <= series.length - 13){
            products.push(_.reduce(series.slice(i, i+13), function(m, n){
                return m * n;
            }, 1));
            i++;
        }
        
        print(_.max(products));
    },

    function(){ // 9. Special Pythagorean triplet
    
        // using Dickson's method to generate triplets (woah.)
        // http://bit.ly/1NjcDfw
        function triples(r){
            var key = r*r/2
              , pairs = [];
            
            var i = 1, limit = Math.sqrt(key);
            while (i < limit){
                if (key % i == 0) pairs.push([i, key/i]);
                i++;
            }
            
            return _.map(pairs, function(n){
                return [r+n[0], r+n[1], r+n[0]+n[1]];
            });
        }
        
        // keep looking for the magic triplet!
        function searchTriples(r){
            var T = triples(r);
            for (var i in T){
            
                // find the magic triplet
                if (T[i][0] + T[i][1] + T[i][2] == 1000) return T[i];
            }
            
            return searchTriples(r+2);
        }
        
        var theOne = searchTriples(2);
        print(theOne[0] * theOne[1] * theOne[2]);
    },

    function(){ // 10. Summation of primes
    
        // tweaked from problem #7
        // optimized w/ sieve concept (cool!)
        var sieve = [], primes = [];
        
        // find all primes under two million
        var limit = 2000000;
        for (var p = 2; p < limit; p++){
            if (! sieve[p]) { // check against sieve
                primes.push(p);
            
                // mark sieve for this prime
                for (var ps = p; ps < limit; ps += p){
                    sieve[ps] = true; 
                }
            }
        }
        
        print(_.reduce(primes, function(m,n){ return n+m; }, 0));
    },

    function(){ // 11. Largest product in a grid
        
        var grid = 
           [[08,02,22,97,38,15,00,40,00,75,04,05,07,78,52,12,50,77,91,08],
            [49,49,99,40,17,81,18,57,60,87,17,40,98,43,69,48,04,56,62,00],
            [81,49,31,73,55,79,14,29,93,71,40,67,53,88,30,03,49,13,36,65],
            [52,70,95,23,04,60,11,42,69,24,68,56,01,32,56,71,37,02,36,91],
            [22,31,16,71,51,67,63,89,41,92,36,54,22,40,40,28,66,33,13,80],
            [24,47,32,60,99,03,45,02,44,75,33,53,78,36,84,20,35,17,12,50],
            [32,98,81,28,64,23,67,10,26,38,40,67,59,54,70,66,18,38,64,70],
            [67,26,20,68,02,62,12,20,95,63,94,39,63,08,40,91,66,49,94,21],
            [24,55,58,05,66,73,99,26,97,17,78,78,96,83,14,88,34,89,63,72],
            [21,36,23,09,75,00,76,44,20,45,35,14,00,61,33,97,34,31,33,95],
            [78,17,53,28,22,75,31,67,15,94,03,80,04,62,16,14,09,53,56,92],
            [16,39,05,42,96,35,31,47,55,58,88,24,00,17,54,24,36,29,85,57],
            [86,56,00,48,35,71,89,07,05,44,44,37,44,60,21,58,51,54,17,58],
            [19,80,81,68,05,94,47,69,28,73,92,13,86,52,17,77,04,89,55,40],
            [04,52,08,83,97,35,99,16,07,97,57,32,16,26,26,79,33,27,98,66],
            [88,36,68,87,57,62,20,72,03,46,33,67,46,55,12,32,63,93,53,69],
            [04,42,16,73,38,25,39,11,24,94,72,18,08,46,29,32,40,62,76,36],
            [20,69,36,41,72,30,23,88,34,62,99,69,82,67,59,85,74,04,36,16],
            [20,73,35,29,78,31,90,01,74,31,49,71,48,86,81,16,23,57,05,54],
            [01,70,54,71,83,51,54,69,16,92,33,48,61,43,52,01,89,19,67,48]]
          , greatestProduct = 0;
        
        // greatest product helper
        function gp(n){ 
            var p = n[0] * n[1] * n[2] * n[3]; 
            if (p > greatestProduct) greatestProduct = p;
        }
        
        // traverse horizontally
        for (var row = 0; row < grid.length; row++){
            for (var col = 0; col <= grid[row].length - 4; col++){
                gp(grid[row].slice(col, col + 4));
            }
        }
        
        // traverse vertically
        for (var row = 0; row <= grid.length - 4; row++){
            for (var col = 0; col < grid[row].length; col++){
                gp([grid[row][col], grid[row + 1][col], grid[row + 2][col], grid[row + 3][col]]);
            }
        }
        
        // traverse diagonally (LR)
        for (var row = 0; row <= grid.length - 4; row++){
            for (var col = 0; col <= grid[row].length - 4; col++){
                gp([grid[row][col], grid[row + 1][col + 1], grid[row + 2][col + 2], grid[row + 3][col + 3]]);
            }
        }
        
        // traverse diagonally (RL)
        for (var row = 0; row <= grid.length - 4; row++){
            for (var col = 3; col < grid[row].length; col++){
                gp([grid[row][col], grid[row + 1][col - 1], grid[row + 2][col - 2], grid[row + 3][col - 3]]);
            }
        }
        
        print(greatestProduct);
    },

    function(){ // 12. Highly divisible triangular number
        
        // generate triangle numbers
        function triNumber(n){
            return ((n * n) + n) / 2;
        }
        
        // check divisors
        function overFiveHundredDivisors(n){
            var limit = Math.sqrt(n)
              , factors = 0;
            
            for (var i = 1; i < limit; i++){
                if (n % i == 0) factors++;
            }
            
            return factors >= 250;
        }
        
        // run through numbers
        var i = 1, n = triNumber(i);
        while (overFiveHundredDivisors(n) === false) {
            i++; n = triNumber(i);
        }
        
        print(n);
    },

    function(){ // 13. Large sum
        var nums = 
           [37107287533902102798797998220837590246510135740250,
            46376937677490009712648124896970078050417018260538,
            74324986199524741059474233309513058123726617309629,
            91942213363574161572522430563301811072406154908250,
            23067588207539346171171980310421047513778063246676,
            89261670696623633820136378418383684178734361726757,
            28112879812849979408065481931592621691275889832738,
            44274228917432520321923589422876796487670272189318,
            47451445736001306439091167216856844588711603153276,
            70386486105843025439939619828917593665686757934951,
            62176457141856560629502157223196586755079324193331,
            64906352462741904929101432445813822663347944758178,
            92575867718337217661963751590579239728245598838407,
            58203565325359399008402633568948830189458628227828,
            80181199384826282014278194139940567587151170094390,
            35398664372827112653829987240784473053190104293586,
            86515506006295864861532075273371959191420517255829,
            71693888707715466499115593487603532921714970056938,
            54370070576826684624621495650076471787294438377604,
            53282654108756828443191190634694037855217779295145,
            36123272525000296071075082563815656710885258350721,
            45876576172410976447339110607218265236877223636045,
            17423706905851860660448207621209813287860733969412,
            81142660418086830619328460811191061556940512689692,
            51934325451728388641918047049293215058642563049483,
            62467221648435076201727918039944693004732956340691,
            15732444386908125794514089057706229429197107928209,
            55037687525678773091862540744969844508330393682126,
            18336384825330154686196124348767681297534375946515,
            80386287592878490201521685554828717201219257766954,
            78182833757993103614740356856449095527097864797581,
            16726320100436897842553539920931837441497806860984,
            48403098129077791799088218795327364475675590848030,
            87086987551392711854517078544161852424320693150332,
            59959406895756536782107074926966537676326235447210,
            69793950679652694742597709739166693763042633987085,
            41052684708299085211399427365734116182760315001271,
            65378607361501080857009149939512557028198746004375,
            35829035317434717326932123578154982629742552737307,
            94953759765105305946966067683156574377167401875275,
            88902802571733229619176668713819931811048770190271,
            25267680276078003013678680992525463401061632866526,
            36270218540497705585629946580636237993140746255962,
            24074486908231174977792365466257246923322810917141,
            91430288197103288597806669760892938638285025333403,
            34413065578016127815921815005561868836468420090470,
            23053081172816430487623791969842487255036638784583,
            11487696932154902810424020138335124462181441773470,
            63783299490636259666498587618221225225512486764533,
            67720186971698544312419572409913959008952310058822,
            95548255300263520781532296796249481641953868218774,
            76085327132285723110424803456124867697064507995236,
            37774242535411291684276865538926205024910326572967,
            23701913275725675285653248258265463092207058596522,
            29798860272258331913126375147341994889534765745501,
            18495701454879288984856827726077713721403798879715,
            38298203783031473527721580348144513491373226651381,
            34829543829199918180278916522431027392251122869539,
            40957953066405232632538044100059654939159879593635,
            29746152185502371307642255121183693803580388584903,
            41698116222072977186158236678424689157993532961922,
            62467957194401269043877107275048102390895523597457,
            23189706772547915061505504953922979530901129967519,
            86188088225875314529584099251203829009407770775672,
            11306739708304724483816533873502340845647058077308,
            82959174767140363198008187129011875491310547126581,
            97623331044818386269515456334926366572897563400500,
            42846280183517070527831839425882145521227251250327,
            55121603546981200581762165212827652751691296897789,
            32238195734329339946437501907836945765883352399886,
            75506164965184775180738168837861091527357929701337,
            62177842752192623401942399639168044983993173312731,
            32924185707147349566916674687634660915035914677504,
            99518671430235219628894890102423325116913619626622,
            73267460800591547471830798392868535206946944540724,
            76841822524674417161514036427982273348055556214818,
            97142617910342598647204516893989422179826088076852,
            87783646182799346313767754307809363333018982642090,
            10848802521674670883215120185883543223812876952786,
            71329612474782464538636993009049310363619763878039,
            62184073572399794223406235393808339651327408011116,
            66627891981488087797941876876144230030984490851411,
            60661826293682836764744779239180335110989069790714,
            85786944089552990653640447425576083659976645795096,
            66024396409905389607120198219976047599490197230297,
            64913982680032973156037120041377903785566085089252,
            16730939319872750275468906903707539413042652315011,
            94809377245048795150954100921645863754710598436791,
            78639167021187492431995700641917969777599028300699,
            15368713711936614952811305876380278410754449733078,
            40789923115535562561142322423255033685442488917353,
            44889911501440648020369068063960672322193204149535,
            41503128880339536053299340368006977710650566631954,
            81234880673210146739058568557934581403627822703280,
            82616570773948327592232845941706525094512325230608,
            22918802058777319719839450180888072429661980811197,
            77158542502016545090413245809786882778948721859617,
            72107838435069186155435662884062257473692284509516,
            20849603980134001723930671666823555245252804609722,
            53503534226472524250874054075591789781264330331690];
        
        var sum = _.reduce(nums, function(m, n){ m+=n; return m;}, 0);
        print(String(sum).slice(0,11).replace(/\D/g,''));
    },
    
    function(){ // 14. Longest Collatz sequence
        
        // single collatz step
        function collatzStep(n){
            return (n % 2 == 0) ? 
                (n / 2) : // n is even
                ((3 * n) + 1); // n is odd
        }
        
        // generates collatz chain
        // note: only the length of the chain is returned.
        //       returning the full chain array is painful 
        //       for garbage collector.
        function collatzChainLength(i, kChains){
            var n = collatzStep(i)
              , chain = [i, n]
              , chainLength = false;
            
            while (n !== 1){
                n = collatzStep(n);
                chain.push(n);
                
                // check for known chain length
                if (kChains[n]) {
                
                    // chain = chain.concat(kChains[n]); // <== !!!
                    chainLength = chain.length + kChains[n];
                    n = 1; // jump to end
                }
            }
            
            knowChain(chain, kChains);
            return chainLength || chain.length; // <== !!!
        }
        
        // speed optimization
        // note: only the length of the chain is cached.
        var knownChains = [];
        function knowChain(chain, kChains){
            for (var i = 0; i < chain.length; i++){
            
                // if we know the rest of the chain, end early
                if (kChains[chain[i]]) break;
                
                // record the chain length
                kChains[chain[i]] = chain.slice(i+1).length;
            }
        }
        
        var i = 2, longestChain = {num: 1, chain: 0};
        while (i < 1e6){
            var chainLength = collatzChainLength(i, knownChains);
            
            // check against current record holder
            if (chainLength > longestChain.chain){
                longestChain.num = i;
                longestChain.chain = chainLength;
            }
            
            i++; // proceed to next number
        }
        
        print(longestChain.num);
    },
    
    function(){ // 15. Lattice paths
    
        // http://en.wikipedia.org/wiki/Permutation#Permutations_of_multisets
        // 2x2 grid = [D,D,R,R] = (4!/2!2!) = 6 routes
        // 3x3 grid = [D,D,D,R,R,R] = (6!/3!3!) = 180 routes
        // 4x4 grid = [D,D,D,D,R,R,R,R] = (8!/4!4!) = 10080 routes
        
        // therefore..
        print(parseInt(math.factorial(40)/(math.factorial(20)*math.factorial(20))));
    },
    
    function(){ // 16. Power digit sum
        BigNumber.config({ POW_PRECISION: 0 });
        
        var twoPowThousand =     
            (new BigNumber(2)).toPower(1000).toFixed(0)
          , sum = 0;
        
        for (var i in twoPowThousand){
            sum += parseInt(twoPowThousand[i]);
        }
        
        print(sum);
    },
    
    function(){ // 17. Number letter counts
    
        // http://en.wikipedia.org/wiki/List_of_numbers#Small_numbers
        var words = {
                "1"     : "One",
                "2"     : "Two",
                "3"     : "Three",
                "4"     : "Four",
                "5"     : "Five",
                "6"     : "Six",
                "7"     : "Seven",
                "8"     : "Eight",
                "9"     : "Nine",
                "10"    : "Ten",
                "11"    : "Eleven",
                "12"    : "Twelve",
                "13"    : "Thirteen",
                "14"    : "Fourteen",
                "15"    : "Fifteen",
                "16"    : "Sixteen",
                "17"    : "Seventeen",
                "18"    : "Eighteen",
                "19"    : "Nineteen",
                "20"    : "Twenty",
                "30"    : "Thirty",
                "40"    : "Forty",
                "50"    : "Fifty",
                "60"    : "Sixty",
                "70"    : "Seventy",
                "80"    : "Eighty",
                "90"    : "Ninety",
                "100"   : "OneHundred", // space removed
                "1000"  : "OneThousand" // space removed
            }
          , sum = 0;
        
        for (var i = 1; i <= 1000; i++){
            var n = i;
            
            // process hundredth's place
            if (n > 100 && n < 1000) {
                sum += words[Math.floor(n/100)].length + 'hundred'.length;
                
                // process ten's/one's place
                n = n % 100;
                
                // continue if word fully captured
                if (n == 0) continue;
                
                sum += "and".length; // british usage
            }
            
            // if we have this direct verbage, add it
            if (words[n]){
                sum += words[n].length;
                
                // continue since word fully captured
                continue;
            }
            
            // numbers 21 - 99
            if (n >= 21 && n <= 99){
                sum += words[Math.floor(n / 10) * 10].length + words[n % 10].length;
            }
        }
        
        print(sum);
    },
    
    function(){ // 18. Maximum path sum I
        
        var triangle = 
           [[75], 
            [95, 64], 
            [17, 47, 82], 
            [18, 35, 87, 10], 
            [20, 04, 82, 47, 65], 
            [19, 01, 23, 75, 03, 34], 
            [88, 02, 77, 73, 07, 63, 67], 
            [99, 65, 04, 28, 06, 16, 70, 92], 
            [41, 41, 26, 56, 83, 40, 80, 70, 33], 
            [41, 48, 72, 33, 47, 32, 37, 16, 94, 29], 
            [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14], 
            [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57], 
            [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48], 
            [63, 66, 04, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31], 
            [04, 62, 98, 27, 23, 09, 70, 98, 73, 93, 38, 53, 60, 04, 23]];
            
        // process triangle bottom-to-top, 
        // starting with second-to-last row
        for (var row = triangle.length - 2; row >= 0; row--){
        
            // update each node with optimal path
            for (var n = 0; n < triangle[row].length; n++){
                triangle[row][n] += 
                    triangle[row+1][n] > triangle[row+1][n+1] ? 
                    triangle[row+1][n] : 
                    triangle[row+1][n+1];
            }
        }
        
        // and finally, just look at the top!
        print(triangle[0][0]);
    },
    
    function(){ // 19. Counting Sundays
        
        var months = [ 
                31 // jan
              , 28 // feb
              , 31 // mar
              , 30 // apr
              , 31 // may
              , 30 // jun
              , 31 // jul
              , 31 // aug
              , 30 // sep
              , 31 // oct
              , 30 // nov
              , 31 // dec
            ]
        
            // 1901-01-01 was a Tuesday
          , year = 1901, month = 0
          , weekday = 2  // tuesday
          // 0 = sunday
          // 1 = monday
          // ...
          // 6 = saturday
          
          , firstSunday = 0;
        
        while (year <= 2000){
            while (month < 12){
                weekday = (weekday + months[month]) % 7;
                if (weekday == 0) firstSunday++;
                month++;
            }
            month = 0;
            year++;
        }
        
        print(firstSunday);
    },
    
    function(){ // 20. Factorial digit sum
        
        var factorial = new BigNumber(1);
        for (var i = 100; i > 1; i--){
            factorial = factorial.mul(i);
        }
        
        var factorial = factorial.toFixed(0), sum = 0;
        for (var i in factorial){
            sum += +factorial[i];
        }
        
        print(sum);
    },
    
    function(){ // 21. Amicable numbers
    
        function d(n){
            var l = Math.sqrt(n)
              , sum = 1;
            for (var i = 2; i < l; i++){
                if (n % i == 0) sum += i + (n/i);
            }
            return sum;
        }
        
        var sum = 0;
        for (var i = 1; i < 10000; i++){
            var n = d(i);
            
            if (i !== n && 
                i === d(n)) {
                sum+= n + i;
            }
        }
        
        print(sum / 2); // divide by two (numbers counted twice)
    },
    
    function(){ // 22. Names scores
        var alpha = 'abcdefghijklmnopqrstuvwxyz'.split('');
        
        $.get('src/p022_names.txt', function(data){
            print(_.chain(JSON.parse('['+data+']')) 
                .sortBy()
                .reduce(function(m, d, i){
                    return m + (_.reduce(d.toLowerCase(), function(m, c){
                        return m + alpha.indexOf(c) + 1;
                    }, 0) * (i + 1));
                }, 0)
                .value());
        });
    },
    
    function(){ // 23. Non-abundant sums
    
        // sum of proper divisors (borrowed from #21)
        function d(n){ 
            var l = Math.sqrt(n)
              , sum = 1;
            for (var i = 2; i < l; i++){
                if (n % i == 0) sum += i + (n/i);
            }
            
            // omfg, i'm an idiot for missing this:
            if (i % l == 0) sum += l;
            
            return sum;
        }
        
        // collection of all abundant numbers (up until sum > 28123)
        var abInt = [];
        for (var i = 2; abInt.length < 2 || abInt[abInt.length - 1] <= 28123; i++){
            if (d(i) > i) abInt.push(i);
        }
        
        // begin to sum all "cannot .. sum two abundant numbers"
        var sum = 0;
        for (var i = 1; i <= 28123; i++){
            var canAbundant = false;
            
            for (var aI = 0; aI < abInt.length; aI++){
                var n = abInt[aI];
                
                if (n > i) break;
                
                // search for corresponding abundant number
                if (_.indexOf(abInt, (i - n), true) !== -1) {
                    canAbundant = true;
                    break;
                }
            }
            
            // sum "cannot be written as sum of two abundant numbers"
            if (canAbundant === false) {
                sum += i;
            }
        }
        
        print(sum);
    },
    
    function(){ // 24. Lexicographic permutations
        
        var digits = _.sortBy([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        
        function lexiPermutation(permutations, iteration, digits, limit){
        
            // walk through ordered digits,
            // generating new permutations
            for (var i = 0; i < digits.length; i++){
                
                // quit once we reach one million permutations
                if (permutations.length >= limit) break;
                
                // make a working copy
                var remainDigits = _.clone(digits)
                
                    // work off this digit
                  , d = remainDigits.splice(i, 1)
                  
                    // add this digit to end of 
                    // current permutation iteration
                  , nextIteration = _.clone(iteration).concat(d);
                
                // if there are no digits left, 
                // save this new iteration
                if (remainDigits.length == 0){
                    permutations.push(nextIteration.join(''));
                    continue; // and move on
                }
                
                // otherwise, recurse with the remaining digits
                lexiPermutation(permutations, nextIteration, remainDigits, limit);
            }
        };
        
        var permutations = [] // collect the permutations
          , limit = 1e6; // stop once we reach one million
          
        // generate the permutations
        lexiPermutation(permutations, [], digits, limit);
        
        // print the millionth lexi permutation
        print(permutations[permutations.length-1]);
    },
    
    function(){ // 25. 1000-digit Fibonacci number
    
        // initialize the fib sequence
        var fib = [new BigNumber(1), new BigNumber(1)]
          , nextFib = fib[0].add(fib[1])
          , term = 3;
        
        // keep proceeding with fib, until 1000 digits
        while (nextFib.toFixed(0).length < 1000){
            fib = [fib[1], nextFib];
            nextFib = fib[0].add(fib[1]);
            term++;
        }
        
        // print the first term to have 1000-digits
        print(term);
    },
    
    function(){ // 26. Reciprocal cycles
    
        // string repeat helper 
        // http://stackoverflow.com/a/202627
        String.prototype.repeat = function(num){ 
            return new Array( num + 1 ).join(this); 
        }
        
        // apparently cyclic numbers are a result of "full reptend primes": 
        // http://mathworld.wolfram.com/CyclicNumber.html
        //
        // so we can focus on primes under 1000, and then check for cyclic numbers.
    
        // helper to generate primes (tweaked from problem #10)
        var sieve = [], primes = [], limit = 1000;
        for (var p = 2; p < limit; p++){
            if (! sieve[p]) { // check against sieve
                primes.push(p); // save and mark this prime
                for (var ps = p; ps < limit; ps += p) sieve[ps] = true; 
            }
        }
        
        // helper to determine smallest cyclic number
        function smallestCycle(n){
        
            // start with an arbitrary cycle length,
            // which becomes incrementally smaller.
            var cycleLength = Math.ceil(n.length / 2);
            while (cycleLength > 0){
                
                // slice off the cyclic number
                var cycle = n.slice(0, cycleLength);
                
                // confirm this cycle repeats for entire number (-ish)
                var verify = Math.floor(n.length / cycle.length);
                if (verify > 1 && // skip cycles that cannot be verified
                    cycle.repeat(verify) == n.slice(0, (cycle.length * verify))){
                
                    // on success, we recurse to check for a smaller cycle
                    var smallerCycle = smallestCycle(cycle);
                    
                    // return the smaller cycle, falling back to this cycle
                    return smallerCycle || cycle;
                }
                
                // proceed with next possible cycle
                cycleLength--;
            }
            
            // could not find a cyclic number
            return false;
        }
        
        var prime // pointer to current prime
          , one = new BigNumber(1) // numerator for div
          , record = {d: 0, cycle: ''};  // record holder
        
        // process through primes (starting with largest)
        while ((prime = primes.pop()) && 
        
            // stop early, based on knowledge of 
            // "maximal peroid decimal expansion of p-1 digits"
            // http://mathworld.wolfram.com/FullReptendPrime.html
            prime > record.cycle.length){
            
            // check for a cyclic number
            BigNumber.config({ DECIMAL_PLACES: prime * 2 });
            var deci = one.dividedBy(prime).toFixed(prime * 2)
              , cycle = smallestCycle(deci.slice(2));
              
            // compare and capture against record holder
            if (cycle.length > record.cycle.length){
                record.d = prime;
                record.cycle = cycle;
            }
        }
        
        // finally.
        print(record.d);
    },
    
    function(){ // 27. Quadratic primes 
        
        // start off by generating primes
        var limit = 10000 // arbitrary limit
          , primes = generatePrimes(limit);
        
        // helper to check if number is prime
        var isPrime = _.memoize(function(n){
            
            // if n is beyond the generated primes list,
            // re-generat primes list with higher limit
            if (n > limit) {
                limit = n + 5;
                primes = generatePrimes(limit);
            }
            
            return _.indexOf(primes, n, true) !== -1;
        })
        
        // helper to count # of consecutive primes,
        // starting with n = 0
        function consecutivePrimes(a, b){
            var count = 0, n = 0;
            while (isPrime((n * n) + (a * n) + b)){
                count++; n++;
            }
            
            return count;
        }
      
        // test range |a| < 1000 and |b| < 1000
        // for maximum number of consecutive primes
        
        var record = {a: null, b: null, count: 0};
        for (var a = -999; a < 1000; a++){
        
            // note: "when n = 0, n^2 + an + b = b"
            //       therefore, b cannot be negative,
            //       and since primes cannot be negative
            for (var b = 2; b < 1000; b++){
            
                // b must be a prime, when n = 0
                if (! isPrime(b)) continue;
                
                // compare against record holder
                var count = consecutivePrimes(a, b);
                if (count > record.count){
                    record.a = a;
                    record.b = b;
                    record.count = count;
                }
            }
        }
        
        // print product of coefficients
        print(record.a * record.b);
    },
    
    function(){ // 28. Number spiral diagonals
        
        function sumBox(n){
            if (n == 1) return 1;
            
            return n*n + 
                (n*n - (n-1)) + 
                (n*n - (2*(n-1))) + 
                (n*n - (3*(n-1))) +
                sumBox(n-2);
        }
        
        print(sumBox(1001));
    },
    
    function(){ // 29. Distinct powers
        BigNumber.config({ POW_PRECISION: 0 });
        
        var terms = {};
        for (var a = 2; a <= 100; a++){
            var n = new BigNumber(a);
            for (var b = 2; b <= 100; b++){
                terms[n.pow(b).toFixed(0)] = true;
            }
        }
        
        print(_.keys(terms).length);
    },
    
    function(){ // 30. Digit fifth powers
        
        // helper to find number range for n-length digit
        function digitLimit(n, power){
        
            // find the maximum sum
            var baseLimit = 9;
            while (String(Math.pow(baseLimit, power)).length > n) baseLimit--;
            var sum = Math.pow(baseLimit, power), digits = [baseLimit];
            while (digits.length < n){
                var add = Math.pow(baseLimit, power);
                if (String(sum + add).length <= n){
                    sum += add; digits.push(baseLimit);
                }
                else {
                    baseLimit--;
                }
            }
            
            // maximum digits-as-base
            var max = parseInt(digits.join(''));
            
            // check for sanity (must have at least n-digits)
            if (max == Math.pow(10,n)-1){ // when maximum-digits-as-base is 999..
                var highest = _.reduce(digits, function(m,d){ return m + Math.pow(d, power); }, 0);
                return String(highest).length < n ? false : max;
            }
            
            return max;
        }
        
        // find the magical number-equals-sum-of-power-digits
        var digits = 2
          , power = 5
          , sumOfPowerDigits = []
          , limit = digitLimit(digits, power);
        while (limit !== false){
            for (var i = Math.pow(10, digits-1); i < limit; i++){
                var sum = _.reduce(String(i).split(''), function(m,n){ 
                    return m + Math.pow(+n, power); 
                }, 0);
                if (sum == i) sumOfPowerDigits.push(i);
            }
            digits++;
            limit = digitLimit(digits, power);
        }
        
        // print sum
        print(_.reduce(sumOfPowerDigits, function(m, n){
            return m + n;
        }, 0));
    },
    
    function(){ // 31. Coin sums
        
        // coins in order from greatest-to-smallest
        var coins = [1, 2, 5, 10, 20, 50, 100, 200].reverse();
        
        // helper to count combination of coins to reach total
        function combineForTotal(coins, total){
            if (coins.length == 0) return 0;
            
            // sort coins from largest to smallest
            var coins = _.sortBy(_.clone(coins)).reverse()
              , coin = coins.shift() // focus on first coin
              , combinations = 0;
            
            // determine max-to-min usage of first coin
            for (var i = Math.floor(total / coin), rem = total % coin; i >= 0; i--, rem += coin){
                
                // if no remainder, we're good
                if (rem == 0) combinations++;
                
                // otherwise, determine sub-combations for remainder
                else combinations += combineForTotal(coins, rem);
            }
            
            return combinations;
        }
        
        print(combineForTotal(coins, 200));
    },
    
    function(){ // 32. Pandigital products
    
        // helper to check for pandigital-ness
        function isPandigital(n){
            return String(n).length == 9 &&
                _.sortBy(n.split('')).join('') == '123456789';
        }
        
        var pandigitalProducts = [];
        for (var a = 1000; a > 0; a--){ // aribtrary limit
            for (var b = 2000; b > 0; b--){ // aribtrary limit
                var p = a * b;
                if (isPandigital(String(a) + String(b) + String(p))){
                    pandigitalProducts[p] = true; // ensure ignore dups
                }
            }
        }
        
        // sum all products
        var sum = _.reduce(_.keys(pandigitalProducts), function(m, n){ return m + +n; }, 0);
        
        print(sum);
    },
    
    function(){ // 33. Digit cancelling fractions
    
        // helper to target curious fractions
        function isCurious(num, den){
            var q = num / den
              , num = String(num)
              , den = String(den);
            
            return _.reduce(num.split(''), function(m, n){
                return m || 
                    (den.indexOf(n) !== -1 && 
                    (+num.replace(n, '')) / (+den.replace(n, '')) == q);
            }, false);
        }
        
        // find curious fractions (brute force)
        var curiousFractions = [];
        for (var a = 10; a < 100; a++){
            for (var b = a+1; b < 100; b++){
            
                // skip "trivial"
                if (a % 10 == 0 & b % 10 == 0) continue;
                
                if (isCurious(a, b)) {
                    curiousFractions.push([a,b]);
                }
            }
        }
        
        // find product of all curious fractions
        var prod = _.reduce(curiousFractions, function(m, n){
            return [m[0] * +n[0], m[1] * +n[1]];
        }, [1, 1]);
        
        // reduce the fraction
        var primes = generatePrimes(prod[0]);
        _.each(primes, function(p){
            while (prod[0] % p == 0 && prod[1] % p == 0){
                prod[0] = prod[0] / p;
                prod[1] = prod[1] / p;
            }
        });
        
        // print the denominator
        print(prod[1]);
    },
    
    function(){ // 34. Digit factorials
        
        function isCurious(n){
            var sumDigitFactorial = _.reduce(String(n).split(''), function(m, n){
                return m + math.factorial(parseInt(n));
            }, 0);
            
            return (sumDigitFactorial == n);
        }
        
        var sum = 0; // count running sum
        
        // start at 3 (skip 1, 2)
        // end under 1e7 (9!+9!+9!+9! +9!+9!+9!+9! = 7 digits)
        for (var i = 3; i < 1e7; i++){
            if (isCurious(i)) sum += i;
        }
        
        print(sum);
    },
    
    function(){ // 35. Circular primes
    
        // all primes under a million
        var primes = generatePrimes(1e6);
        
        // helper to check for circular prime
        function isCircularPrime(n){
            var strN = String(n)
              , digits = strN.split('');
            if (digits.length == 1) return true;
            
            // check rotation of digits
            var circular = true
              , r = digits.unshift(digits.pop()) && digits.join('');
            while (r !== strN) {
                if (_.indexOf(primes, parseInt(r), true) == -1) {
                    circular = false; break;
                }
                r = digits.unshift(digits.pop()) && digits.join('');
            }
            
            return circular;
        }
        
        var count = _.reduce(primes, function(m, n){
            if (isCircularPrime(n)) {m++;}
            return m;
        }, 0);
        
        print(count);
    },
    
    function(){ // 36. Double-base palindromes
    
        function isPalindrome(n){
            var digits = String(n)
              , i = Math.floor(digits.length / 2);
              
            // single digits are palindromes
            if (digits.length == 1) return true;
            
            // split in half, reverse other half, compare
            return digits.slice(0, i) == digits.slice(-1*i).split('').reverse().join('');
        }
        
        var sum = 0;
        for (var i = 1; i < 1e6; i++){
        
            // check base10
            if (isPalindrome(i) && 
            
                // check base2
                isPalindrome((new BigNumber(i)).toString(2))){ 
                
                sum += i;
            }
        }
        
        print(sum);
    },
    
    function(){ // 37. Truncatable primes
    
        var limit = 1e5
          , primes = generatePrimes(limit)
          , truncatablePrimes = [];
        
        while (truncatablePrimes.length < 11){
            truncatablePrimes = _.reduce(_.clone(primes).reverse(), function(m, p){
                
                // skip 2, 3, 5, 7
                if (p < 10) return m; 
                
                var strPrime = String(p)
                  , left = strPrime.split('')
                  , right = strPrime.split('')
                  , trunc = true;
                
                // step into truncating digits
                left.shift(); right.pop();
                while (left.length > 0){
                
                    // check for prime-ness
                    if (_.indexOf(primes, +left.join(''), true) == -1 || 
                        _.indexOf(primes, +right.join(''), true) == -1){
                        trunc = false; 
                        break;
                    }
                    
                    // keep steppin'
                    left.shift(); right.pop();
                }
                
                // collect the interesting primes
                if (trunc) m.push(p);
                
                return m;
            }, []);
            
            // check if we have the 11 interesting primes
            if (truncatablePrimes.length < 11){
                
                // expand our prime limit
                limit = limit * 10;
                primes = generatePrimes(limit);
            }
        }
        
        var sum = _.reduce(truncatablePrimes, function(m, n){ return m + n; }, 0);
        print(sum);
    },
    
    function(){ // 38. Pandigital multiples

        // helper to check for pandigital multiple
        function pandigitalMultiple(n){
            var digits = String(n);
            
            // get concat product for this number
            var i = 2; // uses multiple set of (1, 2, ... n), where n > 1
            while (digits.length < 9){
                digits += String(n * i);
                i++;
            }
            
            // note: returns false when digits do not 
            //       reach an exact count of 9
            if (digits.length !== 9 || 
            
                // also return false for non-pandigital-ness
                digits.split('').sort().join('') != '123456789') {
                return false;
            }
            
            // return successful pandigital multiple
            return digits;
        }
        
        // search for largest pandigital
        // note: limit to numbers with less than 5 digits, since
        //       (1 * [5-digits]) + (2 * [5-digits]) = [10-digits]
        //       and pandigital-ness requires 9 digits.
        var largest = 0;
        for (var i = 1; i < 1e5; i++){ 
            var n = pandigitalMultiple(i);
            if (n && n > largest) largest = n;
        }
        
        print(largest);
    },
    
    function(){ // 39. Integer right triangles
        
        // helper to calculate p (perimeter)
        function P(triple){
            return triple[0] + triple[1] + triple[2];
        };
        
        // if a, b, c are integers, 
        // they must be pythagorean triples..
        // generate triples until p > 1000
        var limit = 100, triples = generatePyTriples(limit);
        while (P(triples[triples.length - 1]) < 1e3){
            limit += 10; triples = generatePyTriples(limit);
        }
        
        // generate solutions for P for triples
        var solutionsForP = _.reduce(triples, function(m, t){
            var p = P(t);
            m[p] = m[p] || {p: p, count: 0};
            m[p].count++;
            return m;
        }, {});
        
        // find record holder
        var max = _.max(solutionsForP, function(p){return p.count;});
        print(max.p);
    },
    
    function(){ // 40. Champernowne's constant
    
        var i = 1, digits = '0';
        while (digits.length < 1e7){
            digits += i; i++;
        }
        
        var d = digits.split('');
        print(d[1e0] * d[1e1] * d[1e2] * d[1e3] * d[1e4] * d[1e5] * d[1e6]);
    },
    
    function(){ // 41. Pandigital prime
    
        function isPandigital(n){
            var pan = '123456789'
              , digits = String(n);
            return digits.split('').sort().join('') == 
                pan.slice(0, digits.length);
        }
        
        var primes = generatePrimes(1e7).reverse();
        for (var i in primes) {
            if (isPandigital(primes[i])) {
                print(primes[i]);
                break;
            }
        }
    },
    
    function(){ // 42. Coded triangle numbers
    
        // helper to generate triangle numbers
        function generateTrianges(limit){
            var triangles = [];
            for (var i = 1; i < limit; i++){
                triangles.push(.5 * i * (i + 1));
            }
            return triangles;
        }
        
        // helper to calculate word value
        function wordValue(word){
            return _.reduce(word.split(''), function(m, c){
                return m + (c.charCodeAt(0) - 64);
            }, 0);
        }
        
        var triangles = generateTrianges(1e2);
        $.get('src/p042_words.txt', function(data){
            print(_.chain(JSON.parse('['+data+']')) 
                .reduce(function(m, word){
                    if (triangles.indexOf(wordValue(word)) !== -1){
                        m.push(word);
                    }
                    return m;
                }, [])
                .value()
                .length);
        });
        
    },
    
    function(){ // 43. Sub-string divisibility
    
        // helper to check for special property
        function isSubStrDivisible(n){
            var digits = String(n);
            
            // incrementally check for satisifying substr divisibility
            if (digits.length < 4) return true;
            if (digits.length >=  4 && digits.slice(1,  4) %  2 !== 0) return false;
            if (digits.length >=  5 && digits.slice(2,  5) %  3 !== 0) return false;
            if (digits.length >=  6 && digits.slice(3,  6) %  5 !== 0) return false;
            if (digits.length >=  7 && digits.slice(4,  7) %  7 !== 0) return false;
            if (digits.length >=  8 && digits.slice(5,  8) % 11 !== 0) return false;
            if (digits.length >=  9 && digits.slice(6,  9) % 13 !== 0) return false;
            if (digits.length >= 10 && digits.slice(7, 10) % 17 !== 0) return false;
            return true;
        }
        
        // helper to generate all special numbers.
        // incrementally validates substr divisibility
        function specialNumbers(digits, callback, n){
            _.each(digits, function(d){
                var num = (n||'') + d;
                
                // terminate bad combinations early
                if (! isSubStrDivisible(num)) return;
                
                // if we've reached the final form
                // (while also maintaining substr divisibility)
                // trigger callback with the number
                if (digits.length == 1) callback(num);
                
                // otherwise, continue to generate the numbers
                else combinations(_.without(digits, d), callback, num);
            });
        };
        
        // find all special numbers, keeping a running total
        var sum = 0; 
        specialNumbers('0123456789', function(n){ sum += +n; });
        
        print(sum);
    },
    
    function(){ // 44. Pentagon numbers
    
        function pentagonalNumbers(limit){
            return _.reduce(_.range(1, limit+1), function(n, i){
                var i = new BigNumber(i);
                n.push(i.mul((i.mul(3).minus(1)).div(2)).toFixed(0));
                return n;
            },[]);
        }
        
        // todo
    },
    
    function(){ // 
    
    },
    
    function(){ // 
    
    },
    
    function(){ // 
    
    },
    
    function(){ // 
    
    },
    
    function(){ // 
    
    },
    
    function(){ // 
    
    },
    
    function(){ // 
    
    },
    
    function(){ // 
    
    },
    
    function(){ // 
    
    },
    
    function(){ // 
    
    }

];