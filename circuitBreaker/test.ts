// test.ts
import { CircuitBreaker } from "./circuitBreaker";


const circuitBreaker = new CircuitBreaker({
    method: "get",
    url: "http://localhost:3000"
});


setInterval(() => {
    circuitBreaker
        .exec()
        .then( console.log )
        .catch( console.error )
}, 1000 );