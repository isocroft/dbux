---
slug: /
# path: why-dbux
---

# Dbux: What and Why?

Dbux is an integrated debugging environment (IDbE) and omniscient debugger for JavaScript runtime analysis. We hope to help developers (i) improve program comprehension and (ii) increase debugging efficiency. To that end, Dbux records an application's runtime data, visualizes it and makes it interactive.

TODO(improve + add architectural diagram)

<!-- https://docusaurus.io/docs/next/markdown-features/admonitions -->
:::caution
Dbux might be a bit difficult to get into in the beginning. We strongly recommend to start with the [interactive tutorials](./03-dbux-practice/02-tutorial.md).

If you have any questions, feel free to [join us on DISCORD](https://discord.gg/QKgq9ZE).
:::

This (too long) video explains what Dbux is and features two examples of how to use the Dbux VSCode extension:

<a href="https://www.youtube.com/watch?v=m1ANEuZJFT8" target="_blank" alt="video">
   <img width="150px" src="https://img.youtube.com/vi/m1ANEuZJFT8/0.jpg" />
</a>


## On Debugging

Back in 1997, Henry Lieberman[^1] quotes skeptics saying: "Debugging is just plain hard" and "real programmers don't need debugging tools,". In a heart-warming, informal call to arms, Lieberman envisions a future where new innovative debugging tools (like his ZStep 95[^2] omniscient LISP debugger) will surely become a staple of developer toolboxes around the world. 24 years later, the skeptics seem to have been proven right, and him wrong. While a lot of progress has been made in domain-specific debugging tools and automatic debugging research, general purpose debuggers are still mostly the same as back then. We also agree with Lieberman that we should put our modern computer's speed to better use, i.e.: "use some of that speed and storage to process information that the programmer needs to understand what's going on in the program". 

On the plus side, some strides in *dynamic runtime analysis* have been made. Coverage reporting, for example, has become standard industry practice. It uses some of that "speed and storage" to record code execution metrics in order to help developers with an important aspect of automated testing. Another area of improvement is the wide range of browser tools that especially frontend developers enjoy. Examples include the DOM inspector, the trusty network tab and many domain-specific tools that caring framework developers put in our hands, such as the React and Redux Developer tools[^3].

However, when it comes to general-purpose code-level analysis tools, little has changed over the past 30 years[^4]. Imagine the manager of a large factory, running the factory based on observations from inputs and outputs, a "fax machine" and a "blueprint" alone. That is what is still happening in software development. Debugging is still commonly performed by correlating input and output events, as well as specialized logs (the "fax machine"), interleaved with reading and re-reading the code (the "blueprint"). To the Dbux team, this makes no sense. We are hoping that the 2020s shall finally be the time for the "next generation of debugging tools".

<!-- TODO(re-write + move this)  Some of that data comprises already existing inputs and outputs of the program, sometimes data is produced from a properly reported error, sometimes, we have next to no information, e.g. when staring at a silent console of a server that just gives us the wrong data, when looking at an empty page on the frontend or when looking at syntax errors that only occurred after webpacking/bundling. -->


## How is Dbux Different?

Debugging is an investigative process. When facing down most non-trivial bugs, we usually start by looking at available data (e.g. logs), followed by guessing potential places that might be at fault, in order to try to slowly circle in on the root-cause, then rinse and repeat, until we found it.

The "traditional debugger" plays a special role in that process: it allows us to get very relevant data, on a very low level, allowing to place breakpoints and step through the program, while looking at relevant data at a specific place and time in the execution. It can be a fantastic tool, **if** you know where to look, and **if** the root cause is downstream from observed symptoms. Sadly, most bugs don't work like that. Often times when we observe a failure, we have to go back in time to find its cause. Most implementations[^4] of the traditional debugger do not support that. They only present us with highly localized data (such as surrounding variable values and the call-stack), visible only when the execution is paused in a specific part of the code.
We argue: this approach to debugging is of course **not bad**. Our goal is not to denounce. Rather, we sought out to look for new ways of approaching debugging, with the hope of making parts of it *more efficient*.

Enter: Dbux. It is an [omniscient debugger](https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=omniscient+debugger), meaning it automatically gathers and visualizes your application's runtime behavior, and makes it interactive. The term "omniscient" (meaning "**all-knowing**") is a quirky exaggeration (it does not know your grandma's birthday). By default, it records the beginning and end of all executed files and functions, all asynchronous events and the entire trace log, meaning (almost) all statements and expressions and their values.

All that data is then available for the developer to inspect and interact with, as explained in the [Using Dbux](./02-using-dbux/02-enable-dbux.mdx) chapter. We decided that the diversity and depth of the tools available in the [Dbux VSCode Extension](./04-tools-andconfiguration/01-dbux-code.mdx) might warrant it the title of **IDbE**: <Term term="idbe">Integrated Debugging Environment</Term> (not to be confused with IDE).


## Advantages of Dbux:

* Instead of only a call stack, Dbux presents us with the entire [call graph](./02-using-dbux/08-call-graph.mdx). A complete [asynchronous call stack](./02-using-dbux/08-call-graph.mdx#call-stack) is also available when needed.
* Dbux's [global view](./02-using-dbux/07-global.mdx) lists third-party modules, files and console log statements, and allow taking you to the relevant code in a single click
  * NOTE: While this eliminates the need for most of "[print-based debugging](https://www.google.com/search?q=print-based+debugging&hl=en)", it does not replace use of [proper logging](https://www.google.com/search?q=logging+programming+best+practices).
* [Trace selection](./02-using-dbux/05-select-trace.mdx) and the [Trace Details view](./02-using-dbux/09-trace-details.mdx) allow overviewing and investigating all executions of any piece of code and their respective values.
* Instead of using the traditional debugger as a "magnifying glass" to slowly crawl along the execution timeline, Dbux offers random-access [navigation](./02-using-dbux/09-trace-details.mdx#navigation), in both directions of the timeline.
* [Code decorations](./02-using-dbux/04-code-augmentation.mdx) can make it a lot more obvious what code executed at all, and how.
* Executed files, functions and values [can be searched](./02-using-dbux/10-search.mdx) for/through, culling a lot of noise when compared to code-based search.
* [Data flow analysis](./02-using-dbux/11-data-flow.mdx) allows us to quickly trace the reads, writes and creation of a selected value. This can also take us to the place of creation of a value in a single click.




<!-- ### Debugging Known vs. Unknown Code

TODO -->


## Concluding Remarks: "Dbux vs. Debugging"

I started this project on 11/16/2019 because I felt that after programming/designing software, and debugging for 20 years, I have not fully mastered my craft. I would sometimes be stuck for 30 minutes or longer to **locate** a single bug. This frustration has not only led to the invention of Dbux, but to an exciting journey which brought about greater appreciation and many newly gained insights into the structures of the dynamic runtime execution of a program.

These days, even when I debug without Dbux, I feel I start by strategizing, rather than "going with my gut". I am much more likely to reason about and even visualize many aspects of the structures hidden beneath each statement and expression. This includes its dynamic call sub-graph and the asynchronous events it was likely to have triggered or is affected by. It is my biased opinion that Dbux can be beneficial to many developers, not just by aiding runtime analysis, but also helping us re-evaluate our approach to debugging.


<!-- Debugging is a quintessential task in the day-to-day life of a software developer. Something went wrong, and it is our job to fix it. Sometimes it is something that we did, sometimes it is someone else in our team, and sometimes it is under-documented, malfunctioning behavior or a regression in a dependency. Sometimes the bug is hiding in code we have recently been working on, sometimes it is hiding in code that we have almost entirely forgotten, sometimes it is hidden in the depth of the `node_modules` folder. -->

<!-- While debugging can be tough, we can get a leg up if we have designed a decent software architecture and proper working knowledge of used technology, frameworks and libraries. But even then,  -->

## Joining the Community

While you can certainly try to get started on your own, you are welcome to join us on [DISCORD](https://discord.gg/8kR2a7h), ask questions and complain as you go along.




[^1]: Lieberman, Henry. "The debugging scandal and what to do about it." Communications of the ACM 40.4 (1997): 26-30.
[^2]: Lieberman, Henry, and Christopher Fry. "ZStep 95: A reversible, animated source code stepper." (1997).
[^3]: Redux Developer Tools. https://github.com/zalmoxisus/redux-devtools-extension
[^4]: [replay.io](https://www.replay.io/) aims to add time-travel and collaborative debugging to the traditional debugger.