
# Addendum – Process & Creative Choices

**Student:** Abhishek Pentam  
**Course:** ITC-505 – Web Technology (SEC001)  
**Project:** Mid-Term – Choose Your Own Adventure  
**Date:** 2025-11-03

## Objectives & Requirements
- HTML/CSS/JS single-page app with dynamic DOM updates.
- At least **8 different endings** with an **image for each ending**.
- Uses **event listeners** (click + keyboard numbers 1–9).
- Includes the **Last updated** footer script.
- Clean, readable code, separated into `index.html`, `style.css`, and `script.js`.

## Planning
I mapped the story as a directed graph of nodes. Each node has `{ text, image, choices[] }`. Endings are nodes with `ending: true`. This makes it easy to add new paths without changing the rendering logic.

## Creative Theme
**“Lost in the Coconino National Forest”** — a hiking scenario near Flagstaff, AZ. It provides realistic choices (stay put, signal, follow river, find shelter). Outcomes teach basic outdoors safety.

## Implementation Details
- **Data structure:** a `story` object keyed by node ids (e.g., `"start"`, `"left_path"`).  
- **Renderer:** a single `render(key)` function updates the image, story text, and buttons.  
- **Accessibility:** buttons are keyboard selectable via numeric keys; ARIA labels on regions; high contrast UI.  
- **Assets:** simple vector SVGs created specifically for each ending (in `/assets`).  
- **Styling:** responsive card layout; zero external dependencies.  

## Challenges & Solutions
- **Branch complexity:** To avoid spaghetti logic, I kept UI logic stateless and the story graph stateful. Adding a new route is just adding a node.  
- **Image requirement:** I created custom SVGs so the project is self-contained and easy to host without external links.  
- **Keyboard support:** Added a keydown listener that maps keys `1..9` to visible buttons.

## Testing
- Verified all endings are reachable.  
- Confirmed images swap correctly per node.  
- Confirmed Last Modified footer displays a timestamp.  
- Tested in Chrome and Firefox (desktop).

## Future Enhancements (Optional)
- Add audio cues, progress map, and a breadcrumb trail.
- Persist last node in `localStorage` to resume later.
- Add transitions for images and text (reduced-motion aware).
