---
layout: post
title: The world never says hello back
date: "2017-12-06 20:51 +0530"
---

So, 99% of all programmers' first ever program is "**Hello, world!**". I consider this to be the beginning of the altruistic trait of loving the code we as programmers write. But how did it all start?

Say hello to [Brian Kernighan](https://en.wikipedia.org/wiki/Brian_Kernighan).

![Brian Kernighan](/assets/code/kernighan.jpg "Brian Kernighan")  
*via [An Interview with Brian Kernighan](https://www.cs.cmu.edu/~mihaib/kernighan-interview/)*

It has been claimed that Brian Kernighan first wrote a "hello, world" program as part of the I/O section in the documentation for [BCPL programming language](https://en.wikipedia.org/wiki/BCPL) developed by Martin Richards. BCPL was then used at Bell Labs where Ken Thompson and Dennis Ritchie were developing [B](https://en.wikipedia.org/wiki/B_(programming_language)), another programming language based mainly on BCPL. Kernighan co-authored the tutorial for B, where the first publicly known-instance of the usage of the words "hello" and "world" together in computer literature occur. He used it as an example to illustrate external variables:

```c
main() {
  extrn a,b,c;
  putchar(a); putchar(b); putchar(c); putchar('!*n');
}

a 'hell';
b 'o, w';
c 'orld';
```

The program prints **_hello, world!_** on the terminal, including a newline character. The phrase is divided into multiple variables because in B, a character constant is limited to four ASCII characters. The previous example in the tutorial printed _hi!_ on the terminal, and the phrase _hello, world!_ was introduced as a slightly longer greeting that required several character constants for its expression.

The more popular C version included in Kernighan and Ritchie's very popular C book, [_The C Programming Language_](https://en.wikipedia.org/wiki/The_C_Programming_Language) (1978), was inherited from a 1974 Bell Laboratories internal memorandum: [_Programming in C: A Tutorial_](http://www.lysator.liu.se/c/bwk-tutor.html).

```c
#include <stdio.h>

main() {
  printf("hello, world\n");
}
```

The C version excluded the exclamation mark. Note that neither of these versions use the capital letter H in _Hello, world!_ that we commonly use today. While there is no hard timeline on how the transition occured, it would be safe to assume that it happened purely for grammatical correctness as more authors started using it.

One major catalyst that sparked the spread of ‘_Hello, world_’ was the parallel introduction of the PDP-11, one of the first commercial success of microcomputers. Digital Equipment Corporation (DEC) sold over 600,000 units of the PDP-11 total at about $10,000 each, which was drastically lower than the millions of dollars computers typically cost at that time. Plus, the PDP-11 16-bit series didn’t require punch cards. **It was the first time you could use a programming language to directly talk to a computer**.

C and the operating system Unix first became popular on the PDP-11. So, it would follow then that the boom in commercial computers that supports the new C programming language, propelled thousands of people to read the 200-page book, _The C Programming Language_.

Every programmer remembers their first ‘_Hello, world_’ as a rite of passage. Many might not realize it, but each time a programmer feels the sweet feeling of triumph in clearing the first hurdle of programming with the words ‘_Hello, world_’ is experiencing **a moment that transcends history**.

TIP: If you've wondered how easy, verbose or trivial a _Hello, world_ program would be in different languages, you may want to check out [The Hello World Collection](https://helloworldcollection.github.io/), a collection of _Hello, world_ programs implemented in just about every programming language on the planet.

Happy coding!