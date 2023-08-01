# Interactive-cv
A simple idea of having a CV where one can take notes on the spot in the website. 

This could for example be used by recruiters that take a look at the CV, make some notes on the fly and are ready to send it to someone. Another example usage would be for UI/UX Training where people can point to the problematic spots in the websites. 

Here an example usage in the fictional scenario of a recruiter that is taking notes:

<img src="https://github.com/cekocvetkov/interactive-cv/assets/7689051/c4b212a6-3a3b-4b71-a9ed-c3b48f36243a" width=80% height=80%>

One can immediately start drawing with right mouse button dragging. The simple menu on the left side provides "Clear All", "Undo" and color picker functionality. All other buttons in the website are clickable at all times

## Technical Details
I wanted to focus on the canvas functionality and specifics, so I asked [ChatGPT](https://chat.openai.com/) to create a simple html and css files for a simple static CV website for me.

I wanted to make the setup as minimalistic as possible but still use the power of Typescript, so I used the most simple and easy (for me) website setup using Webpack. 

`npm run build:watch` starts the app in development mode and the `./dist` folder contains the generated static assets that could directly be used for deployment.

## Third-party
I used a couple of free [font-awesome icons](https://fontawesome.com/). (Can be found in the `./dist` folder 
