# TESTING PLAN
## Types of Testing
**Manual Acceptance Testing:**
To make sure that our website is completely functional and meets the requirements that the team came up with.

**Manual Unit Testing:**
To make sure that all of the functions, classes, and methods perform in the way that we want them to.


## Process
**Manual Acceptance Testing**
- **Who:** PM and designer will overlook the process, but the developers will be executing the testing
- **When:** towards the end of each sprint
- **Details:** if an issue arises with an acceptance test, the whole team will come together to discuss solutions

**Manual Unit Testing**
- **Who:** developers (will be in charge of writing and performing unit tests)
- **When:** after a feature has been implemented, a developer will be in charge of doing the unit testing for that feature
- **Details:** after all of the developers have double checked with the feature implementation, they all give their okay to deploy it to production environments


## Environment
**Location of Test:** Developer’s machines (e.g., computers and laptops)

**Staging Environment:** A cooperative and pre-production environment before being deployed for final production

**Browsers:** Google Chrome and Safari

**Devices:** Laptop and desktop


## Failure Protocol
### What do we do when a bug has been found?
1. Developer identifies bug
2. Developer writes a detailed description of the bug in a collective Google Doc file, including:
```
- Description
- Expected Result
- Actual Result
- Priority level
        Low
        Medium
        High
```
3. Go over with the entire team: PM, developers, and designer
4. Developers work together to solve the bug 


# ACCEPTANCE TESTING SCRIPT

## GENERAL
### Navigation Bar
**Context: User is trying to navigate to a different page from any page using the navigation bar**
- Click on the website’s Title. Expect to be navigated to the Home Page (Requirement N2).
- Click on  ‘Find a Doctor’. Expect to be navigated to the Interactive Map Page (Requirement N3).
- Click on ‘About Us.’ Expect to be navigated to the About Us Page (Requirement N4).

### User Input
**Context: User leaves the homepage to go on another page**
- Click on the ‘Enter city, state, or zip’ filter. Expect to type in input (Requirement H1a).
- Click on the ‘Search’ button.  Expect to be directed to the Interactive Map page.
- Click on the website’s Title. Expect to be navigated to the Home Page (Requirement N2).
- Expect the ‘Enter city, state, or zip’ filter to be resetted without the previous input (Requirement G2)

### Screen Reader
**Context: User requires the use of a local screen-reader to navigate through the website**
- Launch website on local desktop to the Home Page.
- Launch local screen-reader for the website.
- Enable text-to-speech on the first section for "What We Do" on the Home Page. Expect text to be correctly read aloud on local desktop
- Navigate to Resources Page with screen-reader tool. Expect cursor/indicator to land on the Resources title
- Hover screen-reader cursor over the first resource's link and hit 'Enter'. Expect to be directed to the specific source’s website (Requirement H2a and H2b).

## HOME PAGE
### Search Tool

**Context: User is on the home page**
- Click on the ‘Select by insurance’ filter. Expect the down arrow to turn into an up arrow when clicked. Also expect a list of  insurances available for the user to  filter by (Requirement H1b).
- Click on the ‘Enter city, state, or zip’ filter. Expect to type in input (Requirement H1a).
- Click on the ‘Search’ button.  Expect to be directed to the Interactive Map page.

### Featured Resources 
**Context: User is on the home page**
- Click on a featured source. 
- Expect to be directed to the specific source’s website (Requirement H2a and H2b).

## ABOUT US PAGE
### Team Information
**Context: User is the on About Us Page**
- Expect a picture of each team member (Requirement A1a).
- Expect website overview and mission statement (Requirement A1b).
- Expect team members’ contact information (Requirement A1c).

## INTERACTIVE MAP PAGE
### Interactive Map Filters
**Context: User is on the Interactive Map page**
- Expect the insurance and location filter to be already filled in from the Search Functionality inputs on the Home Page if the user was directed from there. Expect the filter inputs to be empty if a user was directed from ‘Find a Doctor’ on the navigation bar (Requirement M4a).
- Click on the ‘Insurance’’ filter. Expect the down arrow to turn into an up arrow when clicked. Also expect a list of insurances available for the user to  filter by (Requirement M4aa).
- Click on the ‘Location’’ filter. Expect to input location information in the textbox (Requirement M4ab).
- Click on the ‘Distance’ filter. Expect the down arrow to turn into an up arrow when clicked.  Expect a list of miles the user can choose to limit the distance away from their location (Requirement M4ac).

### Interactive Map
**Context: User is on the Interactive Map page**
- Click on the map to browse through the location or to select a specific doctor. Expect the list of doctors to only show the selected doctor when clicked on the map (Requirement M2b).

### Doctors List on Interactive Map Page
**Context: User is on the Interactive Map page**
- Expect the list of doctors and the information regarding those doctors to accurately reflect the inputs from the filters on the Interactive Map Filters and/or the filters from the Home Page’s Search Functionality (Requirement M2a).
- Expect the number of results found under ‘Ob/Gyn near you’ (Requirement M2a).


## DOCTOR PROFILE PAGE
### Doctor’s Information
**Context: User is on the Doctor Profile Page**
- Expect to see these elements on the doctor profile’s page: 
Name, specialty, phone number, practice address (Requirement D1b)
Insurances accepted by the doctor with a checkmark next to it (D1a)
Credentials (e.g., schooling) & Licenses (Requirement D2a)
Reviews by Highest Reviews (Requirement D3a)

### Doctor’s Reviews
**Context: User is on the Doctor Profile Page**
- Expect the reviews to be listed by Highest Reviews by default (Requirement D3a).
- Expect the ‘Sort By’ dropdown to allow users by ‘Highest Reviews’ or ‘Most Recent’ (D3b).
- Expect to be directed towards a third-party website when the user clicks ‘Read More’ reviews (D3c).
- Expect the reviews to be empty if the doctor has no reviews.
