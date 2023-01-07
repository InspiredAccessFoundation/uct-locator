# Preliminary Notes
Draft of ideas and thoughts

## Requirements

### Anyone
- View an interactive map that locates adult changing stations in a certain area
	- The area can be based on current device location
	- The area can be based on an entered address
- View information about individual changing stations
	- Name
	- Description
	- Location
	- Pictures
	- Comments

### Logged-in User
Powers of Anyone, plus...

- Submit new changing stations
- Submit new pictures of changing stations
	- Also, delete pictures they added
- Enter comments about changing stations
	- Also, edit or delete comments they added

### Admin User
Powers of Logged-in User, plus...

- Approve submitted changing stations
- Approve submitted pictures
- Edit stations
- Delete pictures
- Delete comments
- Delete stations

## Tech
- Web Server: NodeJS + Express
- Database: Postgres with PostGIS extension installed
- Front-end: React
- Component library:
	- [Ant Design (maintained by chinese company)](https://ant.design/)
	- [MUI](https://mui.com/)
		- [Installation](https://mui.com/material-ui/getting-started/installation/)
- Map APIs
	- Google Maps
	- [QGIS](https://www.qgis.org/en/site/)

The app should be mobile-first.

## Data
- Station
	- id (pk)
	- location
	- name
	- description
	- status (submitted, approved, deleted)
- Picture
	- id (pk)
	- data - Amazon S3 (cheap), db will store a link
	- timestamp
	- account id (fk)
	- station id (fk)
- Comment
	- id (pk)
	- text
	- timestamp
	- account id (fk)
	- station id (fk)
- Account
	- id (pk)
	- email
	- password
	- name
	- role (admin, non-admin)

## Features
- anyone: find nearby adult changing stations based on location
	- only show approved stations
- anyone: view pictures for a station
- anyone: view comments for a station
- anyone: view basic information about a station
- anyone: view stations on a map
- anyone: get directions/navigation to a station
- logged-in user: submit a new station
- logged-in user: comment on a station
- logged-in user: submit pictures for a station
- logged-in user: edit own station's information
- logged-in user: edit own comment
- logged-in user: delete own comment
- logged-in user: delete own picture
- admin: approve submitted station
- admin: delete a station
- admin: edit a station's information
- admin: delete a picture
- admin: delete a comment

## Pages
- Dashboard
	- anyone: Link to "View Stations"
	- anyone: Link to "Log in"
	- anyone: Link to "Sign up"
	- logged-in user: Link to "Submit Station"
	- admin: Link to "View Submitted Stations"
- Log in
	- anyone: Enter e-mail and password
	- anyone: Submit
- Sign up
	- anyone: Enter name, e-mail and password
	- anyone: Submit
- View Stations
	- anyone: interactive map with nearby approved stations (using device location)
	- anyone: search bar to find approved stations near another location
	- anyone: Links to each "Station Page"
- Station Page
	- anyone: View location on map
	- anyone: View station name
	- anyone: Link to "Station Comments"
	- anyone: Link to "Station Pictures"
	- anyone: Link back to "View Stations"
	- anyone: Link to directions/navigation
	- admin: Button to delete station
	- admin: Button to approve station (if submitted)
- Station Comments
	- anyone: View comments about station
	- anyone: Link back to "Station Page"
	- logged-in user: Link to "Edit Comment" on own comments
	- logged-in user: Button to "Delete Comment" on own comments
	- logged-in user: Link to "Submit Comment"
- Station Pictures
	- anyone: View pictures of station
	- anyone: Link back to "Station Page"
	- logged-in user: Button to "Delete Picture" on own pictures
	- logged-in user: Link to "Submit Picture"
- View Submitted Stations
	- admin: View list of submitted stations
	- admin: Links to each "Station Page"
- Submit Station
	- logged-in user: Enter station name
	- logged-in user: Enter station location
	- logged-in user: Submit
- Submit/Edit Comment
	- logged-in user: Enter text
	- logged-in user: Submit
- Submit Picture
	- logged-in user: Upload picture
	- logged-in user: Take picture
	- logged-in user: Submit

### Notes
- upvote/downvote comments
- [nx workspaces](https://nx.dev/) - publish multiple packages from the same monorepo
	- [Tutorial](https://nx.dev/react-tutorial/01-create-application)
	- [with GitHub Actions](https://nx.dev/ci/monorepo-ci-github-actions)
- Get API Specs together