# Plans

## Description

A simple app for organising events and meetings.
The idea for this app originated from INF.04 Practical Exercise,
where students had to create an application to help organise meetings.

Unfortunately, the design of this application was not practical and it had to be written in C# Windows Professional Forms, which is not cross-compatible. 

Therefore, int order to challenge my skills, I set myself the goal of creating a better version of the program that would be more usable and work on all kinds of devices.

The application is written in Rust using Tauri with React as the frontend.
It currently supports all Windows, MacOS and Linux devices, with Android and IOS coming in the future.

## Installation

As of the current development process of application, no usable release has been yet created.

You can always compile code yourself.

To do that you will need to have installed:

* Node.js with npm
* Rust

You can build the application by issuing the commnad `npm run tauri build`

The application will be placed in the `src-tauri/target/release` folder. The application name should be `plans` (file ending may differ depending on operating system)

## Credits
* <a href="https://github.com/nodejs">Node.js</a>
* <a href="https://github.com/tauri-apps/tauri">Tauri</a>
