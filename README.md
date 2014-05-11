karnaughMap
===========

Simple website to visualize a karnaugh diagram.

Usage
-----

In the variables field, enter the variables you intend to use as a concatenaded string. The variables must be one character long.

Example:
  "ab": Will use to variables, one named "a" and one "b".
  
The named variables can then be used to express a boolean expression in the expression field. The tool supports + (or), concatenatenation (and), ^ (xor) and ' (not).

Example:
  "(ab ^ c)": not ((a and b) xor c)
