# Milestones

## M1 Frontend prototype

**Explain: What state lives in the store and what stays inside a component? Why?**
Global state that needs to be shared across multiple views or components lives in the Pinia store. For example, the authentication token, the current user's role (Student vs. SA Staff), and the cached list of active Categories/Tags live in the store because the Navbar, Route Guards, and Claim Forms all need to access them without prop-drilling. 

Local UI state stays inside the component. For example, the text typed into the "Description" input field of a new claim, or a boolean toggling a specific dropdown menu, stays in the component's `ref()` or `reactive()` object. This is because no other part of the application cares about that temporary data until the form is actually submitted to the server.