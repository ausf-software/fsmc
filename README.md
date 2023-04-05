# [Open web version](https://ausf-software.github.io/fsmc/)
# Finite state machine calculator
A finite state machine calculator from a given linear function of the form:
<blockquote>f(x₁, x₂, ... , x₃₂) = α₁x₁ + α₂x₂ + ... + α₃₂x₃₂ + β</blockquote>

### The spelling accepted by the parser:
1. Multiplication:
    * α*x
	* x*α
	* αx
	* xα
2. Addition:
    * x₁+x₂
    * x₁-x₂
3. Letters of the Latin alphabet:
    * a, b, c, d, ...
4. Arabic numerals:
    * 0, 1, 2, ...
5. Before reading the function, multipliers of the same variables are not added, keep this in mind when setting the function.
6. There is no support for sequential assignment of operations by '(' and ')'.

### Examples of function input:
* 2*n+3*m-5
* 2n+3m-5
* n*3+m3-5