# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Screenshot

![A screenshot of my solution](https://postimg.cc/fkfzfFJF)

### Links

- Solution URL: [Repo URL](https://github.com/MohamedSharqawi/multi_step_form)
- Live Site URL: [Live site URL](https://mohamedsharqawi.github.io/multi_step_form/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Vanilla JavaScript
- Accessibility

### What I learned

This multi-step form project provided me with a valuable opportunity to enhance my skills in several areas, including form validation, dynamic section updates, and implementing a summary view. While the project was not as challenging as I initially anticipated, I encountered a significant issue related to responsiveness and mobile view design. The primary challenge was determining how to refactor the HTML structure to position the `nav` element—which contains the "Next" and "Back" buttons—outside the main card or form and place it at the bottom of the screen.

Initially, I considered using `position: absolute` for the `nav`, but this approach removed it from the normal document flow, causing overlapping issues when the form content expanded. After careful consideration, I devised a solution that involved adding a separate `nav` element outside the card in the HTML structure. I styled this external `nav` as needed and used CSS media queries to toggle its visibility based on screen size. Specifically, I set the external `nav` to `display: block` and the internal `nav` to `display: none` for smaller screens. Additionally, I applied the following CSS properties to the `body` to ensure a vertical layout:

```css
display: flex;
flex-direction: column;
```

This approach allowed me to achieve the desired responsiveness while maintaining a clean and functional design across different screen sizes.

One aspect of this project that I am particularly proud of is how I managed focus on the first focusable element within each visible section. Whether the element is an input, label, or button, the focus is automatically set to the appropriate element when a section becomes visible. For example:

- In the first section, the first input is focused when the page is refreshed or the form URL is accessed.
- In the second section, the first label is focused when the section appears after clicking the "Next" button.
- Similarly, in the third section, the first label is focused upon section transition.
- In the final section, the "Change Plan" button is focused when the section is displayed.

To achieve this, I used the following JavaScript logic: `visSection.querySelector('input, label, button')`. This simple yet effective line of code selects the first focusable element (input, label, or button) within the visible section. Additionally, users can navigate between focusable elements within each section using the `Tab` key and select elements by pressing the `Space` key, ensuring a smooth and accessible user experience.

### Continued development

While I am pleased with the current design and logic of the form, there are always opportunities for improvement. One area I plan to focus on in the future is enhancing accessibility by implementing ARIA (Accessible Rich Internet Applications) attributes. Although I currently have a basic understanding of ARIA, I intend to deepen my knowledge through further study and apply it to this project. By doing so, I aim to make the form more accessible to all users, ensuring a better experience for those relying on assistive technologies. This will involve refining the existing solution to meet accessibility standards and best practices.


### Useful resources

- [Multi-step validation form - CSSTricks](https://css-tricks.com/how-to-create-multi-step-forms-with-vanilla-javascript-and-css/#top-of-site) - This article employs the same logic I implemented in my solution, but it provides a more in-depth explanation and further elaboration on the underlying principles.


## Author

- Frontend Mentor - [@MohamedSharqawi](https://www.frontendmentor.io/profile/MohamedSharqawi)
