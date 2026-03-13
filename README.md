# WEB103 Project 3 - UnityGrid Plaza

Submitted by: **Thuan Nguyen**

About this web app:  
UnityGrid Plaza is a React web application that displays music events across multiple venues.  
Users can view events by location, browse all events, sort events by date, and see a countdown timer for upcoming events.  
The app connects to a PostgreSQL database to retrieve event data dynamically.

Time spent: **8 hours**

---

## Required Features

The following **required** functionality is completed:

- [x] The web app uses React to display data from the API
- [x] The web app is connected to a PostgreSQL database with an appropriately structured Events table
- [x] The web app displays a visual interface that allows users to select a location they would like to view
- [x] Each location has a detail page with its own unique URL
- [x] Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location

---

## Optional Features

The following **optional** features are implemented:

- [x] An additional page shows all possible events
- [x] Users can sort events by date (Soonest First / Latest First)
- [x] Events display a countdown showing the time remaining before that event
- [x] Events appear with different formatting when the event has passed

---

## Additional Features

The following **additional** features are implemented:

- [x] Event cards include event images
- [x] Location dropdown allows users to quickly navigate between venues
- [x] Hover overlay shows event details
- [x] Responsive layout for event cards

---

## Video Walkthrough

Here's a walkthrough of implemented required features:

[Video Walkthrough](https://i.imgur.com/qJXiFCH.mp4) | Gif Images: https://i.imgur.com/qJXiFCH.gif

GIF created with:

- [ScreenToGif](https://www.screentogif.com/) for Windows

---

## Notes

Challenges encountered while building the app:

- Implementing the countdown timer correctly using both event date and time.
- Handling date sorting when events include both date and time values.
- Ensuring the UI layout worked correctly with the background image and event overlay cards.

---

## License

Copyright 2026 Thuan Nguyen

Licensed under the Apache License, Version 2.0 (the "License");  
you may not use this file except in compliance with the License.

You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
